// AllCoursesScreen.js

import React from 'react';
import { View, Text, FlatList } from 'react-native';

const allCoursesData = [
  { course: 'Math 101', time: '9:00 AM - 10:30 AM', location: 'Room 101', lecturer: 'John Doe' },
  { course: 'Science 201', time: '11:00 AM - 12:30 PM', location: 'Room 201', lecturer: 'Jane Doe' },
  { course: 'English 101', time: '1:00 PM - 2:30 PM', location: 'Room 301', lecturer: 'Alice Smith' },
];

const AssignmentScreen = () => {
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Pending Assignment</Text>
      <FlatList
        data={allCoursesData}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#f5f5f5', padding: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>{item.course}</Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>{item.time}</Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>{item.location}</Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>{item.lecturer}</Text>
          </View>
        )}
        keyExtractor={(item) => item.course}
      />
    </View>
  );
};

export default AssignmentScreen;
