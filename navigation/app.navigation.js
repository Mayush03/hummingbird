import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import WelcomeScreen from "../screens/WelcomeScreen";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import PasscodeScreen from '../screens/PasscodeScreen';
import BottomScreen from '../screens/BottomScreen';
import LoginPasscodeScreen from '../screens/LoginPasscodeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import ShelfScreen from '../screens/ShelfScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ReadStoryScreen from '../screens/ReadStoryScreen';

const Stack = createStackNavigator();

function AppNavigator() {

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ gestureEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}>
          <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen} />
          <Stack.Screen options={{headerShown: false}} name="Signup" component={SignupScreen} />
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
          <Stack.Screen options={{headerShown: false}} name="Passcode" component={PasscodeScreen} />
          <Stack.Screen options={{headerShown: false}} name="LoginPasscode" component={LoginPasscodeScreen} />
          <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
          <Stack.Screen options={{headerShown: false}} name="Profile" component={ProfileScreen} />
          <Stack.Screen options={{headerShown: false}} name="Search" component={SearchScreen} />
          <Stack.Screen options={{headerShown: false}} name="Shelf" component={ShelfScreen} />
          <Stack.Screen options={{headerShown: false}} name="Settings" component={SettingsScreen} />
          <Stack.Screen options={{headerShown: false}} name="BottomScreen" component={BottomScreen} />
          <Stack.Screen options={{headerShown: false}} name="StoryScreen" component={ReadStoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

export default AppNavigator;