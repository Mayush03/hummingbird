import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, StatusBar, Platform, FlatList } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

function HomeScreen({}) {

  // const email = route.params;
  // const emailobj = route.params.email;

  const [story, setStory] = useState([]);
  
  useEffect(() =>{
    const getAllStories = async () => {
       try {
        //Saving cookies...
        const tokenData = await AsyncStorage.getItem('cookie')
        const response = await axios(`http://192.168.1.7/hummingbird/allStories.php`);
        setStory(response.data);
        console.log("HomeScreen response data: ")
        console.log(response.data)
       }catch(err){
         
       console.log("HomeScreen Err: " + err);
       }
    };
    getAllStories()
    },[]);

    let [fontsLoaded] = useFonts({ SourceSansPro_400Regular });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <SafeAreaView style={styles.container}>
       <StatusBar style={styles.statusBar} backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.mainContainer}>
        <Text style={styles.screenName}>Home</Text>
        {/* {!!story && story.map((item, sid) => (
        <View key={sid}>
        
        <Card>
          <Card.Content>
            <Title>{item.story_title}</Title>
            </Card.Content>
              <Card.Cover source={{ uri: `${item.story_image}` }} />
        </Card>
       
        </View>
        ))} */}
        {/* <Text>{story.length > 0 && story}</Text> */}

        <FlatList
        data={ story }
        renderItem={({item}) => 
        
        <Card>
        <Card.Content>
          <Title>{item.story_title}</Title>
          </Card.Content>
            <Card.Cover source={{ uri: `${item.story_image}` }} />
      </Card>
        
          }
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews={true}
        initialNumToRender={10}
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
    fontWeight: "bold",
  }
});

export default HomeScreen;