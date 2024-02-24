import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  RefreshControl,
} from "react-native";
import MatchItem from "../componentes/matchItem";
import axios from "axios";
import * as ScreenOrientation from "expo-screen-orientation";
import { useFocusEffect } from "@react-navigation/native";
import UpdateModal from "../componentes/update";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useInterstitialAd,
} from "react-native-google-mobile-ads";
import { useIsFocused } from "@react-navigation/native";
import AlertSignal from "../componentes/Alert";



export default function HomeScreen({ navigation, route }) {
  const adUnitId = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-8562038685299408/5733785160";

const interstitialAdUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-8562038685299408/1267926543";

  const [updateModal, setUpdateModal] = useState(false);
  const [adCount, setAdCount] = useState(0);
  const appVersion = 3.0;
  const isFocused = useIsFocused();
  const [dataList, setDataList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { isLoaded, isClosed, load, show } = useInterstitialAd(
    interstitialAdUnitId,
    {
      requestNonPersonalizedAdsOnly: true,
    }
  );

  useFocusEffect(
    React.useCallback(() => {
      async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
      }

      changeScreenOrientation();
    }, [])
  );

  useEffect(() => {
    if (isFocused) {
      setAdCount(adCount + 1);
    }
    if (isFocused && adCount % 2 === 0) {
      load();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isLoaded) {
      show();
    }
  }, [isLoaded]);

  const fetchData = async () => {
    try {
      const url = "https://cloudy-turtleneck-shirt-bull.cyclic.app/api/live?app_v=5&app=2";
      // const url = "http://10.0.2.2:5001/api/live?app_v=3&app=2";
      const options = {
        method: "GET",
        headers: {
          "X-Auth-Token": "e2b5f1d7b9a64f9a8c1c5a7d4a3f0d8b",
        },
      };
      const response = await axios.get(url, options);
      setLoaded(true);
      if (response.data.app > appVersion) {
        setUpdateModal(true);
      }
      setDataList(response.data.football);
    } catch (error) {
      if (dataList.length === 0) {
        setShowAlert(true);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const pressHandler = () => {
    setShowAlert(false);
    if (dataList.length === 0) {
      fetchData();
    }
  };

  
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.bannerAds}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
      {updateModal ? (
        <UpdateModal />
      ) : (
        <View style={styles.container}>
          {showAlert ? (
            <AlertSignal pressHandler={pressHandler} marginTop={"0%"} />
          ) : loaded ? (
            <FlatList
              style={styles.viewContainer}
              data={dataList}
              renderItem={({ item }) => (
                <MatchItem item={item} navigation={navigation} route={route} />
              )}
              keyExtractor={(item) => item._id}
              refreshControl={
                <RefreshControl
                  onRefresh={fetchData}
                  colors={["#fff"]}
                  progressBackgroundColor={"#282c34"}
                  refreshing={!loaded}
                />
              }
            />
          ) : (
            <Text style={styles.loading}>Loading...</Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282c34",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingTop: 30,
    width: "100%",
    marginBottom: 80,
  },
  viewContainer: {
    width: "100%",
  },
  loading: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  bannerAds: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    backgroundColor: "#282c34",
    width: "100%",
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "#282c34",
  },
});
