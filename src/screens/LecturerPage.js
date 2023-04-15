import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LecturerPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Lecturer!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LecturerPage;