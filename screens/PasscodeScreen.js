import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ToastAndroid, Image, View, TextInput, TouchableWithoutFeedback, Linking } from 'react-native';
import { ScrollView, StatusBar, Platform } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import { TouchableRipple } from 'react-native-paper';
import axios from 'axios';

export function PasscodeScreen({ navigation, route }) {

  // Passcode empty error
  const EmptyPasscode = ({ visible, message }) => {
    if (visible) {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      return null;
    }
    return null;
  };
  const [visibleToastPasscode, setvisibleToastPasscode] = useState(false);
  useEffect(() => setvisibleToastPasscode(false), [visibleToastPasscode]);

    // Passcode match error
    const PasscodeMatchError = ({ visible, message }) => {
      if (visible) {
        ToastAndroid.showWithGravityAndOffset(
          message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        return null;
      }
      return null;
    };
    const [visiblePasscodeMatch, setvisiblePasscodeMatch] = useState(false);
    useEffect(() => setvisiblePasscodeMatch(false), [visiblePasscodeMatch]);

  const email = route.params;
  const emailobj = route.params.email;
  const [passcode,setPasscode] = useState("");
  const [isSubmit, setIsSubmit] = useState(false); 

  const passcodeHandler = (text) =>{
    setPasscode(text);
  }

  useEffect(()=>{
    const authenticate = async()=>{
     axios.post(`http://192.168.1.10/hummingbird/verifypasscode.php?email=${emailobj}`, JSON.stringify({
        passcode: passcode,  
        email: emailobj,
     })).then((response)=>{
       console.log(response.data);
       setIsSubmit(false);
       //Navigate user to home after valid register
       if(response.data == "OK"){
         navigation.navigate("BottomScreen", { email: emailobj } );
       }
       if(response.data == "Passcode do not match"){
        setvisiblePasscodeMatch(true)
      }
       if(response.data == "Passcode is blank"){
        setvisibleToastPasscode(true);
      }
     }).catch((error)=>{
       console.log(error);
     });
    }
    if(isSubmit) authenticate();
  }, [isSubmit])

  let [fontsLoaded] = useFonts({ Righteous_400Regular });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <ScrollView contentContainerStyle={styles.container}>
       <StatusBar style={styles.statusBar} backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.logoContainer}>
      <Image source={require("../assets/app_images/logo2.png")} style={styles.appLogo} />
      </View>

      <View style={styles.formContainer} >

      <TextInput 
      placeholder="Enter passcode sent on mail" 
      keyboardType='numeric'
      onChangeText={passcodeHandler} 
      style={styles.formInput} 
      maxLength={6} 
       />  

      <TouchableRipple 
      onPress={ ()=>setIsSubmit(true) } 
      rippleColor="rgba(244, 246, 246, .32)"
      >
      <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
      </TouchableRipple>

      <Text style={styles.legalText}>
          By registering you agree to our &nbsp;
          <TouchableWithoutFeedback onPress={()=> Linking.openURL('https://reactnativecode.com')}>
            <Text style={styles.trmText}>terms of services &nbsp;</Text>
          </TouchableWithoutFeedback>
          and &nbsp;
          <TouchableWithoutFeedback onPress={()=> Linking.openURL('https://reactnativecode.com')}>
          <Text style={styles.trmText}>privacy policy.</Text>
      </TouchableWithoutFeedback>
        </Text>

     </View>

     {/* Error messages handling */}
     <EmptyPasscode visible={visibleToastPasscode} message="Passcode can't be blank" />
     <PasscodeMatchError visible={visiblePasscodeMatch} message="Passcode do not match. Try again" />

    </ScrollView>
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
    minHeight: '20%',
    maxWidth: '100%',
    maxHeight: '20%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: "relative",
  },
  appLogo: {
    width: 50,
    height: 50,
    marginTop: "5%",
    position: "relative",
  },
  formContainer: {
    flex: 1,
    width: 100,
    height: 100,
    minWidth: '100%',
    minHeight: '80%',
    maxHeight: '80%',
    backgroundColor: colors.white,
    alignItems: 'center',
    marginTop: "0%"
  },
  formInput: {
    backgroundColor: colors.lightgray,
    padding: 12,
    width: "90%",
    borderRadius: 10,
    color: colors.black,
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 11,
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: "center",
    minHeight: 55,
    minHeight: 55,
  },
  buttonText: {
    marginTop: 10,
    color: colors.white,
    backgroundColor: colors.orange,
    fontSize: 15,
    textAlign: "center",
    minWidth: "90%",
    padding: 16,
    borderRadius: 6,
  },
  legalText: {
    marginTop: 10,
    fontWeight: "normal",
    color: colors.black,
    fontSize: 14,
    width: "90%",
  },
  trmText: {
    color: colors.blue,
    margin: 15,
  },
  titleText: {
    color: colors.black,
    fontWeight: "normal",
    fontStyle:"normal",
    fontSize: 30,
    marginTop: "30%",
    marginBottom:0,
  }
});

export default PasscodeScreen;