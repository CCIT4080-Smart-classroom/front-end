import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };

const App = () => {
    const [selectedDate, setSelectedDate] = useState('');

    const courseData = {
        data: [
            {
                code: 'CCEN4005',
                name: 'EAP II',
                components: [
                    {
                        number: 'CL48',
                        type: 'Lecture',
                        weekday: 2,
                        startTime: '1:00PM',
                        endTime: '2:30PM',
                        startDate: '2023-01-26',
                        endDate: '2023-04-26',
                        room: 'KEC709',
                    },
                    {
                        number: 'CL48',
                        type: 'Lecture',
                        weekday: 3,
                        startTime: '2:30PM',
                        endTime: '4:00PM',
                        startDate: '2023-01-26',
                        endDate: '2023-04-26',
                        room: 'KEC708',
                    },
                ],
            },
            {
                code: 'CCIT4021',
                name: 'Discrete Mathematics',
                components: [
                    {
                        number: 'CL06',
                        type: 'Lecture',
                        weekday: 2,
                        startTime: '2:30PM',
                        endTime: '5:30PM',
                        startDate: '2023-01-26',
                        endDate: '2023-04-26',
                        room: 'KEC505',
                    },
                    {
                        number: 'CE02',
                        type: 'Exam',
                        weekday: 2,
                        startTime: '2:30PM',
                        endTime: '4:30PM',
                        startDate: '2023-05-02',
                        endDate: '2023-05-02',
                        room: 'KEC204',
                    },
                ],
            },
        ],
    };

    const markedDates = {};
    const courseEvents = [];

    // loop through course data to mark lecture and exam dates
    courseData.data.forEach((course) => {
        course.components.forEach((component) => {
            if (component.type === 'Lecture') {
                let date = new Date(component.startDate);
                while (date <= new Date(component.endDate)) {
                    if (date.getDay() === component.weekday) {
                        let dateString = date.toISOString().split('T')[0];
                        markedDates[dateString] = { dots: [massage], dotColor: 'blue', selectedDotColor: 'orange' };
                    }
                    date.setDate(date.getDate() + 1);
                }
            } else {
                let dateString = new Date(component.startDate)
                    .toISOString()
                    .split('T')[0];
                markedDates[dateString] = { dots: [vacation, massage], dotColor: 'blue', selectedDotColor: 'orange' };
            }
        });
    });

    // loop through course data to find events on selected date
    if (selectedDate) {
        courseData.data.forEach((course) => {
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
                        code: course.code,
                        name: course.name,
                        number: component.number,
                        type: component.type,
                        startTime: component.startTime,
                        endTime: component.endTime,
                        room: component.room,
                    });
                }
            });
        })
        console.log(courseEvents)
    }
    return (
        <View>
            <Calendar
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={markedDates}
                markingType={'multi-dot'}
                theme={{
                    dotColor: 'blue',
                    selectedDayBackgroundColor: 'blue',
                    selectedDayTextColor: 'white',
                    todayTextColor: 'blue',
                    monthTextColor: 'black',
                    textMonthFontWeight: 'bold',
                    arrowColor: 'blue',
                    textSectionTitleColor: 'black',
                    textDayHeaderFontWeight: 'bold',
                    textDayFontSize: 16,
                    textMonthFontSize: 20,
                }}
            >
            </Calendar>
            <FlatList
                data={courseEvents}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.code}</Text>
                        <Text>{item.name}</Text>
                        <Text>{item.number}</Text>
                        <Text>{item.type}</Text>
                        <Text>{item.startTime} - {item.endTime}</Text>
                        <Text>{item.room}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default App;