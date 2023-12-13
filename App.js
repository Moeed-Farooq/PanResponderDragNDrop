import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Test from './src/screens/Test';
import Test2 from './src/screens/Test2';
import { NavigationContainer } from '@react-navigation/native';



const screenOptionStyle = {
  headerShown: false,
};

const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <>
      <NavigationContainer>

        <Stack.Navigator screenOptions={screenOptionStyle}>
          <Stack.Screen name={'test'} component={Test} />
          <Stack.Screen name={'test2'} component={Test2} />
        </Stack.Navigator>
      </NavigationContainer>

    </>
  )
}

const styles = StyleSheet.create({})