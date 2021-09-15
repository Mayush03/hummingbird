import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import WelcomeScreen from "../screens/WelcomeScreen";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import PasscodeScreen from '../screens/PasscodeScreen';
import LoginPasscodeScreen from '../screens/LoginPasscodeScreen';
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

export default AppNavigator;