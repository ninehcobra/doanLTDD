import { View, Text, StyleSheet,Image } from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Channel, MessageList, MessageInput } from "stream-chat-expo";

const ChannelScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const channel = route.params?.channel;



  if (!channel) {
    return (
      <View style={styles.errorContainer}>
        <Image style={{width:120,height:120}} source={require("../image/talking.png")}>

        </Image>
        <Text style={styles.errorText}>Chọn kênh để bắt đầu trò chuyện</Text>
      </View>
    );
  }

  return (
    <Channel channel={channel} key={channel.data.id}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  errorText: {
    color: "white",
    fontSize: 16,
  },
});

export default ChannelScreen;
