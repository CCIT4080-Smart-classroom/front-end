import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
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
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    height: 80,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 15,
  },
  headerBackTitleStyle: {
    color: 'transparent',
  },
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
}

const StudentPage = ({ route }) => {
  const { username, password } = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFF",
        tabBarInactiveTintColor: "#64B5F6",
        tabBarActiveBackgroundColor: "#2196F3",
        tabBarInactiveBackgroundColor: "#FFF",
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopColor: 'transparent',
          height: 64,
          margin: 'auto',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: 'absolute',
          shadowColor: 'black',
          shadowOpacity: 1,
          shadowRadius: 15,
          elevation: 1,
        },
        tabBarItemStyle: {
          borderRadius: 100,
          // marginHorizontal: 3,
          margin: 10,
          padding: 0,
          width: 0
        },
        tabBarLabelStyle: {
          fontSize: 14,
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
          username: username
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
        initialParams={{
          username: username,
          password: password
        }}
      />
    </Tab.Navigator>

  );
};

export default StudentPage;
