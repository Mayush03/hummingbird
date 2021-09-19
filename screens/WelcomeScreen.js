import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import { TouchableRipple } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {

  
  useEffect(() =>{
    const getcookietoken = async () => {
       try {
        const tokenData = await AsyncStorage.getItem('cookie')
        if(tokenData){
          //alert(tokenData)
          //await AsyncStorage.removeItem(tokenData);
          navigation.navigate("Home", { email: tokenData } );
        }
        else{
         //alert("No token")
         navigation.navigate("Welcome")
        }
       }catch(err){
       console.log(err);
       }
    };
    getcookietoken()
    }, []);

  let [fontsLoaded] = useFonts({ Righteous_400Regular });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <SafeAreaView style={styles.container}>
       <StatusBar style={styles.statusBar} backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.logoContainer}>
      <Image source={require("../assets/app_images/logo2.png")} style={styles.appLogo} />
      <Text style={styles.logotext}>hummingbird</Text>
      </View>
      <View style={styles.buttonContainer} >

      <TouchableRipple onPress={() => navigation.navigate('Signup')} rippleColor="rgba(244, 246, 246, .32)">
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableRipple>
      
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
    minHeight: '90%',
    maxWidth: '100%',
    maxHeight: '90%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    backgroundColor: colors.orange,
    fontSize: 15,
    textAlign: "center",
    minWidth: "80%",
    padding: 14,
    borderRadius: 50,
  }
});