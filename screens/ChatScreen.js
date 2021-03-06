import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "../database/firebaseDB";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GiftedChat } from "react-native-gifted-chat";

const auth = firebase.auth();
const db = firebase.firestore().collection("messages");

const demoMessage = {
  _id: 1,
  text: "Hello there!",
  createdAt: new Date(),
  user: {
    _id: 2,
    name: "Demo person",
    avatar: "https://placeimg.com/140/140/any",
  },
};

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .orderBy("createdAt", "desc")
      .onSnapshot((collectionSnapshot) => {
        const messages = collectionSnapshot.docs.map((doc) => {
          const date = doc.data().createdAt.toDate();
          const newDoc = { ...doc.data(), createdAt: date };
          return newDoc;
        });
        setMessages(messages);
      });

    // This is the listener for authentication
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Chat", { id: user.id, email: user.email });
      } else {
        navigation.navigate("Login");
      }
    });

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout}>
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color="grey"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });

    return unsubscribe;
  
}, []);

  const logout = () => auth.signOut();

  function sendMessages(newMessages) {
    console.log(newMessages);
    db.add(newMessages[0]);
  }
  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => sendMessages(newMessages)}
      renderUsernameOnMessage={true}
      listViewProps={{
        style: {
          backgroundColor: "#666",
        },
      }}
      user={{
        _id: 1,
      }}
    />
  );
}
