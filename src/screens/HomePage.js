import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// Define the course schedule data
const scheduleData = [
  { date: '2022-04-18', course: 'Math 101', location: 'Room 101' },
  { date: '2022-04-19', course: 'Science 201', location: 'Room 201' },
  { date: '2022-04-20', course: 'History 301', location: 'Room 301' },
  { date: '2022-04-21', course: 'English 401', location: 'Room 401' },
  { date: '2022-04-22', course: 'Art 501', location: 'Room 501' },
  { date: '2022-04-22', course: 'Music 601', location: 'Room 601' },
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

  // Filter the courses for the selected date
  const coursesForSelectedDate = selectedDate
    ? scheduleData.filter((course) => course.date === selectedDate)
    : [];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Course Schedule</Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true },
          ...scheduleData.reduce((acc, course) => {
            acc[course.date] = { marked: true };
            return acc;
          }, {}),
        }}
      />
      {selectedDate && (
        <>
          <Text style={styles.dateHeading}>{selectedDate}</Text>
          {coursesForSelectedDate.length > 0 ? (
            coursesForSelectedDate.map((course) => (
              <TouchableOpacity
                key={course.course}
                style={[styles.courseContainer, selectedCourse === course && styles.selectedCourse]}
                onPress={() => handleCoursePress(course)}
              >
                <Text style={styles.courseName}>{course.course}</Text>
                <Text style={styles.courseLocation}>{course.location}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noCoursesText}>No courses scheduled for this date</Text>
          )}
        </>
      )}
      {selectedCourse && (
        <TouchableOpacity
          style={styles.courseDetailContainer}
          onPress={() => console.log(`Navigate to ${selectedCourse.course} detail page`)}
        >
          <Text style={styles.courseDetailText}>View Course Details</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedCourse: {
    backgroundColor: '#ccc',
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courseLocation: {
    fontSize: 14,
  },
  courseDetailContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  courseDetailText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noCoursesText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
});

export default CourseSchedule;