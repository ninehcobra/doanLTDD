import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableHighlight, Animated, Modal, Text, KeyboardAvoidingView, TouchableOpacity ,Image} from "react-native";

import { FontAwesome5, Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import info from "../screens/Info"
import b from "./GetChannel";
import { useChatContext } from "stream-chat-expo";
import { useAuthContext } from "../contexts/AuthContext";


function getInfo()
{

    const { client } = useChatContext();
    const { userId } = useAuthContext();
    const[user,setUser]=useState([]);
    useEffect( () => {
        getInfo();
     }, [])
   
   
     
   const getInfo = async()=>{
       const response = await client.queryUsers({ id: userId });
        setUser(response.users)
     
   }
   return(user.toString())

}
class FloatingButton extends React.Component {
    mode = new Animated.Value(0);
    buttonSize = new Animated.Value(1);
     

    handlePress = () => {
        Animated.sequence([
            Animated.timing(this.buttonSize, {
                toValue: 0.95,
                duration: 10
            }),
            Animated.timing(this.buttonSize, {
                toValue: 1
            }),
            Animated.timing(this.mode, {
                toValue: this.mode._value === 0 ? 1 : 0
            })
        ]).start();
    };

    state = {
        openModal: false
    }
    onClickButton = e => {
        e.preventDefault()
        this.setState({ openModal: true })
    }
    onCloseModal = () => {
        this.setState({ openModal: false })
    }
    render() {
        const thermometerX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, -100]
        });

        const thermometerY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -100]
        });

        const timeX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, -24]
        });

        const timeY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -150]
        });

        const pulseX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, 50]
        });

        const pulseY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -100]
        });

        const rotation = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "45deg"]
        });

        const sizeStyle = {
            transform: [{ scale: this.buttonSize }]
        };


        return (
       <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{ position: "absolute", alignItems: "center" }}>
                <Animated.View style={{ position: "absolute", left: thermometerX, top: thermometerY }}>
                    <View style={styles.secondaryButton}>
                        <Feather onPress={this.onClickButton} name="edit" size={24} color="#FFF" />
                        <Modal animationType="slide"
                            transparent={true}
                            visible={this.state.openModal}
                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}>
                          <View style={{ backgroundColor: "#151515", height: 240, width: 350, alignSelf: 'center', marginTop: 50, justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', marginLeft: 10 }}>NAME:</Text>
                                <View style={{ backgroundColor: 'gray', height: 45, justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 10, marginRight: 10, borderRadius: 10 }}>
                                    <TextInput style={{ color: 'white', fontSize: 19 }}></TextInput>
                                </View>

                                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', marginLeft: 10 }}>IMAGE:</Text>
                                <View style={{ backgroundColor: 'gray', height: 45, justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginLeft: 10, marginRight: 10, borderRadius: 10 }}>
                                    <TextInput style={{ color: 'white', fontSize: 19 }}></TextInput>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginLeft:20}} onPress={this.onCloseModal}>
                                    <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>HUỶ</Text>
                                </TouchableOpacity>
                                <View style={{flex:60}}></View>
                                <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginRight:20}} onPress={()=>console.log(getInfo)}>
                                    <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>CẬP NHẬT</Text>
                                </TouchableOpacity>
                                </View>
                               
                                
                            </View>
                            </KeyboardAvoidingView>
                         
                            
                        </Modal>
                    </View>
                </Animated.View>





                <Animated.View style={{ position: "absolute", left: timeX, top: timeY }}>
                    <View style={styles.secondaryButton}>
                        <Feather name="plus" size={24} color="#FFF" />
                    </View>
                </Animated.View>
                <Animated.View style={{ position: "absolute", left: pulseX, top: pulseY }}>
                    <View style={styles.secondaryButton}>
                        <Feather name="trash" size={24} color="#FFF" />
                    </View>
                </Animated.View>
                <Animated.View style={[styles.button, sizeStyle]}>
                    <TouchableHighlight onPress={this.handlePress} underlayColor="#7F58FF">
                        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                            <FontAwesome5 name="wrench" size={24} color="#FFF" />
                        </Animated.View>
                    </TouchableHighlight>
                </Animated.View>
            </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: Colors.light.tint,
        position: "absolute",
        marginTop: -60,
        shadowColor: "#7F58FF",
        shadowRadius: 5,
        shadowOffset: { height: 10 },
        shadowOpacity: 0.3,
        borderWidth: 3,
        borderColor: "#FFFFFF"
    },
    secondaryButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.light.tint,
    }
});
export default FloatingButton