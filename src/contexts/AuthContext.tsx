import { Auth, API, graphqlOperation } from "aws-amplify";
import { createContext, useState, useContext, useEffect } from "react";
import { getStreamToken } from "../graphql/queries";
import { Alert } from "react-native";
import { StreamChat } from "stream-chat";
import { AsyncStorage } from 'react-native';
import linking from "../navigation/LinkingConfiguration";
import { getLastReceivedMessage, useChatContext, useCreateInputMessageInputContext } from "stream-chat-expo";
const AuthContext = createContext({
  userId: null,
  setUserId: (newId: string) => {},
});


const AuthContextComponent = ({ children, client }) => {
  const [userId, setUserId] = useState(null);
  const [imagelink,setimagelink]=useState("http://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png")
  const [userimage,setuserimage]=useState([])
 




  const getimagelink = async () => {
    connectStreamChatUser()
   
    const userData = await Auth.currentAuthenticatedUser();
     const { sub, email } =await userData.attributes;
  
    const response = await client.queryUsers({ id: sub});
     setuserimage(response.users);
     const piclinkkk=userimage.map((m)=>m.image).toString()
     if(piclinkkk!="")
             {
              setimagelink(piclinkkk)
             }
  
  };
  
  const connectStreamChatUser = async () => {
    
    const userData = await Auth.currentAuthenticatedUser();
    const { sub, email } = userData.attributes;
   
  
   
    

    const tokenResponse = await API.graphql(graphqlOperation(getStreamToken));
    const token = tokenResponse?.data?.getStreamToken;
    if (!token) {
      Alert.alert("Failed to fetch the token");
      return;
    }

    await client.connectUser(
      {
        id: sub,
        name: email,
        image: imagelink,
      },
      token
    );

    
    setUserId(sub);
  };


 





 
  useEffect(async() => {
     getimagelink();
    await connectStreamChatUser();
    
    
  }, []);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextComponent;

export const useAuthContext = () => useContext(AuthContext);
