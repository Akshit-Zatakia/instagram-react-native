import firebase from "firebase";
require("firebase/firestore");
import React, { useState, useEffect } from "react";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";

import { connect } from "react-redux";

function Profile(props) {
  const [userPosts, setuserPosts] = useState([]);
  const [user, setuser] = useState(null);
  const [following, setfollowing] = useState(false);

  useEffect(() => {
    const { currentUser, posts } = props;
    console.log(props.route.params.uid);
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setuser(currentUser);
      setuserPosts(posts);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setuser(snapshot.data());
          } else {
            console.log("User does not exist.");
          }
        });

      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setuserPosts(posts);
        });
    }
    if (props.following.indexOf(props.route.params.uid) > -1) {
      setfollowing(true);
    } else {
      setfollowing(false);
    }
  }, [props.route.params.uid, props.following]);

  // onFollow method set the button to following
  // Add the value in firebase
  const onFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .set({});
  };

  // onUnfollow method set the button to follow
  // Delete the doc in firebase
  const onUnfollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .delete();
  };

  if (user === null) {
    return <View></View>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          <View>
            {following ? (
              <Button title="Following" onPress={() => onUnfollow()} />
            ) : (
              <Button title="Follow" onPress={() => onFollow()} />
            )}
          </View>
        ) : null}
      </View>
      <View style={styles.galleryContainer}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

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
    aspectRatio: 1 / 1,
  },
  imageContainer: {
    flex: 1 / 3,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following,
});

export default connect(mapStateToProps, null)(Profile);
