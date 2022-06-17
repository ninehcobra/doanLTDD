import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableHighlight, Animated, Modal, Text, KeyboardAvoidingView, TouchableOpacity ,Image, Alert} from "react-native";

import { FontAwesome5, Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import info from "../screens/Info"
import b from "./GetChannel";
import { Flag, useChatContext } from "stream-chat-expo";
import { useAuthContext } from "../contexts/AuthContext";



function FloatingButton1 () {
  const [isVisible,setVisible]=useState(false)
  const[user,setUser]=useState([]);
  const { client } = useChatContext();
const { userId } = useAuthContext();
useEffect( () => {
    getInfo();
 }, [])
 const getInfo = async()=>{
    const response = await client.queryUsers({ id: userId });
     setUser(response.users)
}
const [name,setName]=useState("")
const [image,setImage]=useState("")
const Update=async()=>{

    if(name==""&&image!="")
    {
    const update = await channel.update(
        {
            image:image,
        },
    );
    update
    console.log(channel.data.name)
    console.log(channel.data.image)
    }
    else if(name!=""&&image=="")
    {
        const update = await channel.update(
            {
                name: name,
            },
        );
        update
    console.log(channel.data.name,channel.data.image)
    console.log(channel.data.image)
    }
    else if(name==""&&image==""){
        const update = await channel.update(
            {
                name: channel.data.name,
                image:channel.data.image,
            },
        );
        update
    console.log(channel.data.name,channel.data.image)
    console.log(channel.data.image)
    }
    else {
        const update = await channel.update(
            {
                name: name,
                image:image,
            },
        );
        update
    console.log(channel.data.name,channel.data.image)
    console.log(channel.data.image)
    }
  
    setVisible(!isVisible)
}
const navigation = useNavigation();
const DeleteQuery=async()=>{
    const destroy = await channel.delete();
    destroy
    Alert.alert("Xoá thành công")
    navigation.navigate("Root")
}

function Delete()
{
    
    Alert.alert(
        "Thông Báo",
        "Bạn có chắc là bạn muốn xoá kênh?",
        [
          {
            text: "Không",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Có", onPress: () => {DeleteQuery()}}
        ]
      );
}



const route = useRoute();
const channel = route.params.channel;
        return (
       <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{  alignItems: "center" ,flexDirection:'row',justifyContent:'center'}}>
               <TouchableOpacity style={{marginRight:40}}>
                    <View style={styles.secondaryButton}>
                        <Feather onPress={()=>setVisible(!isVisible)} name="edit" size={24} color="#FFF" />
                        <Modal animationType="slide"
                            transparent={true}
                            visible={isVisible}
                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}>
                          <View style={{ backgroundColor: "#151515", height: 240, width: 350, alignSelf: 'center', marginTop: 50, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', marginLeft: 10 }}>NAME:</Text>
                                <View style={{ backgroundColor: 'gray', height: 45, justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 10, marginRight: 10, borderRadius: 10 }}>
                                    <TextInput onChangeText={text => setName(text)} placeholder={channel.data.name} style={{ color: 'white', fontSize: 19 }}></TextInput>
                                </View>

                                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', marginLeft: 10 }}>IMAGE:</Text>
                                <View style={{ backgroundColor: 'gray', height: 45, justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 10, marginRight: 10, borderRadius: 10 }}>
                                    <TextInput onChangeText={text => setImage(text)} placeholder={channel.data.image} style={{ color: 'white', fontSize: 19 }}></TextInput>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginLeft:20}} onPress={()=>setVisible(!isVisible)}>
                                    <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>HUỶ</Text>
                                </TouchableOpacity>
                                <View style={{flex:60}}></View>
                                <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginRight:20}} onPress={Update}>
                                    <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>CẬP NHẬT</Text>
                                </TouchableOpacity>
                                </View>
                               
                                
                            </View>
                            </KeyboardAvoidingView>
                         
                            
                        </Modal>
                    </View>
                    </TouchableOpacity>





           <TouchableOpacity onPress={()=>navigation.navigate("InviteMembers", { channel })}>
                    <View style={styles.secondaryButton}>
                        <Feather name="plus" size={24} color="#FFF" />
                    </View>
                    </TouchableOpacity>
               <TouchableOpacity style={{marginLeft:40}} onPress={Delete}>
                    <View style={styles.secondaryButton}>
                        <Feather name="trash" size={24} color="#FFF" />
                    </View>
              </TouchableOpacity>
                
            </View>
            </KeyboardAvoidingView>
        );
    }


const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: Colors.light.tint,
        marginTop: -60,
        shadowColor: "#7F58FF",
        shadowRadius: 5,
        shadowOffset: { height: 10 },
        shadowOpacity: 0.3,
        borderWidth: 3,
        borderColor: "#FFFFFF"
    },
    secondaryButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.light.tint,
    }
});
export default FloatingButton1