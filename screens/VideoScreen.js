import React, {useState} from 'react'
import { View, Text, StyleSheet, Dimensions,StatusBar, ActivityIndicator, Alert } from 'react-native'
import {Video,ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import AlertSignal from '../componentes/Alert';
import { useKeepAwake } from 'expo-keep-awake';



const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function VideoScreen({route, navigation}) {
   
  useKeepAwake();
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
          async function changeScreenOrientation() {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
          }
       
            changeScreenOrientation();
        }, [])
      );

     
      const pressHandler = () => {
        navigation.navigate('Live');
        setShowAlert(false);
    }

    return (
       <View style={styles.container}>

        {loading && <ActivityIndicator size="large" color="#00ff00"  style={styles.activity} />}
        {showAlert && <AlertSignal marginTop={'0%'} pressHandler={pressHandler} />}
        {
          showVideo && <Video 
          source={{ 
            uri: route.params.link,
            headers: route.params.headers
           }}
          resizeMode={ResizeMode.STRETCH}
          style={{ width: '98%', height:  SCREEN_WIDTH * 0.93}}
          useNativeControls={true}
          isMuted={false}
          shouldPlay={true}
          volume={1.0}
          rate={1.0}
          positionMillis={0}
          progressUpdateIntervalMillis={500}
          onError={(error) => {
            setShowVideo(false);
            setLoading(false);
            setShowAlert(true);
          }}
          onLoadStart={() => {
            setLoading(true);
          }}
  
          onLoad={() => {
            setLoading(false);
          }}
         
        /> 
        }
        
    
        <StatusBar hidden={true} />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    viewContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    activity: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }
});
