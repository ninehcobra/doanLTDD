import { ConsoleLogger } from '@aws-amplify/core';
import React, { useEffect, useState } from 'react'
import { View,Text, TouchableOpacity,AppRegistry,Image, Alert, Modal, KeyboardAvoidingView, TextInput } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { useChatContext } from 'stream-chat-expo';
import { useAuthContext } from '../contexts/AuthContext';
import { AsyncStorage } from 'react-native';
import { Auth } from 'aws-amplify';


export default function info()
{
  const [imageLink,setImagelink]=useState("")
  const logout = () => {
    Auth.signOut();
    client.disconnectUser();
  };
   const[user,setUser]=useState([]);
   const { client } = useChatContext();
const { userId } = useAuthContext();
 const idchange=user.map((m)=>m.id).toString();

const updates = [{
    id: idchange,
    set: {
        image:imageLink,
    }

}];

const [isVisible,setVisible]=useState(false)



var imagesarray = user.map((m)=>m.image)



let linkpic={uri: imagesarray.toString()}


useEffect( () => {
     getInfo();
  }, [])


  
const getInfo = async()=>{
    const response = await client.queryUsers({ id: userId });
     setUser(response.users)
  
}
const changeImage=async()=>
{  
  if(imageLink=="")
  {
    Alert.alert("Cập nhật ảnh thất bại")
   setVisible(!isVisible)
  }
  else{
    const response = await client.partialUpdateUsers(updates);
    console.log(response);
    Alert.alert("Đổi ảnh thành công!! Cần đăng nhập lại để cập nhật <3")
    logout()
    
  }
  
    
    
  
}


    return(
        <View style={{flex:1}}>
        <View style={{flex:10,backgroundColor:'#151515',justifyContent:'center',alignItems:'center'}}>
             <Text style={{color:'white',fontSize:25,fontWeight:'bold',marginTop:20}}>Thông tin tài khoản</Text>
        </View>
        <View style={{flex:90}}>  
             <View  style={{flex:30,justifyContent:'center',alignItems:'center'}}>
                <Image source={linkpic} style={{width:140,height:140,borderRadius:70}}>

                </Image>
                <TouchableOpacity onPress={()=>setVisible(!isVisible)} style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                 <Image source={require("../image/edit.png")} style={{width:25,height:25,tintColor:'white'}}></Image>
                <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Sửa ảnh</Text>
                </TouchableOpacity>
                <Modal animationType="slide"
                            transparent={true}
                            visible={isVisible}
                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}>
                          <View style={{ backgroundColor: "#151515", height: 140, width: 350, alignSelf: 'center', marginTop: 50, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', marginLeft: 10 }}>Image Link:</Text>
                                <View style={{ backgroundColor: 'gray', height: 45, justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 10, marginRight: 10, borderRadius: 10 }}>
                                    <TextInput onChangeText={text => setImagelink(text)} placeholder={user.map((m)=>m.image).toString()} style={{ color: 'white', fontSize: 19 }}></TextInput>
                                </View>

                                <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginLeft:20}} onPress={()=>setVisible(!isVisible)}>
                                    <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>HUỶ</Text>
                                </TouchableOpacity>
                                <View style={{flex:60}}></View>
                                <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginRight:20}} onPress={changeImage}>
                                    <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>CẬP NHẬT</Text>
                                </TouchableOpacity>
                                </View>
                               
                                
                            </View>
                            </KeyboardAvoidingView>
                         
                            
                        </Modal>
                
             </View>
             <View style={{flex:70}}>
                <Text  style={{color:'white',fontSize:25,fontWeight:'bold',marginLeft:10}}>ID:</Text>
                <View style={{backgroundColor:'gray',height:45,justifyContent:'center',alignItems:'center',marginBottom:10,marginLeft:10,marginRight:10,borderRadius:10}}>  
                <Text style={{color:'white',fontSize:19}}>{user.map((m)=>m.id)}</Text>
                </View>
               

                <Text style={{color:'white',fontSize:25,fontWeight:'bold',marginLeft:10}}>Tên:</Text>
                <View style={{backgroundColor:'gray',height:45,justifyContent:'center',alignItems:'center',marginBottom:10,marginLeft:10,marginRight:10,borderRadius:10}}>  
                <Text style={{color:'white',fontSize:19}}>{user.map((m)=>m.name)}</Text>
                </View>
                

                <Text style={{color:'white',fontSize:25,fontWeight:'bold',marginLeft:10}}>Ngày tạo:</Text>
                
                <View style={{backgroundColor:'gray',height:45,justifyContent:'center',alignItems:'center',marginBottom:10,marginLeft:10,marginRight:10,borderRadius:10}}>  
                <Text style={{color:'white',fontSize:19}}>{user.map((m)=>m.created_at)}</Text>
                </View>

                <Text style={{color:'white',fontSize:25,fontWeight:'bold',marginLeft:10}}>Lần cuối cùng đăng nhập:</Text>
               
                <View style={{backgroundColor:'gray',height:45,justifyContent:'center',alignItems:'center',marginBottom:10,marginLeft:10,marginRight:10,borderRadius:10}}>  
                <Text style={{color:'white',fontSize:19}}>{user.map((m)=>m.last_active)}</Text>
                </View>

             </View>
            
            
             
           
           
           
        </View>
           

        </View>
    )
}