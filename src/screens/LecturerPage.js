import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const LecturerPage = ({ route }) => {
  const { userID } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the data from the server or API endpoint
    const fetchData = async () => {
      const response = await fetch(`https://api.tylerl.cyou/lecturer/${userID}`);
      const json = await response.json();
      setData(json.data);
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.c_code}</Text>
      <FlatList
        data={item.students}
        keyExtractor={(item) => item.student_id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.cardText}>
              {item.student_id}
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${item.attendance_rate}%` }]}>
                <Text style={styles.progressText}>{item.attendance_rate}%</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.c_code}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  studentId: {
    fontSize: 14,
    marginLeft: 10,
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

export default LecturerPage;