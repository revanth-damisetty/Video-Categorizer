import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { View,StyleSheet,Button, Text,ToastAndroid } from 'react-native'
import { AppContext } from './App'
import { storage } from './firebaseconfig'
import { ref, uploadBytes } from 'firebase/storage'

const HomeScreen = () => {
  const navigation=useNavigation()
  const {recodrUri,setRecordUri}=useContext(AppContext)
  const [blob,setBlob]=useState(null)

  useEffect(()=>{
        if(recodrUri!==null && !blob  ){
            convertToBlob()
        }
  },[recodrUri])

  const convertToBlob=async ()=>{
    try{
        console.log('in blob conversion')
            const bolb=await fetch(recodrUri)
            console.log('recorduri is ',recodrUri)
            console.log('blob is ', JSON.stringify(bolb))
    }catch(e){
        console.log('e is ',e)
    }
    
  }

  const uploadToFirebase=async ()=>{
    try{    
        console.log('uplaoding')
        const storageRef = ref(storage, 'firstfile');

       const snap=await  uploadBytes(storageRef, blob)
       ToastAndroid.show("Uploaded sucessfully ",ToastAndroid.SHORT)
       console.log('uploaded sucessfully ')
       setRecordUri(null)
      
    }catch(e){
        console.log(e)
    }

  }

  return (
    <View style={styles.main}>
        <Button title='Record Video'  onPress={()=>navigation.navigate('cameraScreen')}></Button>
        {
            recodrUri ? 
            <>
            <Button title='preview Video' onPress={()=>navigation.navigate('videoScreen')}></Button>
            <Button title='upload'onPress={uploadToFirebase}></Button>
            </>
            :<></>
        }
      
       
    </View>
  )
}

export default HomeScreen


const styles=StyleSheet.create({
    main:{
      // backgroundColor:'red',
      flex:1,
      justifyContent:'center',
      gap:10
    }
})