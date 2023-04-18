import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { tabBarHeight } from '../styles/tabBar';

const styles = StyleSheet.create({
  title: {
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
    marginTop: 5,
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

const AssignmentScreen = ({ route }) => {
  const {assignmentData} = route.params;

  return (
      <View>
        <FlatList
          data={assignmentData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress = {()=> {
                Linking.openURL(item.url);
              }}
            >
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardText}>{item.course_name}</Text>
              <Text style={styles.cardText}>Due Date: {new Date(item.end_time * 1000).toDateString()}</Text>
              <Text style={[styles.cardText, { color: '#FF5722', textDecorationLine: 'underline'}]}>Click to submit</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
          ListHeaderComponent={
            <Text style={styles.title}>Pending Assignment(s): {assignmentData.length}</Text>}
            contentContainerStyle={{ paddingBottom: tabBarHeight }}
        />
      </View>
  );
};

export default AssignmentScreen;