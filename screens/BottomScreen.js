import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import colors from '../utility/colors';
import AppLoading from 'expo-app-loading';
import { useFonts, Righteous_400Regular } from '@expo-google-fonts/righteous';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/* Bottom Tab screens */
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';
import ShelfScreen from './ShelfScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

function UserpassScreen({ route }) {

  const email = route.params;
  const emailobj = route.params.email;
  console.log("bottomscreen emailobj: " + emailobj)
  const [model, setModel] = useState({});

  useEffect(() =>{
    const getUserData = async () => {
       try {
        const response = await axios(`http://192.168.1.7/hummingbird/homeScreen.php?email=${emailobj}`);
        setModel(response.data);
        console.log(response.data)
        const token = await AsyncStorage.setItem('cookie', emailobj)
        const tokenData = await AsyncStorage.getItem('cookie')
        console.log("tokenData: " + tokenData)
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
      <View style={styles.mainContainer}>
      <Tab.Navigator 
       //initialRouteName="Home"
       screenOptions={{
         tabBarShowLabel: false,
         headerShown: false,
         tabBarStyle: {
           position: 'absolute',
           bottom: 30,
           left: 20,
           right: 20,
           elevation: 0,
           backgroundColor: colors.black,
           borderRadius: 16,
           minHeight: 66,
           maxHeight: 66,
           ...styles.shadow
         }
       }}
       >

       <Tab.Screen name="Home" component={HomeScreen} initialParams={{ emailobj }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{position: 'absolute', top: 20, left:20, right: 0, bottom: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Image 
              source={require("../assets/app_images/home.png")}
              resizeMode="contain"
              style={{
                width:25,
                height:25,
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                justifyContent: 'center', 
                alignItems: 'center',
                tintColor: focused ? colors.orange : colors.blackdisable
              }}
              />
            </View>
          ),
        }}   />

       <Tab.Screen name="Search" component={SearchScreen} initialParams={{ emailobj }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{position: 'absolute', top: 20, left:17, right: 0, bottom: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Image 
              source={require("../assets/app_images/search.png")}
              resizeMode="contain"
              style={{
                width:25,
                height:25,
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                justifyContent: 'center', 
                alignItems: 'center',
                tintColor: focused ? colors.orange : colors.blackdisable
              }}
              />
            </View>
          ),
        }}   />


     <Tab.Screen name="Shelf" component={ShelfScreen} initialParams={{ emailobj }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{position: 'absolute', top: 14, left:11, right: 0, bottom: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Image 
              source={require("../assets/app_images/shelf.png")}
              resizeMode="contain"
              style={{
                width:35,
                height:35,
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                justifyContent: 'center', 
                alignItems: 'center',
                tintColor: focused ? colors.orange : colors.blackdisable
              }}
              />
            </View>
          ),
        }}   />


         <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ emailobj }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{position: 'absolute', top: 19, left:19, right: 0, bottom: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Image 
              source={require("../assets/app_images/profile.png")}
              resizeMode="contain"
              style={{
                width:27,
                height:27,
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                justifyContent: 'center', 
                alignItems: 'center',
                tintColor: focused ? colors.orange : colors.blackdisable
              }}
              />
            </View>
          ),
        }}   />

<Tab.Screen name="Settings" component={SettingsScreen} initialParams={{ emailobj }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{position: 'absolute', top: 20, left:17, right: 0, bottom: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Image 
              source={require("../assets/app_images/settings.png")}
              resizeMode="contain"
              style={{
                width:25,
                height:25,
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                justifyContent: 'center', 
                alignItems: 'center',
                tintColor: focused ? colors.orange : colors.blackdisable
              }}
              />
            </View>
          ),
        }}   />

      </Tab.Navigator>
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

export default UserpassScreen;