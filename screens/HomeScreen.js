import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ route }) {

  const email = route.params;
  const emailobj = route.params.email;
  const [model, setModel] = useState({});

  useEffect(() =>{
    const getUserData = async () => {
       try {
        const response = await axios(`http://192.168.1.7/hummingbird/homeScreen.php?email=${emailobj}`);
        setModel(response.data);
        console.log(response.data)
        const token = await AsyncStorage.setItem('cookie', emailobj)
        const tokenData = await AsyncStorage.getItem('cookie')
       }catch(err){
       console.log(err);
       }
    };
    getUserData()
    }, [emailobj]);

  let [fontsLoaded] = useFonts({ Righteous_400Regular });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <SafeAreaView style={styles.container}>
       <StatusBar style={styles.statusBar} backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.logoContainer}>
        <Text>Home Screen</Text>
        {/* <Text>Hi, {model[0].fullname}</Text> */}
      </View>
      <View style={styles.buttonContainer} >
        <Text>Button Container</Text>
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
  logoContainer: {
    flex: 1,
    width: 100,
    height: 100,
    minWidth: '100%',
    minHeight: '80%',
    maxWidth: '100%',
    maxHeight: '80%',
    backgroundColor: colors.red
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
  }
});

export default HomeScreen;