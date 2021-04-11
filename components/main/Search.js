import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import firebase from "firebase";
require("firebase/firestore");

export default function Search(props) {
  const [users, setusers] = useState([]);
  const fetchUsers = async (search) => {
    await firebase
      .firestore()
      .collection("users")
      .where("name", ">=", search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setusers(users);
      });
  };
  return (
    <View>
      <TextInput
        placeholder="Type here.."
        onChangeText={(search) => fetchUsers(search)}
        style={{
          marginBottom: 15,
          padding: 10,
          borderBottomColor: "grey",
          borderBottomWidth: 1,
          height: 50,
          borderRadius: 14,
        }}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Profile", { uid: item.id })
            }
          >
            <Text style={{ marginVertical: 6, padding: 10 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
