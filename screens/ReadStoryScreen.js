import React, { useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, StatusBar, Platform, FlatList, Image, ScrollView } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';
import { DMSerifText_400Regular } from '@expo-google-fonts/dm-serif-text';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title, Paragraph } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

function StoryScreen({navigation, route}) {

  const [story, setStory] = useState([]);
  const regex = /(<([^>]+)>)/ig; //Removing HTML tags from json response from story_body
  const { height, width } = useWindowDimensions();

  const sid = route.params.sid.sid;

  useEffect(() =>{
    const getAllStories = async () => {
       try {
        //Saving cookies...
        const tokenData = await AsyncStorage.getItem('cookie')
        const response = await axios(`http://192.168.1.7/hummingbird/readStory.php?sid=${sid}`);
        setStory(response.data);
        console.log("StoryScreen response data: ")
        console.log(response.data)
       }catch(err){
       console.log("StoryScreen Err: " + err);
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
   <TouchableOpacity style={styles.actionsButton} 
        onPress={() => navigation.goBack()} activeOpacity={.6}>
          <Ionicons name="chevron-back-sharp" size={30} color="black" />
        </TouchableOpacity>
     {/* <FlatList
     data={ story }
     renderItem={({item}) => 
   <View style={styles.cardLayout}>
   <Image source={{ uri: `${item.story_image}` }} style={styles.storyImage} />
   <Title style={styles.storyTitle}>{item.story_title}</Title>
   <Paragraph>{item.story_body.replace(regex, '')}</Paragraph>
</View>
       }
     keyExtractor={(item, index) => index.toString()}
     /> */}

     {!!story && story.map((item, sid) => (
        <View key={sid}>
          <View style={styles.cardLayout}>
            <Image source={{ uri: `${item.story_image}` }} style={styles.storyImage} />
            <Title style={styles.storyTitle}>{item.story_title}</Title>
            <Paragraph>{item.story_body.replace(regex, '')}</Paragraph>
            </View>

        </View>
        ))}

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
    width: "96%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyTitle: {
    marginTop: "2%",
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
    width: "100%",
    height: "35%",
    borderRadius: 10,
  },
  buttonName:{
    fontSize: 15,
    position: "relative",
  },
  buttonIcon: {
    paddingTop: 10,
    marginRight: 9,
   }
});

export default StoryScreen;