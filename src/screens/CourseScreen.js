import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { tabBarHeight } from '../styles/tabBar';

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
  const { courseData, attendanceRecord, student_id } = route.params;

  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const courseAttendance = {};

    courseData.forEach((course) => {
      courseAttendance[course.code] = {
        numLectures: 0,
        numAttended: 0,
        class_code: ''
      };
    
      course.components.forEach((component) => {
        if (component.type === "Lecture") {
          courseAttendance[course.code].class_code = component.number;
          const today = new Date();
          const startDate = new Date(component.startDate);
          const endDate = new Date(component.endDate);
          const [hours, minutes] = component.startTime.split(":");
          const isPM = component.startTime.toUpperCase().includes("PM");
          const lectureTimeToday = new Date(today);
          lectureTimeToday.setHours(
            (isPM ? parseInt(hours) + 12 : parseInt(hours)) % 24
          );
          lectureTimeToday.setMinutes(parseInt(minutes));
          const numLectures =
            Math.ceil((today - startDate) / (7 * 24 * 60 * 60 * 1000)) -
            (today < lectureTimeToday ||
            (today.getDay() === component.weekday && today < lectureTimeToday)
              ? 1
              : 0);
    
          courseAttendance[course.code].numLectures += numLectures;
    
          attendanceRecord.forEach((timestamp) => {
            const attendanceTime = new Date(timestamp);
            if (
              attendanceTime >= startDate &&
              attendanceTime <= endDate &&
              attendanceTime.getDay() === component.weekday &&
              attendanceTime.getUTCFullYear() === startDate.getUTCFullYear()
            ) {
              const startHour = parseInt(component.startTime.split(":")[0]);
              const startMinute = parseInt(
                component.startTime.split(":")[1].substring(0, 2)
              );
              const startMeridiem = component.startTime.slice(-2);
              const attendanceHour = attendanceTime.getHours();
              const attendanceMinute = attendanceTime.getMinutes();
              const startTimeInMinutes =
                startHour * 60 + startMinute + (startMeridiem === "PM" ? 12 * 60 : 0) - 10;
              const attendanceTimeInMinutes = attendanceHour * 60 + attendanceMinute;
    
              if (
                attendanceTimeInMinutes >= startTimeInMinutes &&
                attendanceTimeInMinutes <= startTimeInMinutes + 40
              ) {
                courseAttendance[course.code].numAttended++;
              }
            }
          });
        }
      });
    });
    
    const data = [];
    
    for (const courseCode in courseAttendance) {
      const attendance = courseAttendance[courseCode];
      const attendanceRate = Math.round(
        (attendance.numAttended / attendance.numLectures) * 100
      );
      data.push({
        class_id: courseCode+courseAttendance[courseCode].class_code,
        attendance_rate: attendanceRate,
      });
    }

    setAttendanceData(data);
  }, [courseData, attendanceRecord]);

  const handleSubmit = async () => {
    if (attendanceData.length == 0) return
    const requestBody = {
      student_id,
      attendance_data: attendanceData,
    };
    console.log(requestBody)
    fetch('https://api.tylerl.cyou/attendance/rate', {
      method: 'post',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      console.log(res.status)
    }).catch((error) => {
      console.log(error)
    })
  };

  useEffect(() => {
    handleSubmit();
  }, [attendanceData]);

  const renderComponent = (component) => {
    if (component.type === 'Lecture') {
      const today = new Date();
      const startDate = new Date(component.startDate);
      const endDate = new Date(component.endDate);
      const [hours, minutes] = component.startTime.split(':');
      const isPM = component.startTime.toUpperCase().includes("PM");
      const lectureTimeToday = new Date(today);
      lectureTimeToday.setHours((isPM ? parseInt(hours) + 12 : parseInt(hours)) % 24);
      lectureTimeToday.setMinutes(parseInt(minutes));
      const numLectures = Math.ceil((today - startDate) / (7 * 24 * 60 * 60 * 1000)) - (today < lectureTimeToday || today.getDay() === component.weekday && today < lectureTimeToday ? 1 : 0);

      let numAttended = 0;
      attendanceRecord.forEach((timestamp) => {
        const attendanceTime = new Date(timestamp);
        if (
          attendanceTime >= startDate &&
          attendanceTime <= endDate &&
          attendanceTime.getDay() === component.weekday &&
          attendanceTime.getUTCFullYear() === startDate.getUTCFullYear()
        ) {
          const startHour = parseInt(component.startTime.split(':')[0]);
          const startMinute = parseInt(component.startTime.split(':')[1].substring(0, 2));
          const startMeridiem = component.startTime.slice(-2);
          const attendanceHour = attendanceTime.getHours();
          const attendanceMinute = attendanceTime.getMinutes();
          const startTimeInMinutes = startHour * 60 + startMinute + (startMeridiem === 'PM' ? 12 * 60 : 0) - 10;
          const attendanceTimeInMinutes = attendanceHour * 60 + attendanceMinute;

          if (
            attendanceTimeInMinutes >= startTimeInMinutes && attendanceTimeInMinutes <= startTimeInMinutes + 40
          ) {
            numAttended++;
          }
        }
      });
      var attendanceRate = Math.round((numAttended / numLectures) * 100);
      // console.log(component.number);
      // console.log(numAttended, numLectures)

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
                <Text style={styles.progressText}>{attendanceRate}%</Text>
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
      <Text style={styles.lectureTitle}>{item.code} {item.name}</Text>
      {item.components.map((component, index) => (
        <View key={index}>{renderComponent(component)}</View>
      ))}
    </View>
  );

  return (
    <View>
      <FlatList data={courseData} renderItem={renderItem} keyExtractor={(item) => item.code} contentContainerStyle={{ paddingBottom: tabBarHeight }} />
    </View>
  );
};

export default AllCoursesScreen;