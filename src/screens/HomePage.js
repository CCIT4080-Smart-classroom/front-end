import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
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

  // Memoize the filtered schedule data
  const filteredScheduleData = useMemo(() => {
    return selectedDate
      ? scheduleData.filter((item) => item.date === selectedDate)
      : scheduleData;
  }, [selectedDate]);

  // Define the renderItem function for the FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCoursePress(item.course)}>
      <View style={styles.courseContainer}>
        <Text style={styles.courseText}>{item.course}</Text>
        <Text style={styles.courseText}>{item.time}</Text>
        <Text style={styles.courseText}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar onDayPress={handleDayPress} />
      </View>
      <View style={styles.scheduleContainer}>
        <View style={styles.allCoursesContainer}>
          <Text style={styles.allCoursesHeader}>All Courses</Text>
          <ScrollView style={{ maxHeight: 200 }}>
            {scheduleData.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleCoursePress(item.course)}>
                <View style={styles.courseOverviewContainer}>
                  <Text style={styles.courseOverviewText}>{item.course}</Text>
                  <Text style={styles.courseOverviewText}>{item.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {filteredScheduleData.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleCoursePress(item.course)}>
              <View style={styles.courseContainer}>
                <Text style={styles.courseText}>{item.course}</Text>
                <Text style={styles.courseText}>{item.time}</Text>
                <Text style={styles.courseText}>{item.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {selectedCourse && (
          <TouchableOpacity
            style={styles.courseDetailContainer}
            onPress={() => console.log(`Navigate to ${selectedCourse} detail page`)}
          >
            <Text style={styles.courseDetailText}>View Course Details : {selectedCourse}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Define the styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarContainer: {
    height: 350,
    backgroundColor: '#F5F5F5',
  },
  scheduleContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  allCoursesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 10,
    marginBottom: 10,
  },
  allCoursesHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courseOverviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  courseOverviewText: {
    fontSize: 14,
    color: '#333333',
  },
  courseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  courseText: {
    fontSize: 16,
    color: '#333333',
  },
  courseDetailContainer: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseDetailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default CourseSchedule;