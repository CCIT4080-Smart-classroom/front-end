import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Linking } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { tabBarHeight } from '../styles/tabBar';
const lectureDot = { key: 'lecture', color: '#2196F3'};
const examDot = { key: 'exam', color: '#9C27B0'};
const assignmentDot = { key: 'assignment', color: '#FF5722'};

const ScheduleScreen = ({ route }) => {
    const { courseData, assignmentData } = route.params;
    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset();
    const adjustedDate = new Date(currentDate.getTime() - (timezoneOffset * 60 * 1000));
    const [selectedDate, setSelectedDate] = useState(adjustedDate.toISOString().split('T')[0]);
    const events = {};
    const courseEvents = [];

    // loop through course data to mark lecture and exam dates
    courseData.forEach((course) => {
        course.components.forEach((component) => {
            if (component.type === 'Lecture') {
                let date = new Date(component.startDate);
                while (date <= new Date(component.endDate)) {
                    if (date.getDay() === component.weekday) {
                        let dateString = date.toISOString().split('T')[0];
                        if (events[dateString]) {
                            events[dateString].dots.push({ ...lectureDot, key: `lecture-${component.number}-${dateString}` });
                        } else {
                            events[dateString] = { dots: [{ ...lectureDot, key: `lecture-${component.number}-${dateString}` }], marked: true, selectedColor: 'orange', color: 'orange' };
                        }
                    }
                    date.setDate(date.getDate() + 1);
                }
            } else {
                let dateString = new Date(component.startDate)
                    .toISOString()
                    .split('T')[0];
                if (events[dateString]) {
                    events[dateString].dots.push({ ...examDot, key: `exam-${component.number}-${dateString}` });
                } else {
                    events[dateString] = { dots: [{ ...examDot, key: `exam-${component.number}-${dateString}` }], selectedDotColor: 'orange', color: 'orange' };
                }
            }
        });
    });

    // loop through assignment data to mark due dates
    assignmentData.forEach((assignment) => {
        let date = new Date(assignment.end_time * 1000);
        let dateString = date.toISOString().split('T')[0];
        if (events[dateString]) {
            events[dateString].dots.push({ ...assignmentDot, key: `assignment-${assignment.url}` });
        } else {
            events[dateString] = { dots: [{ ...assignmentDot, key: `assignment-${assignment.url}` }], selectedDotColor: 'orange', color: 'orange' };
        }
    });


    const marked = {
        ...events,
        [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: '#42A5F5',
            selectedTextColor: 'white'
        }
    };

    // loop through course data to find events on selected date
    if (selectedDate) {
        courseData.forEach((course) => {
            course.components.forEach((component) => {
                let startDate = new Date(component.startDate);
                let endDate = new Date(component.endDate);
                let selDate = new Date(selectedDate);
                if (
                    new Date(selectedDate) >= startDate &&
                    new Date(selectedDate) <= endDate &&
                    selDate.getDay() === component.weekday
                ) {
                    courseEvents.push({
                        type: component.type,
                        name: `${course.name} ${component.type}`,
                        code: course.code,
                        number: component.number,
                        startTime: component.startTime + ' - ',
                        endTime: component.endTime,
                        room: component.room,
                    });
                }
            });
        })
        // loop through assignment data to find assignments due on selected date
        assignmentData.forEach((assignment) => {
            let date = new Date(assignment.end_time * 1000);
            let dateString = date.toISOString().split('T')[0];
            if (dateString === selectedDate) {
                courseEvents.push({
                    type: 'assignment',
                    name: assignment.name,
                    code: assignment.course_name,
                    endTime: 'Due: ' + new Date(assignment.end_time * 1000).toLocaleTimeString(),
                    url: assignment.url,
                });
            }
        });
    }

    return (
        <View>
            <FlatList
                data={courseEvents}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.card, item.type === 'Exam' && { shadowColor: '#9C27B0' , borderColor: '#9C27B0', borderWidth: 0.8}, item.type === 'assignment' && item.url && { shadowColor: '#FF5722', borderColor: '#FF5722', borderWidth: 0.8}]} onPress={() => {
                        if (item.type === 'assignment' && item.url) {
                            Linking.openURL(item.url);
                        }
                    }}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text style={styles.cardText}>{item.code} - {item.number}</Text>
                        <Text style={styles.cardText}>{item.startTime}{item.endTime}</Text>
                        {item.room && <Text style={styles.cardText}>{item.room}</Text>}
                        {item.type === 'assignment' && item.url && <Text style={[styles.cardText, { color: '#FF5722', textDecorationLine: 'underline'}]}>Click to submit</Text>}
                    </TouchableOpacity>
                )}
                ListHeaderComponent={
                    <View>
                        <Calendar
                            onDayPress={(day) => setSelectedDate(day.dateString)}
                            markedDates={marked}
                            markingType={'multi-dot'}
                            theme={{
                                selectedDayTextColor: 'white',
                                todayTextColor: 'white',
                                todayBackgroundColor: '#2196F3',
                                monthTextColor: 'black',
                                textMonthFontWeight: 'bold',
                                arrowColor: '#2196F3',
                                textSectionTitleColor: 'black',
                                textDayHeaderFontWeight: 'bold',
                                textDayFontSize: 16,
                                textMonthFontSize: 16,
                            }}
                            style={styles.calendar}
                        >
                        </Calendar>
                        <Text style={styles.date}>{selectedDate}</Text>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: tabBarHeight }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    calendar: {
        borderRadius: 15,
        marginTop: 10,
        marginHorizontal: 20,
        paddingBottom: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    date: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        marginLeft: 20
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 10,
        margin: 20,
        marginTop: 0,
        marginBottom: 10,
        borderRadius: 15,
        shadowColor: '#000',
        elevation: 3,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});

export default ScheduleScreen;