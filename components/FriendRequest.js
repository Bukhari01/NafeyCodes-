import { View, Text, Pressable, Image } from 'react-native'
import React, { useContext } from 'react'
import { UserType } from '../UserContext';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../config';


const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
    const { userId, setUserId } = useContext(UserType);
    const navigation = useNavigation();
    const acceptRequest = async (friendRequestId) => {
        try {
            const response = await fetch(
                `${BASE_URL}/friend-request/accept`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        senderId: friendRequestId,
                        recepientId: userId,
                    }),
                }
            );

            if (response.ok) {
                setFriendRequests(
                    friendRequests.filter((request) => request._id !== friendRequestId)
                );
                navigation.navigate("Chats");
            }
        } catch (err) {
            console.log("error acceptin the friend request", err);
        }
    };
    return (
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }}>
            <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri: item.image }} />
            <Text style={{ flex: 1, color: 'black', marginLeft: 10, fontSize: 15, fontWeight: "bold" }}>{item?.name}</Text>
            <Pressable onPress={() => acceptRequest(item._id)} style={{ backgroundColor: '#0066b2', padding: 10, borderRadius: 6 }}>
                <Text style={{ textAlign: 'center', color: 'white' }}>Accept</Text>
            </Pressable>
            <Pressable style={{ marginLeft: 5, backgroundColor: 'red', padding: 10, borderRadius: 6 }}>
                <Text style={{ textAlign: 'center', color: 'white' }}>Decline</Text>
            </Pressable>
        </Pressable>
    )
}

export default FriendRequest 
