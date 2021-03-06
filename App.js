import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserList from './screens/UserList';
import CreateUserScreen from './screens/CreateUserScreen';
import UserDetailScreen from './screens/UserDetailScreen';
const Stack = createNativeStackNavigator();

function MyStack () {
  return(
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={ UserList}/>
      <Stack.Screen name="UserDetailScreen" component={ UserDetailScreen}/>
      <Stack.Screen name="CreateUserScreen" component={ CreateUserScreen}/>
    </Stack.Navigator>
  )
}

export default function App(){
  return(
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});