import React from "react";
import { Text, View, Button, StyleSheet, Dimensions } from "react-native";

export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, marginBottom: 20, textAlign: "center" }}>
        Instagram
      </Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
