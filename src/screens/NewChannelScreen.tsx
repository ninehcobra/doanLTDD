import { View, Text, TextInput, StyleSheet, Image, Alert } from "react-native";
import React, { useState } from "react";
import Button from "../components/Button";
import { useChatContext } from "stream-chat-expo";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const NewChannelScreen = () => {
  const [name, setName] = useState("");
  const { client } = useChatContext();
  const { userId } = useAuthContext();
  const [image, setImage] = useState("");
  const navigation = useNavigation();

  const createChannel = async () => {
    if(name==""||image=="")
    {
     Alert.alert("Vui lòng nhập đủ thông tin")
    }
    else{const channel = client.channel("team", uuidv4(), { name, image });
    await channel.create();
    await channel.addMembers([userId]);
    navigation.navigate("ChannelScreen", { channel });}
    
    
  };

  return (
    <View style={styles.root}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../image/name.png')} style={{ width: 45, height: 45, padding: 10}}>

          </Image>

        </View>
        <View style={{ flex: 90 }}>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Tên kênh"
            style={styles.input}
            placeholderTextColor="lightgray"
          />
        </View>

      </View>
      <View style={{ flexDirection: "row",marginTop:10 }}>
        <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../image/pic.png')} style={{ width: 45, height: 45, padding: 10 }}>

          </Image>

        </View>
        <View style={{ flex: 90 }}>

        <TextInput
        value={image}
        onChangeText={setImage}
        placeholder="Link ảnh"
        style={styles.input}
        placeholderTextColor="lightgray"
      />
        </View>

      </View>



     
      <Button title="Tạo kênh trò chuyện" onPress={createChannel} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    color: "white",
  },
});

export default NewChannelScreen;
