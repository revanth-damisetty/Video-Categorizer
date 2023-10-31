import { createContext, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import CameraScreen from './CameraScreen';
import VideoScreen from './VideoScreen';


export const AppContext=createContext()
const stack=createStackNavigator()
export default function App() {

  const [recodrUri,setRecordUri]=useState(null);
  
 return (
  <AppContext.Provider value={{
    recodrUri:recodrUri,
    setRecordUri:setRecordUri

  }}>
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name='home' component={HomeScreen}></stack.Screen>
        <stack.Screen name='cameraScreen' component={CameraScreen} options={{
          headerShown:false
        }}></stack.Screen>
        <stack.Screen name='videoScreen' component={VideoScreen} ></stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  </AppContext.Provider>
 )
}

const styles = StyleSheet.create({
  
});
