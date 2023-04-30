import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const LoginPage = ({ navigation }) => {
  const [userID, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('student');

  const handleLogin = async () => {
    setLoading(true);
    var body = {
      username: userID,
      password: password
    }
    if (userType == 'student') {
      let status;
      fetch('https://api.tylerl.cyou/auth/score', {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => {
          status = res.status;
          return res.json()
        })
        .then((jsonResponse) => {
          console.log(jsonResponse);
          console.log(status);
          if (jsonResponse['error'])
            Alert.alert('Error', jsonResponse['error']['message'])
          else {
            navigation.replace('Student', {
              userID: userID,
              password: password,
            });
          }
        })
        .catch((err) => {
          // handle error
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        })
      // console.log(response.text());
      // console.log(response.json())
      // if (response)
      //   console.log('Success');
      //   // navigation.navigate("Homepage");
      // else
      //   Alert.alert('Error', 'Wrong Credentials')
    } else if (userType === 'lecturer') {
      if (password === 'password') {
        navigation.replace('Lecturer', {
          userID: userID,
          password: password,
        });
      } else {
        Alert.alert('Error', 'Wrong Credentials')
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/schoollogo.png')}/>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            userType === 'student' && styles.radioButtonSelected,
          ]}
          onPress={() => setUserType('student')}
        >
          <Text style={[styles.radioButtonText, userType === 'student' && styles.radioButtonTextSelected]}>Student</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButton,
            userType === 'lecturer' && styles.radioButtonSelected,
          ]}
          onPress={() => setUserType('lecturer')}
        >
          <Text style={[styles.radioButtonText, userType === 'lecturer' && styles.radioButtonTextSelected]}>Teacher</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="ID"
        onChangeText={setUsername}
        value={userID}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: "40%"
  },
  radioContainer: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  radioButton: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 140,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3
  },
  radioButtonSelected: {
    backgroundColor: '#2196F3',
  },
  radioButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#454545'
  },
  radioButtonTextSelected: {
    color: '#FFF'
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    marginBottom: 15,
    paddingVertical: 6,
    paddingHorizontal: 20,
    width: 300,
    fontSize: 18,
    fontWeight: 'bold',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 100,
    marginTop: 30,
    padding: 10,
    width: 300,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default LoginPage;