import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";

import firebase from "firebase";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const { email, password, name } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TextInput
          placeholder="Name"
          onChangeText={(name) => this.setState({ name })}
          style={{
            marginHorizontal: 20,
            marginBottom: 15,
            padding: 10,
            borderColor: "grey",
            borderWidth: 3,
            height: 50,
            borderRadius: 14,
          }}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
          style={{
            marginHorizontal: 20,
            marginBottom: 15,
            padding: 10,
            borderColor: "grey",
            borderWidth: 3,
            height: 50,
            borderRadius: 14,
          }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          style={{
            marginHorizontal: 20,
            marginBottom: 15,
            padding: 10,
            borderColor: "grey",
            borderWidth: 3,
            height: 50,
            borderRadius: 14,
          }}
        />
        <Button onPress={() => this.onSignUp()} title="Sign Up" />
      </View>
    );
  }
}

export default Register;
