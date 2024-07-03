import React from 'react';
import  { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/HomeScreen';
import Cart from './screens/CartScreen';


const Stack = createStackNavigator();
export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="CartScreen" component={Cart} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



