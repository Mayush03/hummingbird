import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/* Bottom Tab Screens */
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>
    );
  }

  export default BottomTabs;