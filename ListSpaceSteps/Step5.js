import React, { useState, useEffect, Component} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';
import { DMSerifText_400Regular } from '@expo-google-fonts/dm-serif-text';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWindowDimensions } from 'react-native';

function Step5() {

  // const email = route.params;
  // const emailobj = route.params.email;

  const [story, setStory] = useState([]);
  const [text, onChangeText] = useState([]);
  const { height, width } = useWindowDimensions();

  useEffect(() =>{
    const getAllStories = async () => {
       try {
        //Saving cookies...
        const tokenData = await AsyncStorage.getItem('cookie')
        const response = await axios(`http://192.168.1.10/hummingbird/allStories.php`);
        setStory(response.data);
        console.log("Step1 screen response data: ")
        console.log(response.data)
       }catch(err){
       console.log("Step1 Err: " + err);
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
      <Text style={styles.screenNameHeader}>
        Mention some addition details about your place...
        </Text>
        
        {/* Seventh set of question */}
        <View style={styles.SelectDropdownContainer}>
        <TextInput
        multiline={true}
        maxLength={250}
        style={styles.textInput}
        onChangeText={onChangeText}
        placeholder="Write about bill splitting, pets etc..."
      />
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
 textInput: {
  borderRadius: 5,
  padding: 10,
  maxHeight: 200,
  borderColor: colors.gray,
  backgroundColor: colors.lightgray,
  fontFamily: "SourceSansPro_400Regular", 
  fontSize:17,
  fontWeight: "normal",
  color: colors.black
 }
});

export default Step5;