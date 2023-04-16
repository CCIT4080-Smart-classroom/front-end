import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

// Define the course schedule data
const scheduleData = [
  { date: '2023-04-18', course: 'Math 101', time: '9:00 AM - 10:30 AM', location: 'Room 101', lecturer: 'John Doe' },
  { date: '2023-04-19', course: 'Science 201', time: '11:00 AM - 12:30 PM', location: 'Room 201', lecturer: 'Jane Doe' },
  { date: '2023-04-20', course: 'History 301', time: '2:00 PM - 3:30 PM', location: 'Room 301', lecturer: 'Bob Smith' },
  { date: '2023-04-21', course: 'English 401', time: '10:00 AM - 11:30 AM', location: 'Room 401', lecturer: 'Alice Brown' },
  { date: '2023-04-22', course: 'Art 501', time: '1:00 PM - 2:30 PM', location: 'Room 501', lecturer: 'David Lee' },
  { date: '2023-04-22', course: 'Music 601', time: '3:00 PM - 4:30 PM', location: 'Room 601', lecturer: 'Emily Davis' },
];

const pendingAssignmentsData = [
  { course: 'Math 101', dueDate: '2023-04-01' },
  { course: 'Science 201', dueDate: '2023-04-21' },
]

// Define the CourseSchedule component
const CourseScheduleScreen = () => {
  // Define the state for the selected date and course
  const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSchedule, setShowSchedule] = useState(true);

  // Create an object to hold the dots for the calendar
  const dots = {};

  // Add dots for the schedule dates
  scheduleData.forEach((item) => {
    const date = item.date;
    dots[date] = { marked: true };
  });

  // Add dots for the assignment due dates
  pendingAssignmentsData.forEach((item) => {
    const date = item.dueDate;
    dots[date] = { marked: true };
  });

  // Define the handleDayPress function to set the selected date
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    // setSelectedCourse(null);
  };

  // Define the handleCoursePress function to set the selected course
//   const handleCoursePress = (course) => {
//     setSelectedCourse(course);
//   };

  // Define the handleBackPress function to go back to viewing all courses
  const handleBackPress = () => {
    setSelectedDate(null);
    // setSelectedCourse(null);
  };

  // Filter the schedule data based on the selected date
  const filteredScheduleData = selectedDate ? scheduleData.filter((item) => item.date === selectedDate) : scheduleData;

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
    <Calendar
      onDayPress={handleDayPress}
      markedDates={dots} // add the dots object to the markedDates prop
    />
  </View>
  <View style={styles.scheduleContainer}>
    {selectedDate ? (
      filteredScheduleData.length > 0 ? (
        <View style={styles.courseListContainer}>
          <Text style={styles.courseListHeader}>Courses for {selectedDate}:</Text>
          <FlatList
            data={filteredScheduleData}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCoursePress(item.course)}>
                <View style={styles.courseContainer}>
                  <Text style={styles.courseText}>{item.course}</Text>
                  <Text style={styles.courseText}>{item.time}</Text>
                  <Text style={styles.courseText}>{item.location}</Text>
                  <Text style={styles.courseText}>{item.lecturer}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.course}
          />
          {/* <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back to all courses</Text>
          </TouchableOpacity> */}
        </View>
      ) : (
        <View style={styles.noCoursesContainer}>
          <Text style={styles.noCoursesText}>No courses on this date.</Text>
          {/* <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back to all courses</Text>
          </TouchableOpacity> */}
        </View>
      )
    ) : (
      <View style={styles.courseListContainer}>
        <TouchableOpacity onPress={() => setShowSchedule(!showSchedule)} style={styles.switchBar}>
          <Text style={showSchedule ? styles.selectedSwitchText : styles.switchText}>All Courses</Text>
          <Text style={!showSchedule ? styles.selectedSwitchText : styles.switchText}>Pending Assignments</Text>
        </TouchableOpacity>
        <FlatList
          data={showSchedule ? scheduleData : pendingAssignmentsData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCoursePress(item.course)}>
              <View style={styles.courseContainer}>
                <Text style={styles.courseText}>{item.course}</Text>
                <Text style={styles.courseText}>{showSchedule ? item.date : item.dueDate}</Text>
                <Text style={styles.courseText}>{item.time}</Text>
                <Text style={styles.courseText}>{item.location}</Text>
                <Text style={styles.courseText}>{item.lecturer}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.course}
        />
      </View>
    )}
    {/* {selectedCourse && (
      <View style={styles.selectedCourseContainer}>
        <Text style={styles.selectedCourseText}>Selected Course:</Text>
        <Text style={styles.selectedCourseText}>{selectedCourse}</Text>
      </View>
    )} */}
  </View>
</View>

);
};

// Define the styles for the CourseSchedule component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    flex: 3,
    width: '100%',
    padding: 10,
  },
  scheduleContainer: {
    flex: 3,
    width: '100%',
  },
  courseListContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  courseListHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 10,
  },
  courseText: {
    fontSize: 16,
    marginBottom: 5,
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noCoursesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  noCoursesText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedCourseContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginTop: 10,
  },
  selectedCourseText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
    switchBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    height: 40,
    width: '90%',
    marginVertical: 10,
  },
  switchText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedSwitchText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CourseScheduleScreen;

