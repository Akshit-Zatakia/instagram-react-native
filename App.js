import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./components/Landing";
import Register from "./components/auth/Register";
import Main from "./components/Main";
import Login from "./components/auth/Login";

// Connecting redux with react-native
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import Add from "./components/main/Add";
import Save from "./components/main/Save";

const store = createStore(rootReducer, applyMiddleware(thunk));

// Configuring the firebase (In production put it in .env file)
const firebaseConfig = {
  apiKey: "AIzaSyDZjvojfr004FJ1Ug1M8GHAuV5ThDmII64",
  authDomain: "instagram-d4a67.firebaseapp.com",
  projectId: "instagram-d4a67",
  storageBucket: "instagram-d4a67.appspot.com",
  messagingSenderId: "1071786350900",
  appId: "1:1071786350900:web:7e0fd49937ca58b6062d61",
  measurementId: "G-7C7BF0K2PT",
};

// Check if there are no apps then initialize one
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// This is for the navigation routing
const Stack = createStackNavigator();

export class App extends Component {
  // Contructor is to check if user is already logged in
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  // This is default method and we are using it to mount the components according to loaded variable
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen
              name="Add"
              component={Add}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name="Save"
              component={Save}
              navigation={this.props.navigation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
