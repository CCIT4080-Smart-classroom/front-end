import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// Define the course schedule data
const scheduleData = [
  { date: '2022-04-18', course: 'Math 101', location: 'Room 101', lecturer: 'John Doe' },
  { date: '2022-04-19', course: 'Science 201', location: 'Room 201', lecturer: 'Jane Doe' },
  { date: '2022-04-20', course: 'History 301', location: 'Room 301', lecturer: 'Bob Smith' },
  { date: '2022-04-21', course: 'English 401', location: 'Room 401', lecturer: 'Alice Brown' },
  { date: '2022-04-22', course: 'Art 501', location: 'Room 501', lecturer: 'David Lee' },
  { date: '2022-04-22', course: 'Music 601', location: 'Room 601', lecturer: 'Emily Davis' },
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

  // Get all the courses
  const allCourses = [...new Set(scheduleData.map((course) => course.course))];

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Course Schedule</Text>
        <View style={styles.calendarContainer}>
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
        </View>
        <View style={styles.scheduleContainer}>
          {selectedDate && (
            <>
              <Text style={styles.dateHeading}>{selectedDate}</Text>
              {scheduleData
                .filter((course) => course.date === selectedDate)
                .map((course) => (
                  <TouchableOpacity
                    key={course.course}
                    style={[
                      styles.courseContainer,
                      selectedCourse === course && styles.selectedCourse,
                    ]}
                    onPress={() => handleCoursePress(course)}
                  >
                    <Text style={styles.courseName}>{course.course}</Text>
                    <Text style={styles.courseInfo}>
                      {course.location} | {course.lecturer}
                    </Text>
                  </TouchableOpacity>
                ))}
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
          {!selectedDate && (
            <>
              <Text style={styles.dateHeading}>All Courses</Text>
              {allCourses.map((course) => (
                <TouchableOpacity
                  key={course}
                  style={[
                    styles.courseContainer,
                    selectedCourse?.course === course && styles.selectedCourse,
                  ]}
                  onPress={() => setSelectedCourse(scheduleData.find(c => c.course === course))}
                >
                  <Text style={styles.courseName}>{course}</Text>
                  <Text style={styles.courseInfo}>
                    {scheduleData
                      .filter((c) => c.course === course)
                      .map((c) => `${c.location} | ${c.lecturer}`)
                      .join('\n')}
                  </Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

// Define the styles
const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    paddingTop: 50, // Add paddingTop to push the content down
    paddingHorizontal: 20,
  },
  calendarContainer: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scheduleContainer: {
    flex: 1,
  },
  courseContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedCourse: {
    backgroundColor: '#c9c9c9',
  },
  courseName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  courseInfo: {
    fontSize: 14,
  },
  courseDetailContainer: {
    backgroundColor: '#c9c9c9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  courseDetailText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CourseSchedule;