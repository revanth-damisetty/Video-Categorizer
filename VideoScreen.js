import React, { useContext, useEffect } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { Video } from 'expo-av';
import { AppContext } from './App';

const VideoScreen = () => {
    const [status, setStatus] = React.useState({});
    const {recodrUri} =useContext(AppContext)
    const video = React.useRef(null);
    useEffect(()=>{
            console.log('recordUri is ',recodrUri)
    },[])
  if(!video){
    return <View>
        <Text>loading</Text>
    </View>
  }
  return (
    <View style={styles.container}>
    <Video
      ref={video}
      style={styles.video}
      source={{
        uri: recodrUri,
      }}
      useNativeControls
      resizeMode="contain"
      isLooping
      onPlaybackStatusUpdate={status => setStatus(() => status)}
    />
    <Button
        title={status.isPlaying ? 'Pause' : 'Play'}
        onPress={() =>
          status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
        }
      />
    </View>
  )
}

export default VideoScreen

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