import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';

const assignmentData = {
  data: [
    {
      name: '書面專題報告（呈交） is due',
      end_time: 1681833540,
      course_name: 'Advanced Chinese Language / 高級中國語文',
      url: 'https://soul2.hkuspace.hku.hk/mod/assign/view.php?id=1766501&action=editsubmission',
    },
    {
      name: '書面專題報告（相似程度檢查） - Part 1',
      end_time: 1681833540,
      course_name: 'Advanced Chinese Language / 高級中國語文',
      url: 'https://soul2.hkuspace.hku.hk/mod/turnitintooltwo/view.php?id=1766502',
    },
    {
      name: 'Final Report [Min: 2000 words][pdf] + A2 poster [pdf][Due on 30 Apr 2023 Sun 23:59][20%] is due',
      end_time: 1682870340,
      course_name: 'Project on Knowledge Products Development / 工程專題項目',
      url: 'https://soul2.hkuspace.hku.hk/mod/assign/view.php?id=1809564&action=editsubmission',
    },
  ],
};

const AssignmentScreen = () => {
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Pending Assignment</Text>
      <FlatList
        data={assignmentData.data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 10, elevation: 2 }}
            onPress={() => Linking.openURL(item.url)}
          >
            <Text style={{ fontSize: 16, marginBottom: 5 }}>{item.name}</Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>{item.course_name}</Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>Due Date: {new Date(item.end_time * 1000).toDateString()}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
}); */

export default AssignmentScreen;