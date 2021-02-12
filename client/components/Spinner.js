import React from "react";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function Spinner() {
  return (
    <LottieView
      style={styles.spinner}
      source={require("../assets/JSON/spinner.json")}
      autoPlay
      loop
    ></LottieView>
  );
}

const styles = StyleSheet.create({
  spinner: {
    position: "absolute",
  },
});
