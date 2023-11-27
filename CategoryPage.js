import React, { useContext, useEffect, useState } from 'react'
import { Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View ,ActivityIndicator, ToastAndroid} from 'react-native'
import { AppContext } from './App'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Dropdown } from 'react-native-element-dropdown';
import { deleteObject, listAll, ref } from 'firebase/storage';
import { storage } from './firebaseconfig';

const CategoryPage = () => {
    const {admin,setCustomVideo,loggedIn,setLoggedIn,setAdmin}=useContext(AppContext)
    const navigation=useNavigation()
    const [allData,setAllData]=useState([])
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [videos,setVideos]=useState({})
    const [categoryValues,setCategoryValues]=useState([])
    const isFocused = useIsFocused();
    const [refresh,setRefresh]=useState(false)


    useEffect(()=>{
        console.log("here came ",isFocused)
    
        
           if(isFocused===true){
            
            console.log('isfocued ',isFocused)
            firbaseStorage()
           }
        
      },[isFocused])
      useEffect(()=>{
        console.log('videos are ',videos)
      },[videos])

      useEffect(()=>{
        console.log('$alldata is ',allData)
      },[allData])
   

      useEffect(()=>{
        console.log('in useeffect caegorypage')
        console.log('size is ', Object.values(videos))
       if( Object.values(videos).length>0 && isFocused===true){
         

             console.log('executing ',videos)
             var catData=[]
             var data=allData
             for(let i=0;i<Object.values(videos).length;i++){
              
                    
                    
                    catData.push({'label':Object.keys(videos)[i],'value':Object.keys(videos)[i]})                    
                    for(let j=0;j<Object.values(videos)[i].length;j++){

                        if(data.includes(`${Object.keys(videos)[i]}-${Object.values(videos)[i][j]}`)===false){
                            data.push(`${Object.keys(videos)[i]}-${Object.values(videos)[i][j]}`)
                        }
                    }
             }
             
           
             catData.push({'label':'All','value':'All'})
             setAllData(data)
             setCategoryValues(catData)
           
             

       }
       
    },[refresh,isFocused])
   

    
      const firbaseStorage=async ()=>{
        console.log('firbase function')
        try{
        //   setCategories([])
          setVideos({})
          const listRef = ref(storage, 'videos');
          listAll(listRef)
          .then((res) => {
            res.items.forEach((itemRef) => {
              const path=itemRef._location.path_
              const Name=path.replace('videos/','')
              const category=Name.split('-')[0]
              const fileName=Name.split('-')[1]+'-'+Name.split('-')[2]
             
                
                    // if(categories.includes(category)===false){
                        console.log('category ',category)
                        // if(categories.includes(category)===false){
                        //     setCategories(p=>{
                        //         return [...p,category]
                        //       })
                        // }
                            var final=videos;
                      if(category in final) {
                        console.log('already category present ',category)
                        if(final[category].includes(fileName)){

                        }else{

                        
                        final[category]=[...final[category],fileName]
                        }
                    
                      }else{
                        console.log('category not present ',category)
                        final[category]=[fileName]
                      }
                      setVideos(final)
                    // }
            
            });
            setRefresh(p=>!p)
          }).catch((error) => {
            console.log(error)
          });
        }catch(e){
            console.log('error in firbase function ',e)
        } 
      }

  const deleteVideo=async (uri)=>{
    console.log("in delete video ")
    const desertRef = ref(storage, `videos/${uri}`);
    deleteObject(desertRef).then(() => {
        // File deleted successfully
        console.log('sucessfully deleted ')

        const index = allData.indexOf(uri);
        allData.splice(index,1)
        firbaseStorage()
        const cat=uri.split('-')[0]
        const v=uri.split('-')[1]
        // videos[cat].indexOf(v)
        let videoData=videos
        videoData[cat].splice(videoData[cat].indexOf(v),1)
        if(videoData[cat].length===0){
            delete videoData[cat]
        }
        if(Object.keys(videoData).length===0){
            setAllData([])
            setCategoryValues([])
            
        }
        setVideos(videoData)
        ToastAndroid.show(`Delete video ${v} of category ${cat} `,ToastAndroid.SHORT)

        // setRefresh(true)
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log("errror ",error)
      });
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={{flex:1}}>
      
        {
            admin===true ? <Button title='Home' onPress={()=>navigation.navigate('home')}></Button>:<></>
        }
        
       
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          
          iconStyle={styles.iconStyle}
          data={categoryValues}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : 'choose'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            console.log('values are ',videos[item.value])
            
            if(item.value!=='All'){
                setAllData(p=>{
               
                    let d=[]
                for(let i=0;i<videos[item.value].length;i++){
                    d.push(`${item.value}-${videos[item.value][i]}`)
                }
                return d;
              
                
            })
            }else{
                setRefresh(p=>!p)
            }
            // setRefresh(p=>!p)
          }}
          />
           
        <FlatList
        data={allData}
        renderItem={({item})=><View style={styles.videoItem} o>
            <View>
            <View style={styles.flexg}>
            <Text>{item.split('-')[1]}</Text>
            <Text style={styles.smallText}>{item.split('-')[0]}</Text>
            </View>
            <Text style={styles.semiSmall}>{item.split('-')[2]}</Text>
            </View>
            <View style={styles.second}>
            <TouchableOpacity style={styles.viewButton}  onPress={()=>{
            setCustomVideo(item)
            navigation.navigate('customVideo')
            
        }}>
            <Text style={{color:'white'}}>  View</Text>
        </TouchableOpacity>
        {
            admin===true?<TouchableOpacity style={styles.deleteButton} onPress={()=>deleteVideo(item)}> 
            <Text style={{color:'white'}}>Delete</Text></TouchableOpacity>:<></>
        }
            </View>
            
        </View>}
        ></FlatList>
        <View style={{position:'absolute',bottom:10,left:0,width:'100%'}}>
        <Button title='Logout' color={'red'} onPress={()=>{
              setLoggedIn(false)
              navigation.navigate('login')
              setAdmin(false)
            }}></Button>
        </View>
         
    </View>
    </SafeAreaView>
    
  )
}

export default CategoryPage

const styles=StyleSheet.create({
    container:{
        marginTop:StatusBar.currentHeight,
        flex:1,
        padding:10
    },
    videoItem:{
            backgroundColor:'#b5f5ee',
            marginBottom:5,
            padding:15,
            borderRadius:10,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'

    },
    dropdown:{
        height:50,
        borderWidth:2,
        borderColor:'black',
        padding:10,
        marginVertical:10
        // backgroundColor:'blue'
    },
    deleteButton:{
        backgroundColor:'red',
        padding:10,
        borderRadius:10

    },
    viewButton:{
            backgroundColor:'blue',
            padding:10,
            borderRadius:10
    },
    second:{
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        
    },
    smallText:{
      fontSize:8},
flexg:{
  display:'flex',
  gap:10,
  flexDirection:'row',
  alignItems:"flex-end"
},
semiSmall:{
  fontSize:10
}

})