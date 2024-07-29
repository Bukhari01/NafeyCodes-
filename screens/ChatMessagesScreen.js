import { View, Text, ScrollView, KeyboardAvoidingView, TextInput, Pressable, Image, } from 'react-native'
import React, { useState, useContext, useLayoutEffect, useEffect } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather';
import EmojiSelector from 'react-native-emoji-selector';
import { UserType } from '../UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../config';




const ChatMessagesScreen = () => {
    const [showEmojiSelector, setShowEmojiSelector] = useState(false);
    const { userId, setUserId } = useContext(UserType);
    const [recepientData, setRecepientData] = useState("");
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState("");
    const route = useRoute()
    const { recepientId } = route.params
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const handleEmojiPress = () => {
        setShowEmojiSelector(!showEmojiSelector);
    };



    const fetchMessages = async () => {
        try {
            const response = await fetch(
                `${BASE_URL}/messages/${userId}/${recepientId}`
            );
            const data = await response.json();

            if (response.ok) {
                setMessages(data);
            } else {
                console.log("error showing messags", response.status.message);
            }
        } catch (error) {
            console.log("error fetching messages", error);
        }
    };
    console.log("RP", recepientId)

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        const fetchRecepientData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/user/${recepientId}`);
                const data = await response.json();
                setRecepientData(data);
            } catch (error) {
                console.log("error retrieving details", error);
            }
        }

        fetchRecepientData();
    }, [])

    const handleSend = async (messageType, imageUri) => {
        try {
            const formData = new FormData();
            formData.append("senderId", userId);
            formData.append("recepientId", recepientId)

            //if the message type is image or a normal text 
            if (messageType === "image") {
                formData.append("messageType", "image");
                formData.append("imafeFile", {
                    imageUri,
                    name: "image.jpg",
                    type: "image/jpeg"
                })
            } else {
                formData.append("messageType", "text");
                formData.append("messageText", message)
            }

            const response = await fetch(`${BASE_URL}/messages`, {
                method: "POST",
                body: formData
            })

            if (response.ok) {
                setMessage("");
                setSelectedImage("");
            }
        } catch (error) {
            console.log("error in sending the message", error)
        }
    }

    console.log("messages")

    useLayoutEffect(() => {
        if (recepientData?.image) {
            navigation.setOptions({
                headerTitle: "",
                headerLeft: () => (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" />
                        <View style={{ flexDirection: "row", alignItems: "center", }}>
                            <Image style={{ width: 40, height: 40, borderRadius: 25, resizeMode: "cover", marginLeft: 5 }} source={{ uri: recepientData.image }} />
                            <Text style={{ color: 'black', marginLeft: 5, fontSize: 15, fontWeight: 'bold' }}>{recepientData?.name}</Text>
                        </View>
                    </View>
                ),
            });
        }
    }, [navigation, recepientData]);
    const formatTime = (time) => {
        const options = { hour: "numeric", minute: "numeric" };
        return new Date(time).toLocaleString("en-US",options);
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "F0F0F0" }}>
            <ScrollView>
                {messages.map((item, index) => {
                    if (item.messageType === "text") {
                        const isSentByCurrentUser = item.senderId === userId;

                        return (
                            <Pressable
                                key={index}
                                style={{
                                    alignSelf: isSentByCurrentUser ? "flex-end" : "flex-start",
                                    backgroundColor: isSentByCurrentUser ? "#DCF8C6" : "white",
                                    padding: 8,
                                    maxWidth: "60%",
                                    borderRadius: 7,
                                    margin: 10,
                                }}
                            >
                                <Text style={{ color: 'black' }}>{item.message}</Text>
                                <Text style={{ color: 'black' }}>{formatTime(item.timeStamp)}</Text>
                            </Pressable>
                        );
                    } else {
                        return null;
                    }
                })}
            </ScrollView>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'gray', marginBottom: showEmojiSelector ? 0 : 10 }}>
                <Entypo onPress={handleEmojiPress} style={{ marginRight: 5 }} name="emoji-happy" size={24} color="gray" />
                <TextInput
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    style={{ flex: 1, height: 40, borderWidth: 1, borderColor: 'gray', borderRadius: 20, paddingHorizontal: 10, color: "gray" }}
                    placeholder='Type your message...'
                    placeholderTextColor={'grey'}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7, marginHorizontal: 6 }}>
                    <Entypo name="camera" size={24} color="gray" />
                    <Feather name="mic" size={24} color="gray" />
                </View>
                <Pressable onPress={() => handleSend("text")} style={{ backgroundColor: '#4A55A2', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
                </Pressable>
            </View>

            {showEmojiSelector && (
                <EmojiSelector onEmojiSelected={(emoji) => {
                    setMessage((prevMessage) => prevMessage + emoji)
                }} style={{ height: 250 }} />
            )}
        </KeyboardAvoidingView>
    )
}

export default ChatMessagesScreen