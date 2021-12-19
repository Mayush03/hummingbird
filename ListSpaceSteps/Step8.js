import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, StatusBar, Platform, TouchableWithoutFeedback, Button } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';
import { DMSerifText_400Regular } from '@expo-google-fonts/dm-serif-text';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';

function Step8({route}) {

  // const email = route.params;
  // const emailobj = route.params.email;
  const navigation = useNavigation();

  const [story, setStory] = useState([]);

  const videoUrl = route?.params?.video;
  console.log("Step8 screen video url: " + videoUrl);

  useEffect(() =>{
    const getAllStories = async () => {
       try {
        //Saving cookies...
        const tokenData = await AsyncStorage.getItem('cookie')
        const response = await axios(`http://192.168.1.10/hummingbird/allStories.php`);
        setStory(response.data);
        console.log("Step8 screen response data: ")
        console.log(response.data)
       }catch(err){
       console.log("Step8 Err: " + err);
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
        
        <View style={styles.SelectDropdownContainer}>
          <TouchableWithoutFeedback onPress={()=> navigation.navigate("Recorder")}> 
            <Text>Record a short video of your space</Text>
          </TouchableWithoutFeedback>
          
          {videoUrl && (<Video
           style={{width: "100%", height: "85%", borderRadius: 5}}
           rate={1.8}
           shouldPlay
           source={{ uri: videoUrl}}
           useNativeControls
           resizeMode="cover"
           isLooping
          />)}

      
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
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    minHeight: '100%',
  },
  screenNameHeader: {
    marginTop: "3%",
    paddingLeft: 20,
    fontFamily: "SourceSansPro_400Regular", 
    fontSize:15,
    fontWeight: "normal",
    color: colors.transparent,
    maxWidth: "95%",
    marginBottom: "4%",
    textAlign: "left"
  },
  screenName:{
    paddingLeft: 20,
    fontFamily: "SourceSansPro_400Regular", 
    fontSize:16,
    fontWeight: "bold",
    marginTop: "5%"
  },
  screenNameMeta:{
    marginTop: "0%",
    paddingLeft: 20,
    fontFamily: "SourceSansPro_400Regular", 
    fontSize:14,
    fontWeight: "normal",
    color: colors.grayblack,
    maxWidth: "90%"
  },
  SelectDropdownContainer: {
    padding: 20,
    width: "100%",
   },
  camera: {
    width: "100%",
    height: 400
  },
  videoStyle: {
    width: 300,
    height: 400,
    flex: 1,
    marginBottom: 5
  },
 
});

export default Step8;