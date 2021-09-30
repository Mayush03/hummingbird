import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({}) {

  // const email = route.params;
  // const emailobj = route.params.email;

  //const tokenData = ({});

  const [model, setModel] = useState([]);
  //console.log(emailobj)

  useEffect(() =>{
    const getUserData = async () => {
       try {
        //Saving cookies...
        const tokenData = await AsyncStorage.getItem('cookie')
        console.log("HomeScreen tokenData: " + tokenData) 
        const response = await axios(`http://192.168.1.7/hummingbird/homeScreen.php?email=${tokenData}`);
        setModel(response.data);
        console.log("HomeScreen response data: ")
        console.log(response.data)
       }catch(err){
         
       console.log("HomeScreen: " + err);
       }
    };
    getUserData()
    }, []);

  let [fontsLoaded] = useFonts({ Righteous_400Regular });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <SafeAreaView style={styles.container}>
       <StatusBar style={styles.statusBar} backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.mainContainer}>
        <Text>Home Screen</Text>
        {!!model && model.map((item, uqid) => (
        <View key={uqid}>
        <Text>{item.fullname}</Text>
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
  appLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  logotext: {
    color: colors.orange,
    fontFamily: 'Righteous_400Regular',
    fontSize: 25,
    textAlign: "center"
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
  }
});

export default HomeScreen;