import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (userType == 'student') {    
      try {
        const response = await fetch('https://api.ccit4080.tylerl.cyou/auth/score', {
          username,
          password,
        })
        if (response.ok)
        console.log('Success');
          // navigation.navigate('Home');
        else
          console.log(response.text());
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/schoollogo.png')}/>
      <Picker
        selectedValue = {userType} 
        style = {{height: 50, width:150}} 
        onValueChange = {(itemValue) => setUserType(itemValue)}
      >
        <Picker.Item label = "Teacher" value = "teacher"/>
        <Picker.Item label = "Student" value = "student"/>
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Student ID"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
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
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default LoginPage;