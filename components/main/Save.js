import React, { useState } from "react";
import { Button, Image, TextInput, View } from "react-native";

import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

import * as ImageManipulator from "expo-image-manipulator";

export default function Save(props) {
  const [caption, setCaption] = useState("");

  const uploadImage = async () => {
    const { uri } = await ImageManipulator.manipulateAsync(
      props.route.params.image,
      [],
      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
    );
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    // Fetch the image from uri
    const response = await fetch(uri);
    // Create blob of image
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    // Give us the progress of uploading of image
    const taskProgress = (snapshot) => {
      console.log(snapshot.bytesTransferred);
    };

    // Give us the download url of image
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };

    // Give us the error if some
    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    // Now attach the task with this 3 methods
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        props.navigation.popToTop();
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write a caption.."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}
