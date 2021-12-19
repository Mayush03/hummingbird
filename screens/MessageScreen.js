import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MessageScreen({}) {

  const [model, setModel] = useState([]);

  useEffect(() =>{
    const getUserData = async () => {
       try {
        //Saving cookies...
        const tokenData = await AsyncStorage.getItem('cookie')
        const response = await axios(`http://192.168.1.10/hummingbird/homeScreen.php?email=${tokenData}`);
        setModel(response.data);
        console.log("ProfileScreen response data: ")
        console.log(response.data)
       }catch(err){
         
       console.log("ProfileScreen: " + err);
       }
    };
    getUserData()
    }, []);

    let [fontsLoaded] = useFonts({ SourceSansPro_400Regular });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <SafeAreaView style={styles.container}>
       <StatusBar style={styles.statusBar} backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.mainContainer}>
        {!!model && model.map((item, uqid) => (
        <View key={uqid}>
        <Text style={styles.hText}>Hi, {item.fullname}</Text>
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
    backgroundColor: colors.gray
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
  hText: {
    fontFamily: "SourceSansPro_400Regular", 
      fontSize: 30, 
      padding: 8,
      fontWeight: "bold",
  } 
});

export default MessageScreen;