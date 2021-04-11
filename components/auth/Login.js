import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";

import firebase from "firebase";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
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
          placeholder="email"
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
          placeholder="password"
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
        <Button onPress={() => this.onSignIn()} title="Sign In" />
      </View>
    );
  }
}

export default Login;
