import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  lectureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  progressBar: {
    backgroundColor: '#f5f5f5',
    height: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00cc00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    position: 'absolute',
    zIndex: 1,
  },
});

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AllCoursesScreen = ({ route }) => {
  const { username } = route.params;
  const [courseData, setCourseData] = useState([]);
  const [attendanceRecord, setAttendanceRecord] = useState([]);


  useEffect(() => {
    fetch('https://api.tylerl.cyou/student/course')
      .then((response) => response.json())
      .then((json) => setCourseData(json.data))
      .catch((error) => console.error(error));
    fetch(`https://api.tylerl.cyou/attendance/${username}`)
      .then((response) => response.json())
      .then((json) => setAttendanceRecord(json.data))
      .catch((error) => console.error(error));
  }, []);
  console.log(attendanceRecord)

  const renderComponent = (component) => {
    if (component.type === 'Lecture') {
      const startDate = new Date(component.startDate);
      const endDate = new Date(component.endDate);
      const numWeeks = Math.ceil((endDate - startDate) / (7 * 24 * 60 * 60 * 1000)); // round up to include the last week
      const numLectures = numWeeks; // assuming lectures are held weekly
      let numAttended = 0;
      attendanceRecord.forEach((timestamp) => {
        const attendanceTime = new Date(timestamp);
        if (
          attendanceTime >= startDate &&
          attendanceTime <= endDate &&
          attendanceTime.getDay() === component.weekday
        ) {
          const startHour = parseInt(component.startTime.split(':')[0]);
          const startMinute = parseInt(component.startTime.split(':')[1].substring(0, 2));
          const startMeridiem = component.startTime.slice(-2);
          const endHour = parseInt(component.endTime.split(':')[0]);
          const endMinute = parseInt(component.endTime.split(':')[1].substring(0, 2));
          const endMeridiem = component.endTime.slice(-2);
          const attendanceHour = attendanceTime.getHours();
          const attendanceMinute = attendanceTime.getMinutes();
          if (
            (attendanceHour == startHour + (startMeridiem === 'PM' ? 12 : 0) && attendanceMinute >= startMinute) ||
            (attendanceHour > startHour + (startMeridiem === 'PM' ? 12 : 0) && attendanceHour <= endHour + (endMeridiem === 'PM' ? 12 : 0)) ||
            (attendanceHour == endHour + (endMeridiem === 'PM' ? 12 : 0) && attendanceMinute < endMinute)
          ) {
            numAttended++;
          }
        }
      });
      var attendanceRate = (numAttended / numLectures) * 100;

      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{`${component.type} ${component.number}`}</Text>
          <Text style={styles.cardText}>{weekdays[component.weekday]}</Text>
          <Text style={styles.cardText}>{component.startTime} - {component.endTime}</Text>
          <Text style={styles.cardText}>{component.startDate} - {component.endDate}</Text>
          <Text style={styles.cardText}>{component.room}</Text>
          {(
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${attendanceRate}%` }]}>
                <Text style={styles.progressText}>{attendanceRate.toFixed(0)}%</Text>
              </View>
            </View>
          )}
        </View>
      );
    } else if (component.type === 'Exam') {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{`${component.type}`}</Text>
          <Text style={styles.cardText}>{weekdays[component.weekday]}</Text>
          <Text style={styles.cardText}>{component.startTime} - {component.endTime}</Text>
          <Text style={styles.cardText}>{component.startDate}</Text>
          <Text style={styles.cardText}>{component.room}</Text>
        </View>
      );
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <Text style={styles.lectureTitle}>{item.name}</Text>
      {item.components.map((component, index) => (
        <View key={index}>{renderComponent(component)}</View>
      ))}
    </View>
  );

  return (
    <View>
      <FlatList data={courseData} renderItem={renderItem} keyExtractor={(item) => item.code} />
    </View>
  );
};

export default AllCoursesScreen;