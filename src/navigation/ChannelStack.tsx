import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import ChannelMembersScreen from "../screens/ChannelMembersScreen";
import ChannelScreen from "../screens/ChannelScreen";
import InviteMembersScreen from "../screens/InviteMembersScreen";
import { AntDesign } from "@expo/vector-icons";
import {FloatingButton} from "../components/FloatingButton"
import DrawerNavigator from "./DrawerNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const ChannelStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={ChannelScreen}
        options={({ navigation, route }) => ({
          title: "Kênh chat",
          headerRight: () => (
            <MembersIcon route={route} navigation={navigation} />
          ),
          headerLeft: () => <HamburgerMenu navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ChannelMembers"
        component={ChannelMembersScreen}
        options={{ title: "Thông tin của nhóm" }}
      />
      <Stack.Screen
        name="InviteMembers"
        component={InviteMembersScreen}
        options={{ title: "Thêm thành viên" }}
      />
      <Stack.Screen name="Root"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
       />
    </Stack.Navigator>
  );
};

const MembersIcon = ({ route, navigation }) => {
  if (!route?.params?.channel) {
    return null;
  }

  return (
    <Pressable
      style={styles.icon}
      onPress={() =>
        navigation.navigate("ChannelMembers", {
          channel: route.params.channel,
        })
      }
    >
      <FontAwesome5 name="users" size={24} color="lightgray" />
    </Pressable>
  );
};

const HamburgerMenu = ({ navigation }) => (
  <Pressable style={styles.icon} onPress={() => navigation.openDrawer()}>
    <AntDesign name="menufold" size={24} color="lightgray" />
  </Pressable>
);

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});

export default ChannelStack;
