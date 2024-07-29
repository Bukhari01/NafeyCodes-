import { Alert, View, Text, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken")

        if (token) {
          navigation.navigate("Home")
        } else {
          //token not found, show the toggle screen
        }
      } catch (error) {
        console.log("error", error)
      }
    }
    checkLoginStatus();
  }, [])


  const handleLogin = () => {
    const user = {
      email: email,
      password: password
    }
    axios.post(`${BASE_URL}/login`, user).then((response) => {
      console.log(response);
      const token = response.data.token;
      AsyncStorage.setItem("authToken", token);
      navigation.replace("Home");
    }).catch((error) => {
      Alert.alert("Login error", "Invalid email or password")
      console.log("login error", error)
    })
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', padding: 10 }}>
      <KeyboardAvoidingView>
        <View style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#4A55A2', fontSize: 17, fontWeight: 600 }}>Sign in</Text>

          <Text style={{ color: 'black', fontSize: 17, fontWeight: 600, marginTop: 15 }}>Sign in to your account</Text>

        </View>
        <View style={{ marginTop: 50 }}>
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

          <Pressable onPress={handleLogin} style={{ borderRadius: 20, backgroundColor: '#4A55A2', width: 200, padding: 15, marginTop: 50, marginLeft: 'auto', marginRight: 'auto' }}>
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>Login</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 10, }}>
            <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>
              Don't have an account? Sign up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default LoginScreen