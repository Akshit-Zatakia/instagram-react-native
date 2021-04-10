import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchUser,
  fetchUserFollowing,
  fetchUserPosts,
} from "../redux/actions/index";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Feed from "./main/Feed";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Profile from "./main/Profile";
import Search from "./main/Search";
import firebase from "firebase";

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
  return null;
};
export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserPosts();
    this.props.fetchUserFollowing();
  }
  render() {
    const userUid = firebase.auth().currentUser.uid;
    console.log(userUid);
    return (
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          navigation={this.props.navigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons name="magnify" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Add");
            },
          })}
          name="MainAdd"
          component={EmptyScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons name="plus-box" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Profile", {
                uid: userUid,
              });
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons name="account-circle" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    { fetchUser, fetchUserPosts, fetchUserFollowing },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Main);
