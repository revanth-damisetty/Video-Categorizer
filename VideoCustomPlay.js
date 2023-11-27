import React, { useContext, useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import { Video } from 'expo-av';
import { AppContext } from './App';
import { getBlob, getBytes, getDownloadURL, ref } from 'firebase/storage';
import { storage } from './firebaseconfig';
import * as FileSystem from 'expo-file-system'
import { WebView } from 'react-native-webview';

const VideoCustomPlay = () => {
    const [status, setStatus] = React.useState({});
    const {customideo} =useContext(AppContext)
    const video = React.useRef(null);
    const [recordUri,setRecordUri]=useState(null)
    useEffect(()=>{
            getDownloadURL(ref(storage,`videos/${customideo}`)).then((res)=>{
                console.log('res is ',res)
                setRecordUri(res)
                // Download(res)
            }).catch((e)=>[console.log(e)])
    },[])

    const Download = async (uriV) => {
        console.log('data in download ')
       try{
        const downloadResumable = FileSystem.createDownloadResumable(
            uriV,
            FileSystem.documentDirectory + "video.mp4"
          );
        
          const { uri } = await downloadResumable.downloadAsync();
          console.log('Finished downloading to ', uri);
       }catch(e){
            console.log('err ',e)
       }
      }
  if(!video){
    return <View style={{flex:1,justifyContent:'center'}}>
        <ActivityIndicator color={'blue'} size={40}></ActivityIndicator>
    </View>
  }
  if(recordUri===undefined || recordUri===null ){
    return (
        <View style={{flex:1,justifyContent:'center'}}>
            <ActivityIndicator size={40} color={'blue'}></ActivityIndicator>
        </View>
    )
  }
  return (
    <View style={styles.container}>
    <WebView
        source={{ uri: recordUri }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
   
    </View>
  )
}

export default VideoCustomPlay

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
      },
      video: {
        alignSelf: 'center',
        width: '100%',
        height: '90%',
      },
      buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
})