import { View, Text, FlatList,Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserListItem from "../components/UserListItem";
import Button from "../components/Button";
import { TouchableOpacity } from "react-native-gesture-handler";

const ChannelMembersScreen = () => {
  const [members, setMembers] = useState([]);
  const navigation = useNavigation();

  const route = useRoute();
  const channel = route.params.channel;

  const fetchMembers = async () => {
    const response = await channel.queryMembers({});
    setMembers(response.members);
  };

  useEffect(() => {
    fetchMembers();
  }, [channel]);

  return (
    <View style={{flex:1}}>
      <View style={{flex:90}}>
        <FlatList
          data={members}
          keyExtractor={(item) => item.user_id}
          renderItem={({ item }) => (
            <UserListItem user={item.user} onPress={() => { }} />
          )}
          ListHeaderComponent={() => (
            <Button
              title="Thêm thành viên"
              onPress={() => {
                navigation.navigate("InviteMembers", { channel });
              }}
            />
          )}
        />
      </View>
      <View style={{flex:10,flexDirection:'row'}}>
              <View style={{flex:90}}>

              </View>
              <View style={{flex:15}} >
                <TouchableOpacity>
                <Image source={require('../image/setting.png')}style={{width:40,height:40,margin:10}}>

                   </Image>
                </TouchableOpacity>

              </View>
      </View>
    </View>


  );
};

export default ChannelMembersScreen;
