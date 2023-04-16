import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('student');
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    var body = {
      username: username,
      password: password
    }
    if (userType == 'student') {  
      let status; 
      fetch('https://api.tylerl.cyou/auth/score', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
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
        else{
          navigation.navigate("Student");
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