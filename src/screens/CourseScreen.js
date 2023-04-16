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

const AllCoursesScreen = () => {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    fetch('https://api.tylerl.cyou/student/course')
      .then((response) => response.json())
      .then((json) => setCourseData(json.data))
      .catch((error) => console.error(error));
  }, []);

  const renderComponent = (component) => {
    if (component.type === 'Lecture') {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{`${component.type} ${component.number}`}</Text>
          <Text style={styles.cardText}>{component.time}</Text>
          <Text style={styles.cardText}>{component.room}</Text>
          {component.attendanceRate && (
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${component.attendanceRate}%` }]}>
                <Text style={styles.progressText}>{component.attendanceRate}%</Text>
              </View>
            </View>
          )}
        </View>
      );
    } else if (component.type === 'Exam') {
      return (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{`${component.type}`}</Text>
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
      <FlatList data={courseData} renderItem={renderItem} keyExtractor={(item) => item.code} />
    </View>
  );
};

export default AllCoursesScreen;