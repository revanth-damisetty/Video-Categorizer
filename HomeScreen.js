import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { View,StyleSheet,Button, Text,ToastAndroid, TextInput, ActivityIndicator } from 'react-native'
import { AppContext } from './App'
import { storage } from './firebaseconfig'
import { ref, uploadBytes } from 'firebase/storage'

const HomeScreen = () => {
  const navigation=useNavigation()
  const {recodrUri,setRecordUri,admin,loggedIn,setLoggedIn,setAdmin}=useContext(AppContext)
  const [blob,setBlob]=useState(null)
  const [category, setCategory] = React.useState('');
  const [fileName,setFileName]=useState('')
  const isFocused=useIsFocused()
  const [loading,setLoading]=useState(false)
  const [desc,setDesc]=useState('')

  // useEffect(()=>{})
  useEffect(()=>{
    console.log('called homescreen useEffect')
    if(isFocused===true){
      if(admin===false){
        navigation.navigate('categoryPage')
      }
      if(loggedIn===false){
        navigation.navigate('login')
      }
    }
    

},[isFocused])

  useEffect(()=>{
        if(recodrUri!==null && !blob  ){
            convertToBlob()
        }
  },[recodrUri])

  const convertToBlob=async ()=>{
    try{
        console.log('in blob conversion')
            const result=await fetch(recodrUri)
            const blob=await result.blob()
            console.log('blob is ', JSON.stringify(blob))
            setBlob(blob)
          
    }catch(e){
        console.log('e is ',e)
    }
    
  }

  const uploadToFirebase=async ()=>{
    if(fileName.length<6 || category.length<6){
      ToastAndroid.show('min length is 8 chars',ToastAndroid.SHORT)
      return
    }

    if(desc.length>6 && desc.length<15){
      ToastAndroid.show('description should be less than 15 chars',ToastAndroid.SHORT)
      return
    }

    if(fileName.includes('-') || category.includes('-') || desc.includes('-')){
      ToastAndroid.show("name should not contain char '-'",ToastAndroid.SHORT)
      return
    }
    
    try{    
      setLoading(true)
        console.log('uplaoding')
        const storageRef = ref(storage, `videos/${category.trim()}-${fileName.trim()}-${desc.trim()}`);      // blob.put({})
       const snap=await  uploadBytes(storageRef, blob,{'contentType':'video/mp4'})
       ToastAndroid.show("Uploaded sucessfully ",ToastAndroid.SHORT)
       console.log('uploaded sucessfully ')
       setRecordUri(null)
       setFileName('')
       setCategory('')
       navigation.navigate('categoryPage')
       setLoading(false)
      
    }catch(e){
        console.log(e)
    }

  }

  if(loading===true){
    return (
      <View style={{flex:1,justifyContent:'center'}}>
          <ActivityIndicator color={'blue'} size={40}></ActivityIndicator>
      </View>
    )
  }

  return (
    <View style={styles.main}>
        <Button title='Record Video'  onPress={()=>navigation.navigate('cameraScreen')}></Button>
        {
            recodrUri ? 
            <>
            <Button title='preview Video' onPress={()=>navigation.navigate('videoScreen')}></Button>
            <TextInput placeholder='Category Name' value={category} style={styles.input} onChangeText={setCategory}></TextInput>
            <TextInput placeholder='File Name'  value={fileName} style={styles.input} onChangeText={setFileName}></TextInput>
            <TextInput placeholder='Description'  value={desc} style={styles.input} onChangeText={setDesc}></TextInput>
            <Button title='upload'onPress={uploadToFirebase}></Button>
            
           
            </>
            :<></>
        }
         <Button title='categories' onPress={()=>{
              navigation.navigate('categoryPage')
            }}></Button>
             <View style={{position:'absolute',bottom:10,left:0,width:'100%'}}>
           
           <Button title='Logout' color={'red'} onPress={()=>{
                 setLoggedIn(false)
                 navigation.navigate('login')
                 setAdmin(false)
               }}></Button>
           </View>
      
       
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
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
})