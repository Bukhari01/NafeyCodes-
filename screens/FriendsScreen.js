import { View, Text } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import { UserType } from '../UserContext';
import FriendRequest from '../components/FriendRequest';
import { BASE_URL } from '../config';



const FriendsScreen = () => {
    const { userId, setUserId } = useContext(UserType);
    const [friendRequests, setFriendRequests] = useState([])
    useEffect(() => {
        fetchFriendRequests()
    }, [])

    const fetchFriendRequests = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/friend-request/${userId}`);
            if (response.status == 200) {
                console.log(response.data)
                const friendRequestsData = response.data.map((friendRequest) => ({
                    _id: friendRequest._id,
                    name: friendRequest.name,
                    email: friendRequest.email,
                    image: friendRequest.image
                }))
                setFriendRequests(friendRequestsData)
            }
        } catch (err) {
            console.log("Error message", err)
        }
    }
    console.log(friendRequests)
    return (
        <View style={{padding: 10, marginHorizontal: 10,}}>
            {friendRequests.length > 0 && <Text style={{ color: 'black' }}>Your Friend Requests!</Text>}
            {friendRequests.map((item, index) => (
                <FriendRequest key={index} item={item} friendRequests={friendRequests} setFriendRequests={setFriendRequests} />
            ))}
        </View>
    )
}

export default FriendsScreen  
