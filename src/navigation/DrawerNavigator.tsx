import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Text, StyleSheet, View, Pressable, KeyboardAvoidingView, Alert } from "react-native";
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
import { Image, Linking } from 'react-native'
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import info from "../screens/Info";





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
      <Drawer.Screen name="Info"
        component={info}
        options={{ headerShown: false }}/>
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






  const ok = async (text) => {
    await setQuery(text)
    alert(Query)
  }
  const [Query, setQuery] = useState("")
  const message = "Chào bạn mình cần hỗ trợ!!!"
  return (
    <KeyboardAvoidingView {...props} style={{ flex: 1 }}>


      <View style={{ flex: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
       

        <Image source={require('../image/chat.png')} style={{ height: 35, width: 35, marginTop: 25 }}></Image>
        <Text style={styles.title}>App Chat</Text>
      
       <TouchableOpacity onPress={()=>{navigation.navigate(("Info"))}}>

       <Image source={require('../image/user.png')} style={{ height: 35, width: 35, marginTop: 25,marginLeft:90 }}></Image>

       </TouchableOpacity>

      </View>






      <View style={{ flex: 10, flexDirection: 'row' }}>

        <View style={{ flex: 1, backgroundColor: "gray", flexDirection: 'row', padding: 10, alignItems: 'center', borderColor: 'white', borderRadius: 20 }}>
          <Image source={require('../image/search.png')} style={{ width: 25, height: 25 }}>
          </Image>
          <TextInput placeholder="Tìm kiếm" style={{ margin: 5, alignItems: 'center', color: 'white', fontSize: 16, flex: 1, }} onChangeText={text => { ok(text) }} >

          </TextInput>
        </View>

      </View>
      <View style={{ flex: 45 }}>
        <Text
          style={[
            styles.groupTitle,
            { color: "white" },
          ]}
        >
          Cộng đồng
        </Text>
        <Button
          title="Tạo một kênh mới"
          onPress={() => {
            navigation.navigate("NewChannel");
          }}
        />
        <ChannelList onSelect={onChannelSelect} filters={publicFilters} />


      </View>


      <View style={{ flex: 45 }}>
        <Text

          style={[
            styles.groupTitle,
            { color: "white" },
          ]}
        >
          Riêng tư
        </Text>
        <Button
          title="Tạo cuộc trò chuyện "
          onPress={() => {
            navigation.navigate("UserList");
          }}
        />
        <ChannelList onSelect={onChannelSelect} filters={privateFilters} />

      </View>


      <View style={{ flex: 20 }}>
        <Text style={styles.logout} onPress={logout}>
          Đăng xuất
        </Text>
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity onPress={() => {
            openUrl(url)
          }} >
            <Image style={{ height: 40, width: 40, margin: 5 }} source={require("../image/github.png")} ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            Linking.openURL(`mailto:20520884@gm.uit.edu.vn,ttbexinhtt2903@gmail.com,20520380@gm.uit.edu.vn,20520674@gm.uit.edu.vn,20520713@gm.uit.edu.vn?subject=Hỗ trợ&body=${message}`)
          }}>
            <Image style={{ height: 40, width: 40, margin: 5 }} source={require("../image/information.png")}></Image>
          </TouchableOpacity>
        </View>
      </View>




    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 16,
    margin: 10,
    marginTop: 35,
  },
  groupTitle: {
    margin: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  tabs: {


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
