import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// Define the course schedule data
const scheduleData = [
  { date: '2022-04-18', course: 'Math 101', time: '9:00 AM - 10:30 AM', location: 'Room 101', lecturer: 'John Doe' },
  { date: '2022-04-19', course: 'Science 201', time: '11:00 AM - 12:30 PM', location: 'Room 201', lecturer: 'Jane Doe' },
  { date: '2022-04-20', course: 'History 301', time: '2:00 PM - 3:30 PM', location: 'Room 301', lecturer: 'Bob Smith' },
  { date: '2022-04-21', course: 'English 401', time: '10:00 AM - 11:30 AM', location: 'Room 401', lecturer: 'Alice Brown' },
  { date: '2022-04-22', course: 'Art 501', time: '1:00 PM - 2:30 PM', location: 'Room 501', lecturer: 'David Lee' },
  { date: '2022-04-22', course: 'Music 601', time: '3:00 PM - 4:30 PM', location: 'Room 601', lecturer: 'Emily Davis' },
];

// Configure the calendar locale
LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
LocaleConfig.defaultLocale = 'en';

// Define the CourseSchedule component
const CourseSchedule = () => {
  // Define the state for the selected date and course
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Define the handleDayPress function to set the selected date
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setSelectedCourse(null);
  };

  // Define the handleCoursePress function to set the selected course
  const handleCoursePress = (course) => {
    setSelectedCourse(course);
  };

  // Filter the schedule data based on the selected date
  const filteredScheduleData = selectedDate
    ? scheduleData.filter((item) => item.date === selectedDate)
    : scheduleData;

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar onDayPress={handleDayPress} />
      </View>
      <View style={styles.scheduleContainer}>
        <ScrollView>
          <View style={styles.allCoursesContainer}>
            <Text style={styles.allCoursesHeader}>All Courses</Text>
            {scheduleData.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleCoursePress(item.course)}>
                <View style={styles.courseOverviewContainer}>
                  <Text style={styles.courseOverviewText}>{item.course}</Text>
                  <Text style={styles.courseOverviewText}>{item.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {filteredScheduleData.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleCoursePress(item.course)}>
              <View style={styles.courseContainer}>
                <Text style={styles.courseText}>{item.course}</Text>
                <Text style={styles.courseText}>{item.time}</Text>
                <Text style={styles.courseText}>{item.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
          {selectedCourse && (
            <View style={styles.selectedCourseContainer}>
              <Text style={styles.selectedCourseText}>Selected Course: {selectedCourse}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

// Define the styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  calendarContainer: {
    flex: 2,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  scheduleContainer: {
    flex: 2,
    backgroundColor: '#FFF',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 0,
  },
  allCoursesContainer: {
    paddingLeft: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  allCoursesHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseOverviewContainer: {
    flexDirection: 'column',
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  courseOverviewText: {
    fontSize: 16,
    marginBottom: 5,
  },
  courseContainer: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  courseText: {
    fontSize: 16,
    marginBottom: 5,
  },
  selectedCourseContainer: {
    paddingLeft: 20,
    paddingTop: 10,
  },
  selectedCourseText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CourseSchedule;