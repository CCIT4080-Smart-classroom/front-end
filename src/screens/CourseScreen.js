import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const courseData = {
  "data": [
    {
      "code": "CCCH4003",
      "name": "Advanced Chinese Language",
      "components": [
        {
          "number": "CL53",
          "type": "Lecture",
          "time": "Tu 8:30AM - 11:30AM",
          "room": "KEC503",
          "attendanceRate": 75
        }
      ]
    },
    {
      "code": "CCEN4005",
      "name": "EAP II",
      "components": [
        {
          "number": "CL48",
          "type": "Lecture",
          "time": "Tu 1:00PM - 2:30PM",
          "room": "KEC709",
          "attendanceRate": 90
        },
        {
          "number": "CL48",
          "type": "Lecture",
          "time": "We 2:30PM - 4:00PM",
          "room": "KEC708",
          "attendanceRate": 85
        }
      ]
    },
    {
      "code": "CCIT4021",
      "name": "Discrete Mathematics",
      "components": [
        {
          "number": "CL06",
          "type": "Lecture",
          "time": "Tu 2:30PM - 5:30PM",
          "room": "KEC505",
          "attendanceRate": 60
        },
        {
          "number": "EXAM",
          "type": "Exam",
          "time": "TBA",
          "room": "TBA"
        }
      ]
    },
    {
      "code": "CCIT4033",
      "name": "Intro to Database Systems",
      "components": [
        {
          "number": "CL02",
          "type": "Lecture",
          "time": "Th 8:30AM - 11:30AM",
          "room": "KEC910",
          "attendanceRate": 80
        },
        {
          "number": "EXAM",
          "type": "Exam",
          "time": "TBA",
          "room": "TBA"
        }
      ]
    },
    {
      "code": "CCIT4079",
      "name": "Big Data App & Analytics",
      "components": [
        {
          "number": "CL04",
          "type": "Lecture",
          "time": "Th 2:30PM - 5:30PM",
          "room": "KEC908",
          "attendanceRate": 70
        },
        {
          "number": "EXAM",
          "type": "Exam",
          "time": "TBA",
          "room": "TBA"
        }
      ]
    },
    {
      "code": "CCIT4080B",
      "name": "Project on KPD",
      "components": [
        {
          "number": "CL08",
          "type": "Lecture",
          "time": "Mo 8:30AM - 11:30AM",
          "room": "KEC909",
          "attendanceRate": 95
        }
      ]
    }
  ]
};


const AllCoursesScreen = () => {
  const renderComponent = (component) => {
    if (component.type === 'Lecture') {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{component.type} - {component.number}</Text>
          <Text style={styles.cardText}>{component.time}</Text>
          <Text style={styles.cardText}>{component.room}</Text>
          {component.attendanceRate && (
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: component.attendanceRate }]}>
                <Text style={styles.progressText}>{component.attendanceRate}%</Text>
              </View>
            </View>
          )
          }
        </View>
      );
    } else if (component.type === 'Exam') {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{component.type}</Text>
          <Text style={styles.cardText}>{component.time}</Text>
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
      <FlatList data={courseData.data} renderItem={renderItem} keyExtractor={(item) => item.code} />
    </View>
  );
};

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

export default AllCoursesScreen;


