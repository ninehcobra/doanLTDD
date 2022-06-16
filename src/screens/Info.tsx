import { ConsoleLogger } from '@aws-amplify/core';
import React, { useEffect, useState } from 'react'
import { View,Text, TouchableOpacity,AppRegistry,Image, Alert } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { useChatContext } from 'stream-chat-expo';
import { useAuthContext } from '../contexts/AuthContext';



export default function info()
{
   const[user,setUser]=useState([]);
   const { client } = useChatContext();
const { userId } = useAuthContext();
 const idchange=user.map((m)=>m.id).toString();

const updates = [{
    id: idchange,
    set: {
        image:"getwallpapers.com/wallpaper/full/d/4/4/812304-cool-yasuo-wallpapers-3840x2160-iphone.jpg"
    }

}];





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
    const response = await client.partialUpdateUsers(updates);
    console.log(response)
    
  
}


    return(
        <View style={{flex:1}}>
        <View style={{flex:10,backgroundColor:'#151515',justifyContent:'center',alignItems:'center'}}>
             <Text style={{color:'white',fontSize:25,fontWeight:'bold',marginTop:20}}>Thông tin tài khoản</Text>
        </View>
        <View style={{flex:90}}>  
             <View  style={{flex:30,justifyContent:'center',alignItems:'center'}}>
                <Image source={linkpic} style={{width:140,height:140}}>

                </Image>
                <TouchableOpacity onPress={changeImage} style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                 <Image source={require("../image/edit.png")} style={{width:25,height:25,tintColor:'white'}}></Image>
                <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Sửa ảnh</Text>
                </TouchableOpacity>
                
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