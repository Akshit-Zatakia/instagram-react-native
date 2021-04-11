import firebase from "firebase";
require("firebase/firestore");
import React, { useState, useEffect } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { connect } from "react-redux";

function Feed(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let posts = [];
    if (props.usersLoaded == props.following.length) {
      for (let i = 0; i < props.following.length; i++) {
        const user = props.users.find((el) => el.uid === props.following[i]);
        if (user != undefined) {
          posts = [...posts, ...user.posts];
        }
      }
      posts.sort(function (x, y) {
        return x.creation - y.creation;
      });
      setPosts(posts);
    }
  }, [props.usersLoaded]);

  return (
    <View style={styles.container}>
      <View style={styles.galleryContainer}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Text style={{ fontSize: 24, marginLeft: 10 }}>
                {item.user.name}
              </Text>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

const dimensions = Dimensions.get("window");
const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    margin: 20,
  },
  galleryContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: imageHeight,
    width: imageWidth,
  },
  imageContainer: {
    flex: 1 / 3,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  users: store.usersState.users,
  usersLoaded: store.usersState.usersLoaded,
});

export default connect(mapStateToProps, null)(Feed);
