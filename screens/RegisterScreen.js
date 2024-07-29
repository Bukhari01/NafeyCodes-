import { Alert, View, Text, TextInput, KeyboardAvoidingView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../config';



const RegisterScreen = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ name, setName ] = useState("");
  const [ image, setImage ] = useState("");
  const navigation = useNavigation();
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    }

    //Send a POST request to the backend API to register the user
    axios.post(`${BASE_URL}/register`, user).then((response) => {
      console.log(response);
      Alert.alert(
        "Registration Successful",
        "You have been registered successfully"
      );
      setName("");
      setEmail("");
      setPassword("");
      setImage("");
    }).catch((error) => {
      Alert.alert(
        "Registration Error",
        "Error occured while registring"
      )
      console.log("registration failed", error)

    })
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', padding: 10 }}>
      <KeyboardAvoidingView>
        <View style={{ marginTop: 25, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#4A55A2', fontSize: 17, fontWeight: 600 }}>Register</Text>

          <Text style={{ color: 'black', fontSize: 17, fontWeight: 600, marginTop: 15 }}>Create an Account</Text>

        </View>
        <View style={{ marginTop: 30 }}>
          <View>
            <Text style={{ color: 'gray', fontWeight: '600', fontSize: 18 }}>
              Name
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{ color: 'black', fontSize: name ? 18 : 18, borderBottomColor: 'gray', borderBottomWidth: 1, width: 300, marginVertical: 10 }}
              placeholderTextColor={"black"}
              placeholder='Enter your Name'
            />
          </View>
          <View>
            <Text style={{ color: 'gray', fontWeight: '600', fontSize: 18 }}>
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ color: 'black', fontSize: email ? 18 : 18, borderBottomColor: 'gray', borderBottomWidth: 1, width: 300, marginVertical: 10 }}
              placeholderTextColor={"black"}
              placeholder='Enter your Email'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ color: 'gray', fontWeight: '600', fontSize: 18 }}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{ color: 'black', fontSize: email ? 18 : 18, borderBottomColor: 'gray', borderBottomWidth: 1, width: 300, marginVertical: 10 }}
              placeholderTextColor={"black"}
              placeholder='Enter your Password'
            />
          </View>
          <View>
            <Text style={{ color: 'gray', fontWeight: '600', fontSize: 18 }}>
              Image
            </Text>
            <TextInput
              value={image}
              onChangeText={(text) => setImage(text)}
              style={{ color: 'black', fontSize: image ? 18 : 18, borderBottomColor: 'gray', borderBottomWidth: 1, width: 300, marginVertical: 10 }}
              placeholderTextColor={"black"}
              placeholder='Enter your image'
            />
          </View>

          <Pressable onPress={handleRegister} style={{ borderRadius: 20, backgroundColor: '#4A55A2', width: 200, padding: 15, marginTop: 50, marginLeft: 'auto', marginRight: 'auto' }}>
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>Register</Text>
          </Pressable>

          <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 10, }}>
            <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>
              Already have an account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default RegisterScreen