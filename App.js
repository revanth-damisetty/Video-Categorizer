import { createContext, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import CameraScreen from './CameraScreen';
import VideoScreen from './VideoScreen';
import LoginScreen from './LoginScreen';
import CategoryPage from './CategoryPage';
import { getMetadata, listAll, ref } from 'firebase/storage';
import { storage } from './firebaseconfig';
import VideoCustomPlay from './VideoCustomPlay';
import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['Require cycle:']);
export const AppContext=createContext()
const stack=createStackNavigator()
export default function App() {

  const [recodrUri,setRecordUri]=useState(null);
  const [admin,setAdmin]=useState(false) 
  const [loggedIn,setLoggedIn]=useState(false)
  const [customideo,setCustomVideo]=useState(null)


  

  
 return (
  <AppContext.Provider value={{
    recodrUri:recodrUri,
    setRecordUri:setRecordUri,
    admin:admin,
    setAdmin:setAdmin,
    loggedIn:loggedIn,
    setLoggedIn:setLoggedIn,
    setCustomVideo:setCustomVideo,
    customideo:customideo
    

  }}>
    <NavigationContainer>

      <stack.Navigator>

        <stack.Screen name='login' component={LoginScreen} options={{
          headerShown:false
        }}></stack.Screen>

       
        <stack.Screen name='home' component={HomeScreen} options={{
          headerShown:false
        }}></stack.Screen>
        <stack.Screen name='categoryPage' component={CategoryPage} options={{
          headerShown:false
        }}></stack.Screen>
        <stack.Screen name='cameraScreen' component={CameraScreen} options={{
          headerShown:false
        }}></stack.Screen>
        <stack.Screen name='videoScreen' component={VideoScreen} options={{
          headerShown:false
        }} ></stack.Screen>
        <stack.Screen name='customVideo' component={VideoCustomPlay} options={
          {
            headerTitle:"Video Player"
          }
        } ></stack.Screen>
        
      </stack.Navigator>
    </NavigationContainer>
  </AppContext.Provider>
 )
}

const styles = StyleSheet.create({
  
});
