import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/* Bottom Tab Screens */
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }

  export default BottomTabs;