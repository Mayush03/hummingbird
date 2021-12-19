import React, { useState, useEffect, useRef} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, StatusBar, Platform, FlatList, Image } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';
import { DMSerifText_400Regular } from '@expo-google-fonts/dm-serif-text';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWindowDimensions } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { FAB } from 'react-native-paper';

function HomeScreen({navigation}) {

  // const email = route.params;
  // const emailobj = route.params.email;

  const [story, setStory] = useState([]);
  const { height, width } = useWindowDimensions();

  useEffect(() =>{
    const getAllStories = async () => {
       try {
        //Saving cookies...
        const tokenData = await AsyncStorage.getItem('cookie')
        const response = await axios(`http://192.168.1.10/hummingbird/allStories.php`);
        setStory(response.data);
        console.log("HomeScreen response data: ")
        console.log(response.data)
       }catch(err){
         
       console.log("HomeScreen Err: " + err);
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
        <Text style={styles.screenName}>Home</Text>

      {/* Floating button */}  
        <FAB
          style={styles.fab}
          large
          icon="plus"
          color={colors.white}
          onPress={() => navigation.navigate("AddSpace")}
        />

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
  buttonContainer: {
    flex: 1,
    width: 100,
    height: 100,
    minWidth: '100%',
    backgroundColor: colors.darkgray
  },
  shadow:{
    shadowColor: colors.shadow,
    shadowOffset: {
      width:0,
      height:10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  screenName:{
    padding:6,
    fontFamily: "SourceSansPro_400Regular", 
    fontSize:21,
    fontWeight: "normal",
  },
  cardLayout: {
    padding: 10,
    marginLeft: "2%",
    // borderRadius: 10,
    width: "96%",
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: "70%",
    // borderWidth:0.4,
    // overflow: 'hidden',
    // shadowRadius: 10,
    // shadowOpacity: 0.5,
    // backgroundColor: colors.lightpink

  },
  storyTitle: {
    textAlign: "center",
    fontWeight:"normal",
    fontSize: 25,
    fontFamily: 'DMSerifText_400Regular',
  },
  storyBody: {
    marginTop: "5%",
    fontSize: 16,
    fontFamily: "SourceSansPro_400Regular", 
  },
  storyGenere: {
    marginTop: "8%",
    fontSize: 16,
    fontFamily: "SourceSansPro_400Regular", 
    padding: 8,
    borderRadius: 12,
    color: colors.blue,
  },
  storyImage: {
    width: "97%",
    height: "35%",
    borderRadius: 10,
  },
  fab: {
    position: 'absolute',
    right: 22,
    bottom: 90,
    backgroundColor:colors.orange
  },
});

export default HomeScreen;