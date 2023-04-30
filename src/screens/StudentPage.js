import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';
import AllCoursesScreen from './CourseScreen';
import AssignmentScreen from './AssignmentScreen';
import ScheduleScreen from './ScheduleScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const headerConfig = {
  headerTintColor: '#ffffff',
  headerTitleContainerStyle: { justifyContent: 'center', alignItems: 'center' },
  headerStyle: {
    backgroundColor: '#2196F3',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: 70,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 15,
  },
  headerTitleAlign: 'center',
}

const StudentPage = ({ route }) => {
  const { userID, password } = route.params;

  const [assignmentData, setAssignmentData] = useState({});
  const [courseData, setCourseData] = useState([]);
  const [attendanceRecord, setAttendanceRecord] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssignmentData = async () => {
      try {
        const response = await fetch('https://api.tylerl.cyou/student/assignment?username=' + userID + '&password=' + password, {
          method: 'get',
          headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        setAssignmentData(json.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCourseData = async () => {
      try {
        const response = await fetch('https://api.tylerl.cyou/student/course');
        const json = await response.json();
        setCourseData(json.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAttendanceRecord = async () => {
      try {
        const response = await fetch(`https://api.tylerl.cyou/attendance/${userID}`);
        const json = await response.json();
        setAttendanceRecord(json.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchAssignmentData(), fetchCourseData(), fetchAttendanceRecord()]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
      isLoading ? (
        <LoadingScreen />
      ) : (
        <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FFF",
        tabBarInactiveTintColor: "#2196F3",
        tabBarActiveBackgroundColor: "#2196F3",
        tabBarInactiveBackgroundColor: "#FFF",
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopColor: 'transparent',
          height: 70,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: 'absolute',
          shadowColor: 'black',
          shadowOpacity: 1,
          shadowRadius: 15,
          elevation: 15,
        },
        tabBarItemStyle: {
          borderRadius: 100,
          // marginHorizontal: 3,
          margin: 7,
          padding: 5,
          width: 0
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold'
        }
      }}
      initialRouteName='Schedule'

    >
      <Tab.Screen
        name="Courses"
        component={AllCoursesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-book" size={24} color={color} />
          ),
          ...headerConfig,
        }}
        initialParams={{
          courseData: courseData,
          attendanceRecord: attendanceRecord,
          student_id: userID
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-calendar" size={24} color={color} />
          ),
          ...headerConfig,
        }}
        initialParams={{
          courseData: courseData,
          assignmentData: assignmentData
        }}
      />
      <Tab.Screen
        name="Assignments"
        component={AssignmentScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-document-text" size={24} color={color} />
          ),
          ...headerConfig,
        }}
        initialParams={{ assignmentData: assignmentData }}
      />
    </Tab.Navigator>)
  );
};

export default StudentPage;
