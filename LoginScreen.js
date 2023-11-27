import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import { AppContext } from './App'
import { useIsFocused, useNavigation } from '@react-navigation/native'

const LoginScreen = () => {

    const [username,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const {setAdmin,setLoggedIn,loggedIn}=useContext(AppContext)
    const navigation=useNavigation()

    const isFocused=useIsFocused()
    useLayoutEffect(()=>{ 
        if(isFocused===true){
          console.log('value   ')
            if(loggedIn===true){
              console.log(' logged in ')
              navigation.navigate('home')
            }
        }
    },[isFocused])

  
    const loginHandler=async ()=>{
            console.log('login handler')
            if(username.length===0){
                ToastAndroid.show('Username length should be > 6 chars',ToastAndroid.SHORT)
                return
            }
            if(password.length===0){
                ToastAndroid.show('Password length should be > 6 chars',ToastAndroid.SHORT)
                return
            }
            if(username==='adminUser'&&password=='adminPassword'){
                    setAdmin(true)
            }
            setLoggedIn(true)
            navigation.navigate('home')
            setPassword('')
            setUserName('')
            


    }
  return (
    <View style={styles.main}>
        <Text style={styles.header}>Login</Text>
        <TextInput value={username} onChangeText={setUserName} placeholder='username' style={styles.input}></TextInput>
        <TextInput secureTextEntry={true} value={password} onChangeText={setPassword} placeholder='password' style={styles.input}></TextInput>
        <Button title='Login' onPress={loginHandler}></Button>
    </View>
  )
}

export default LoginScreen

const styles=StyleSheet.create({
    main:{
      // backgroundColor:'red',
      flex:1,
      justifyContent:'center',

      padding:20,
      gap:20
      
    },
    input: {
      height: 40,

      borderWidth: 1,
      padding: 10,
    },
    header:{
            fontSize:25,
            textAlign:'center',
            marginBottom:40
    }
})