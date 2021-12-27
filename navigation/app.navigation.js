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
import MessageScreen from '../screens/MessageScreen';
import RecorderScreen from '../screens/RecorderScreen';
import Step1 from '../ListSpaceSteps/Step1';
import Step2 from '../ListSpaceSteps/Step2';
import Step3 from '../ListSpaceSteps/Step3';
import Step4 from '../ListSpaceSteps/Step4';
import Step5 from '../ListSpaceSteps/Step5';
import Step6 from '../ListSpaceSteps/Step6';
import Step7 from '../ListSpaceSteps/Step7';
import Step8 from '../ListSpaceSteps/Step8';
import Step9 from '../ListSpaceSteps/Step9';

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
          <Stack.Screen options={{headerShown: false}} name="Message" component={MessageScreen} />
          <Stack.Screen options={{headerShown: false}} name="Recorder" component={RecorderScreen} />
          <Stack.Screen options={{headerShown: false}} name="Step1" component={Step1} />
          <Stack.Screen options={{headerShown: false}} name="Step2" component={Step2} />
          <Stack.Screen options={{headerShown: false}} name="Step3" component={Step3} />
          <Stack.Screen options={{headerShown: false}} name="Step4" component={Step4} />
          <Stack.Screen options={{headerShown: false}} name="Step5" component={Step5} />
          <Stack.Screen options={{headerShown: false}} name="Step6" component={Step6} />
          <Stack.Screen options={{headerShown: false}} name="Step7" component={Step7} />
          <Stack.Screen options={{headerShown: false}} name="Step8" component={Step8} />
          <Stack.Screen options={{headerShown: false}} name="Step9" component={Step9} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

export default AppNavigator;