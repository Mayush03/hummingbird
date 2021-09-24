import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Switch, Linking } from 'react-native';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';


function SettingsScreen({ navigation, route }) {

  //Switch notification
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  //Toggle theme
  const [isEnabledTheme, setIsEnabledTheme] = useState(false);
  const toggleThemeSwitch = () => setIsEnabledTheme(previousState => !previousState);

  //Toggle Alert pop-up
  const [showAlert, setShowAlert] = useState(false);

  const logoutConfirm = ()=>{
    setShowAlert(true);
}

//Logout function
const Logout = async() => {
  let deleteCookie = AsyncStorage.clear();
  if(deleteCookie){
    console.log("Logging out...")
    //navigation.navigate("Welcome")
    setTimeout(() => { navigation.navigate("Welcome")}, 1000);
    // wait for 1 seconds before moving to Welcome screen
  }
}


  //const email = route.params;
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

  let [fontsLoaded] = useFonts({ SourceSansPro_400Regular });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <SafeAreaView style={styles.container}>
       <StatusBar style={styles.statusBar} backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.mainContainer}>
        <Text style={styles.screenTitle}>Settings</Text>
        <Text style={styles.screenDescriptionText}>Manage your app preferences</Text>

        <View style={styles.profileManagerContainer}>
        <TouchableOpacity style={styles.actionsButton} 
        onPress={ ()=> console.log("Manage profile clicked") } activeOpacity={.6}>
          <Text style={styles.buttonText}>
            Manage profile
          </Text>
          <Ionicons name="arrow-forward-circle-outline" size={25} style={styles.buttonIcon} color="black" />
        </TouchableOpacity>

        <View style={styles.toogleButtonContainer}>
          <Text style={styles.buttonText}>
            Notifications
          </Text>
          <Switch
        trackColor={{ false: "#767577", true: "#48C9B0" }}
        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
        </View>

        <Text style={styles.sectionHeading}>Safety & Legal</Text>

        <TouchableOpacity style={styles.actionsButton} 
        onPress={()=> Linking.openURL('https://reactnativecode.com')} activeOpacity={.6}>
          <Text style={styles.buttonText}>
           Privacy policy
          </Text>
          <Ionicons name="arrow-forward-circle-outline" size={25} style={styles.buttonIcon} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionsButton} 
        onPress={()=> Linking.openURL('https://reactnativecode.com')} activeOpacity={.6}>
          <Text style={styles.buttonText}>
           Terms of services
          </Text>
          <Ionicons name="arrow-forward-circle-outline" size={25} style={styles.buttonIcon} color="black" />
        </TouchableOpacity>

        <Text style={styles.sectionHeading}>Switch theme</Text>
        <View style={styles.toogleButtonContainer}>
          <Text style={styles.buttonText}>
            Dark mode
          </Text>
          <Switch
        trackColor={{ false: "#767577", true: "#48C9B0" }}
        thumbColor={isEnabledTheme ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleThemeSwitch}
        value={isEnabledTheme}
      />
        </View>

        <TouchableOpacity style={styles.logoutButton} 
        onPress={ ()=> logoutConfirm() } activeOpacity={.9}>
          <Text style={styles.logoutText}>
            Logout from your account
          </Text>
        </TouchableOpacity>

        </View>

        <AwesomeAlert
    show={showAlert}
    showProgress={false}
    title="⚠️"
    titleStyle={{fontSize: 25}}
    message="Do you want to logout?"
    messageStyle={{fontFamily: "SourceSansPro_400Regular", fontSize: 18, color: colors.black}}
    closeOnTouchOutside={false}
    closeOnHardwareBackPress={false}
    showCancelButton={true}
    showConfirmButton={true}
    contentContainerStyle={{minHeight: 145}}
    cancelText="No, next time"
    confirmText="Yes, logout..."
    confirmButtonColor="#F35431"
    confirmButtonTextStyle={{
    fontFamily: "SourceSansPro_400Regular", 
    fontSize: 16, 
    padding: 8
    }}
    cancelButtonColor="#99A3A4"
    cancelButtonTextStyle={{
      fontFamily: "SourceSansPro_400Regular", 
      fontSize: 16, 
      padding: 8
    }}
    onCancelPressed={() => {
     setShowAlert(false)
    }}
    onConfirmPressed={() => {
      setShowAlert(false)
      Logout();
      //setTimeout(() => { Logout();}, 3000);
    }}
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
  screenTitle: {
    color: colors.black,
    fontFamily: 'SourceSansPro_400Regular',
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center"
  },
  sectionHeading: {
    marginTop: "8%",
    color: colors.black,
    fontFamily: 'SourceSansPro_400Regular',
    fontSize: 16,
  },
  screenDescriptionText:{
    color: colors.black,
    fontFamily: 'SourceSansPro_400Regular',
    fontSize: 16,
    fontWeight: "normal",
    marginTop: -8,
    marginLeft: 10,
    textAlign: "center"
  },
  buttonContainer: {
    flex: 1,
    width: 100,
    height: 100,
    minWidth: '100%',
  },
  profileManagerContainer: {
    marginTop: "10%",
    maxWidth: "100%",
    minHeight: 50,
    margin:10,
    justifyContent: "space-between"
  },
  buttonText:{
    color: colors.black,
    fontFamily: 'SourceSansPro_400Regular',
    fontSize: 16,
    fontWeight: "normal",
    marginTop: 0,
    padding: 13,
    borderRadius: 6,
  },
  logoutText:{
    color: colors.brightred,
    fontFamily: 'SourceSansPro_400Regular',
    fontSize: 16,
    fontWeight: "normal",
    marginTop: 0,
    padding: 13,
    borderRadius: 6,
    textAlign: "center"
  },
  buttonIcon: {
   paddingTop: 10,
   marginRight: 9,
  },
  actionsButton: {
    minWidth: "100%",
    flexDirection: "row", 
    justifyContent: "space-between",
    backgroundColor: colors.gray,
    borderRadius: 6,
    marginBottom: 10,
  },
  logoutButton: {
      minWidth: "100%",
      marginTop: "12%",
      backgroundColor: colors.lightred,
      borderRadius: 6,
      marginBottom: 10,
      textAlign: "center"
  },
  logoutButtonIcon:{
    paddingTop: 15,
    marginRight: 8,
  },
  toogleButtonContainer: {
    minWidth: "100%",
    flexDirection: "row", 
    justifyContent: "space-between",
    backgroundColor: colors.gray,
    borderRadius: 6,
    marginBottom: 10,
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
  trmText: {
    paddingTop: 10,
    paddingBottom: 10,
    color: colors.black,
    borderTopWidth: 1,
    borderTopColor: colors.darkgray,
    fontSize: 19,
    fontFamily: 'SourceSansPro_400Regular',
  },
});

export default SettingsScreen;