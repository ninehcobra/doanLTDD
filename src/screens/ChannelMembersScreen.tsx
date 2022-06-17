import { View, Text, FlatList,Image, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserListItem from "../components/UserListItem";
import Button from "../components/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import FloatingButton from "../components/FloatingButton"

function ChannelMembersScreen(){
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
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
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
              title="Thành viên của nhóm"
              
            />
          )}
        />
          
      </View>
      <View style={{ flex: 10, flexDirection: 'row' }}>
      
    
        <FloatingButton></FloatingButton>
      
       


      </View>
    </View>
    </KeyboardAvoidingView>


  );
};

export default ChannelMembersScreen;
