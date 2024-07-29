import { Text, View, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const navigation = useNavigation();
  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>AI Assistant</Text>
      ),
      headerStyle: {
        backgroundColor: '#121212',
      },
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: '#121212', flex: 1, justifyContent: 'flex-end' }}
    >
      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
          <MaterialCommunityIcons name="robot" size={34} color="white" />
          <Text style={{ color: 'white', marginLeft: 8 }}>Superboy</Text>
        </View>
        <View style={{ backgroundColor: '#262626', borderRadius: 20, padding: 10, maxWidth: '80%' }}>
          <Text style={{ color: 'white' }}>Hello, how can I help you?</Text>
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'gray', marginBottom: showEmojiSelector ? 0 : 10 }}>
        <Entypo onPress={handleEmojiPress} style={{ marginRight: 5 }} name="emoji-happy" size={24} color="gray" />
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{ flex: 1, height: 40, borderWidth: 1, borderColor: 'gray', borderRadius: 20, paddingHorizontal: 10, color: "gray" }}
          placeholder='Type your message...'
          placeholderTextColor={'grey'}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 6 }}>
          <Entypo name="camera" size={24} color="gray" />
          <Feather name="mic" size={24} color="gray" />
        </View>
        <Pressable onPress={() => handleSend("text")} style={{ backgroundColor: '#4A55A2', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20 }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Chatbot
