import { Camera ,CameraType} from 'expo-camera';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View,ToastAndroid } from 'react-native'
import { AppContext } from './App';
import { useNavigation } from '@react-navigation/native';
// import { AppContext } from './App';


const CameraScreen = () => {
    const [microPhonePermission, setmicroPhonePermission] = Camera.useMicrophonePermissions();
    const [cameraPermission,setCameraPermission]=Camera.useCameraPermissions()
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [camera, setCamera] = useState(null);
    const {recodrUri,setRecordUri}=useContext(AppContext)
    const [recording,setRecording]=useState(false)


    const navigation=useNavigation()

    
  


    const stopVideo = async () => {
        console.log('in stopped ')
        camera.stopRecording();
        setRecording(false)
        // setNavi(true)
        navigation.navigate('home')
        ToastAndroid.show('Stopped  Recording ',ToastAndroid.SHORT)
      }
      

      const takeVideo = async () => {
        console.log('yess ')
        if(camera){
            console.log('is executing ')
            try{
                setRecording(true)
                ToastAndroid.show('Started  Recording ',ToastAndroid.SHORT)
                const data = await camera.recordAsync();
                
                
                setRecordUri(data.uri)
            } catch(e){
                console.error(e);
            }
        }
    } 

    if (!cameraPermission?.granted) {
        // Camera permissions are not granted yet
        return (
          <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>We need your camera permission to show the camera</Text>
            <Button onPress={setCameraPermission} title="grant permission" />
            
          </View>
        );
    }
    if (!microPhonePermission?.granted) {
        // Camera permissions are not granted yet
        return (
          <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>We need your permission for microphone</Text>
            <Button onPress={setmicroPhonePermission} title="grant permission" />
          </View>
        );
      }

      function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }


    return (
    <View>

    <Camera style={styles.camera} ref={ref => setCamera(ref)} type={type}>
    

    </Camera>
    <View style={styles.buttons}>
            {recording===true? <Button title='stop record' onPress={()=>stopVideo()}></Button>:<></>}
            <Button title="Flip Camera" onPress={toggleCameraType} />
            {recording===true?<></>:<Button title='start recoring' onPress={takeVideo}></Button>}
       </View>

    </View>
    )
}

export default CameraScreen

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
      },
      camera: {
        height:'95%',
        width:'100%',
        // flex:1 
        // flexBasis:'90%'
      },
      buttons:{
            display:'flex',
            flexDirection:'row',
            gap:10,
            justifyContent:'center',
            // backgroundColor:'red',
            

      }
})

