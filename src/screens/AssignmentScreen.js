import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

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
  function handlePress(url) {
    console.log(url)
    return <WebView source={{ uri: url }} />
  };

  return (
    <View>
      <Text style={styles.title}>Pending Assignment(s): {assignmentData.data.length}</Text>
      <FlatList
        data={assignmentData.data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress = {()=> {
              console.log(item.url)
              const URL = item.url
              handlePress(URL)
            }}
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

export default AssignmentScreen;


