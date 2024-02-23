import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, Platform } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import VideoScreen from './screens/VideoScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'expo-dev-client';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
 import React, { useState, useEffect, useRef } from 'react';
 import axios from 'axios';




const Stack = createNativeStackNavigator();


export default function App() {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });



  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      let token;
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });
    
      } else {
        alert('Must use physical device for Push Notifications');
      }

      console.log(token.data);
  
      if(token){  
        const url = "https://sea-lion-app-wg2m6.ondigitalocean.app/api/notification";
        try {
          const response = await axios.post(url, {
            token: token.data,
            app: 2,
          });
        } catch (error) {
          console.error('Failed to send push token:');
        }
      }
    
      return token.data;
    }

     registerForPushNotificationsAsync()
  }, []);



  
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Live" component={HomeScreen} 
          options={{
            title: 'Nigeria Tv',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#228B22',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
              textAlign: 'center',
            },
          }}
          />
          <Stack.Screen name="Video" component={VideoScreen}
          options={{
            headerShown: false,
            title: 'Video',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,
              textAlign: 'center',
            },
          }}
          />
        </Stack.Navigator>  
        <StatusBar style="auto" />   
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
  viewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
