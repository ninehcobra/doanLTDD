import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChannelList } from "stream-chat-expo";
import { useAuthContext } from "../contexts/AuthContext";
import ChannelScreen from "../screens/ChannelScreen";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import UserListScreen from "../screens/UserListScreen";
import Button from "../components/Button";
import ChannelMembersScreen from "../screens/ChannelMembersScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import NewChannelScreen from "../screens/NewChannelScreen";
import ChannelStack from "./ChannelStack";
import { Image,Linking} from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="ChannelScreen"
        component={ChannelStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="UserList"
        component={UserListScreen}
        options={{ title: "Users" }}
      />

      <Drawer.Screen
        name="NewChannel"
        component={NewChannelScreen}
        options={{ title: "New Channel" }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  const [tab, setTab] = useState("private");
  const { navigation } = props;

  const onChannelSelect = (channel) => {
    // navigate to a screen for this channel
    navigation.navigate("ChannelScreen", {
      screen: "Chat",
      params: { channel },
    });
  };

  const url = "https://github.com/ninehcobra/doanLTDD";

  const { userId } = useAuthContext();

  const openUrl = async (url) => {
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
        await Linking.openURL(url);
    } else {
        Alert.alert(`Link này bị lỗi rồi cha ơi đổi đi: ${url}`);
    }
}

  const privateFilters = { type: "messaging", members: { $in: [userId] } };
  const publicFilters = {
    type: { $ne: "messaging" },
    members: { $in: [userId] },
  };

  const logout = () => {
    Auth.signOut();
  };
  const message = "Chào bạn mình cần hỗ trợ!!!"
  return (
    <SafeAreaView {...props} style={{ flex: 1 }}>
      <Text style={styles.title}>App Chat</Text>

      <View style={styles.tabs}>
        <Text
          onPress={() => setTab("public")}
          style={[
            styles.groupTitle,
            { color: tab === "public" ? "white" : "gray" },
          ]}
        >
          Kênh Chung
        </Text>
        <Text
          onPress={() => setTab("private")}
          style={[
            styles.groupTitle,
            { color: tab === "private" ? "white" : "gray" },
          ]}
        >
          Kênh Riêng
        </Text>
      </View>

      {tab === "public" ? (
        <>
          <Button
            title="Tạo một kênh mới"
            onPress={() => {
              navigation.navigate("NewChannel");
            }}
          />
          <ChannelList onSelect={onChannelSelect} filters={publicFilters} />
        </>
      ) : (
        <>
          <Button
            title="Tạo cuộc trò chuyện "
            onPress={() => {
              navigation.navigate("UserList");
            }}
          />
          <ChannelList onSelect={onChannelSelect} filters={privateFilters} />
        </>
      )}
     
      <Text style={styles.logout} onPress={logout}>
        Đăng xuất
      </Text>
      <View style={{flexDirection:'row',alignItems:"center",justifyContent:"center"}}>
      <TouchableOpacity onPress={() => {
                    openUrl(url)
                }} > 
      <Image style={{height:40,width:40,margin:5}} source={require("../image/github.png")} ></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
                    Linking.openURL(`mailto:20520884@gm.uit.ed.vn?subject=Hỗ trợ&body=${message}`)
                }}>
        <Image style={{height:40,width:40,margin:5}} source={require("../image/information.png")}></Image>
      </TouchableOpacity>
      </View>
      
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 16,
    margin: 10,
  },
  groupTitle: {
    margin: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  logout: {
    color: "white",
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
  },
});

export default DrawerNavigator;
