import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ToastAndroid, Image, View, TextInput, TouchableWithoutFeedback, Linking } from 'react-native';
import { ScrollView, StatusBar, Platform } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import { TouchableRipple } from 'react-native-paper';
import axios from 'axios';


export function SignupScreen({ navigation }) {

  //Empty email error
  const EmptyEmail = ({ visible, message }) => {
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
  const [visibleToastEmail, setvisibleToastEmail] = useState(false);
  useEffect(() => setvisibleToastEmail(false), [visibleToastEmail]);

  // Email duplicate error
  const Emailnotfound = ({ visible, message }) => {
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
  const [visibleEmailErr, setvisibleEmailErr] = useState(false);
  useEffect(() => setvisibleEmailErr(false), [visibleEmailErr]);

  const [email,setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false); 

  const emailHandler = (text) =>{
    setEmail(text);
  }

  useEffect(()=>{
    const authenticate = async()=>{
     axios.post("http://192.168.1.10/hummingbird/loginUser.php", JSON.stringify({ 
        email: email,
     })).then((response)=>{
       console.log(response.data);
       setIsSubmit(false);
       //Navigate user to home after valid login
       if(response.data == "OK"){
         navigation.navigate("LoginPasscode", { email: email } );
       }
       if(response.data == "Email issue"){
        setvisibleToastEmail(true);
       }
       if(response.data == "Email not found"){
        setvisibleEmailErr(true);
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
      placeholder="Email address" 
      keyboardType="email-address"
      onChangeText={emailHandler} 
      style={styles.formInput} 
      maxLength={80} 
       />

      <TouchableRipple 
      onPress={ ()=>setIsSubmit(true) } 
      rippleColor="rgba(244, 246, 246, .32)"
      >
      <Text style={styles.buttonText}>CONTINUE</Text>
      </TouchableRipple>

      <Text style={styles.legalText}>
          By login you agree to our&nbsp;
          <TouchableWithoutFeedback onPress={()=> Linking.openURL('https://reactnativecode.com')}>
            <Text style={styles.trmText}>terms of services </Text>
          </TouchableWithoutFeedback>
          and &nbsp;
          <TouchableWithoutFeedback onPress={()=> Linking.openURL('https://reactnativecode.com')}>
          <Text style={styles.trmText}>privacy policy.</Text>
      </TouchableWithoutFeedback>
        </Text>

        <Text style={styles.signupButton}>
          New here?&nbsp;
          <TouchableWithoutFeedback onPress={()=> navigation.navigate("Signup")}>
            <Text style={styles.trmText}>create your account </Text>
          </TouchableWithoutFeedback>
        </Text>

     </View>

     {/* Error messages handling */}
     <EmptyEmail visible={visibleToastEmail} message="Email format incorrect" />
     <Emailnotfound visible={visibleEmailErr} message="Email not found, create new account" />

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
    fontSize: 16,
    marginBottom: 11,

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
  },
  signupButton: {
    marginTop: 20,
    fontWeight: "normal",
    color: colors.black,
    fontSize: 14,
    width: "90%",
    textAlign: "center",
  },
});

export default SignupScreen;