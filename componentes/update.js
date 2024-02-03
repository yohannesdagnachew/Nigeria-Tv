import React, { useState, useEffect } from "react";
import {
  useWindowDimensions,
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import * as Linking from 'expo-linking';
import axios from "axios";

export default function UpdateModal() {

   const updateHandler = async () => {
    const url = 'https://cloudy-turtleneck-shirt-bull.cyclic.app/api/update';
    const options = {
      method: 'GET',
      headers: {
        'X-Auth-Token': 'e2b5f1d7b9a64f9a8c1c5a7d4a3f0d8b'
      }
    }
    const response = await axios.get(url, options);
    Linking.openURL(response.data.link)
    
    };



  return (
    <View style={styles.container}>
      <View style={styles.update}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={updateHandler}
        >
          Update
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282c34",
    alignItems: "center",
    justifyContent: "center",
  },
    update: {
        backgroundColor: "#fff",
        width: "80%",
        height: "30%",
        borderRadius: 10,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    button: {
        width: 150,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
});
