import { View, Text, Button, Pressable, ScrollView, Image } from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserType } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import User from '../components/User';
import { BASE_URL } from '../config';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { userId, setUserId } = useContext(UserType);
    const [users, setUsers] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerLeft: () => (
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>SuperChat</Text>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <Ionicons onPress={() => navigation.navigate("Chats")} name="chatbox-ellipses-outline" size={24} color="white" />
                    <MaterialIcons onPress={() => navigation.navigate("Friends")} name="people-outline" size={24} color="white" />
                    <MaterialIcons onPress={() => navigation.navigate("Login")} name="logout" size={24} color="white" />
                </View>
            ),
            headerStyle: {
                backgroundColor: '#121212',
            },
        });
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = await AsyncStorage.getItem("authToken");
            console.log("this is ", token);
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            setUserId(userId);

            axios
                .get(`${BASE_URL}/users/${userId}`)
                .then((response) => {
                    setUsers(response.data);
                })
                .catch((error) => {
                    console.log("error retrieving users", error);
                });
        };

        fetchUsers();
    }, []);

    console.log("users", users);

    return (
        <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: '#121212' }}>
            <ScrollView style={{ flex: 1, backgroundColor: '#121212' }}>
                <View>
                    <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 12, }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Stories</Text>
                    </View>
                    <ScrollView horizontal style={{ padding: 10, borderTopWidth: 0.3, borderBottomWidth: 0.3, borderColor: 'grey', backgroundColor: '#121212' }}>
                        {users.slice().reverse().map((item, index) => (
                            <View key={index} style={{ alignItems: 'center', marginRight: 10 }}>
                                <Image source={{ uri: item.image }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                                <Text style={{ color: "white", marginTop: 5, fontSize: 12 }}>{item.name}</Text>
                            </View>
                        ))}
                    </ScrollView>


                    <View style={{ alignItems: 'center', marginTop: 30, }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Add new friends</Text>
                    </View>

                    <View style={{ padding: 10, backgroundColor: '#121212', }}>
                        {users.map((item, index) => (
                            <User key={index} item={item} />
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View style={{ padding: 20, alignItems: 'center' }}>
                <Pressable style={{ flexDirection: "row", backgroundColor: "#4A55A2", width: 200, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>Try Superboy</Text>
                    <MaterialCommunityIcons onPress={() => navigation.navigate("Chatbot")} name="robot" size={24} color="white" />
                </Pressable>
            </View>
        </View>
    );
}

export default HomeScreen;

