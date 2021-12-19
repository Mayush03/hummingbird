import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';
import { DMSerifText_400Regular } from '@expo-google-fonts/dm-serif-text';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function RecorderScreen() {

  // const email = route.params;
  // const emailobj = route.params.email;
  const navigation = useNavigation();
  const [story, setStory] = useState([]);

  //Getting all the methods of Camera using ref...
  const camera = useRef(null);

  const [values, setValues] = useState({
      hasPermission:[],
      CameraType: Camera.Constants.Type.back,
      isFlashLightOn: Camera.Constants.FlashMode.off,
      videoStatus:0
  });

  const {hasPermission, CameraType, isFlashLightOn, videoStatus} = values;

  useEffect(() => {
    getPermissions();
  },[]);

  const getPermissions = async () => {
    try{
      const {status} = await Camera.requestCameraPermissionsAsync();
      const AudioStatus = await Audio.requestPermissionsAsync();
      setValues({...values, hasPermission:[status, AudioStatus.status]})
    }catch(err){
      console.log(err);
    }
  };


  //Funtion to start video recording..
  const videoRecord = async () => {

    if(!videoStatus && camera.current){

      setValues({...values, videoStatus:1, isFlashLightOn:isFlashLightOn ? Camera.Constants.FlashMode.torch : isFlashLightOn});

      await camera.current.recordAsync({maxDuration: 180}).then(
        (data)=> {
        console.log(data)
        //  navigation.goBack({video: data.uri});
         navigation.navigate("Step9", {
           video: data.uri,
         })
        }).catch(
          (err)=> console.log(err)
          );
    }
    else{
      try{
        await camera.current.stopRecording();
        setValues({...values, videoStatus:0, isFlashLightOn: Camera.Constants.FlashMode.off});
      }catch(err){
         console.log(err);
      }
    }

  }

  useEffect(() =>{
    const getAllStories = async () => {
       try {
        //Saving cookies...
        const tokenData = await AsyncStorage.getItem('cookie')
        const response = await axios(`http://192.168.1.10/hummingbird/allStories.php`);
        setStory(response.data);
        console.log("RecorderScreen response data: ")
        console.log(response.data)
       }catch(err){
         
       console.log("RecorderScreen Err: " + err);
       }
    };
    getAllStories()
    },[]);

    let [fontsLoaded] = useFonts({ SourceSansPro_400Regular, DMSerifText_400Regular });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <SafeAreaView style={styles.container}>
       <StatusBar style={styles.statusBar} backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.mainContainer}>
    <View style={styles.cameraContainer}>   
        <Camera style={styles.camera} type={CameraType} ref={camera} flashMode={isFlashLightOn}>
         <View style={styles.icons}>
           <TouchableWithoutFeedback onPress={()=> {
             if(!videoStatus){
               setValues({...values, isFlashLightOn:isFlashLightOn ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.on})
             }
           }}>
           <MaterialCommunityIcons name={isFlashLightOn ? "flash-off" : "flash"} size={50} color="white" />
           </TouchableWithoutFeedback>

           <TouchableWithoutFeedback onPress={()=> videoRecord()}>
           <MaterialCommunityIcons name={videoStatus ? "stop" : "record"} size={50} color="red" />
           </TouchableWithoutFeedback>

           <TouchableWithoutFeedback onPress={()=> {
             if(!videoStatus){
               setValues({...values, CameraType:CameraType ? Camera.Constants.Type.back : Camera.Constants.Type.front})
             }
           }}>
           <MaterialCommunityIcons name={CameraType ? "camera-rear" : "camera-front"} size={50} color="white" />
           </TouchableWithoutFeedback>
         </View>
        </Camera>
    </View> 
      </View>
    </SafeAreaView>
  );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
  },
  statusBar: {
    height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  },
  mainContainer: {
    flex: 1,
    width: 100,
    height: 100,
    minWidth: '100%',
    minHeight: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    backgroundColor: colors.white
  },
  cameraContainer: {
      flex:1,
  },
  camera: {
      flex: 1,
  },
  icons: {
      position: "absolute",
      bottom: 5,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      padding: 5
  }


});

export default RecorderScreen;