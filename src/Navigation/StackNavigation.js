
import * as React from 'react';
import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RetailerScreen from '../Screens/RetailerScreen';
import RetailerScreenAccount from '../Screens/RetailerScreenAccount';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{ headerShown: false}}>
        <Stack.Screen name="RetailerScreen" component={RetailerScreen}  />
         <Stack.Screen name="RetailerScreenAccount" component={RetailerScreenAccount}  /> 
        {/* <Stack.Screen name="Screen3" component={Screen3}  />  */}
        

      </Stack.Navigator>
      </NavigationContainer>
  
  )
}

export default StackNavigation;
