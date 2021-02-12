import React from "react";
import { StyleSheet, Text, Animated, TouchableOpacity } from "react-native";

import Colors from "../constants/colors";

let alreadyInvoked = false;

export default function QuickSettings(props) {
  const scaleUp = new Animated.Value(0);
  const moveAway = new Animated.Value(-200);
  Animated.parallel([
    Animated.spring(scaleUp, { toValue: 1, useNativeDriver: true }),
    Animated.spring(moveAway, { toValue: 0, useNativeDriver: true }),
  ]).start();
  const scaleDown = new Animated.Value(1);
  const moveInside = new Animated.Value(0);
  Animated.parallel([
    Animated.spring(scaleDown, { toValue: 0, useNativeDriver: true }),
    Animated.timing(moveInside, { toValue: -200, useNativeDriver: true }),
  ]).start();

  let scaleAnim, moveAnim;
  if (props.invoked) {
    scaleAnim = scaleUp;
    moveAnim = moveAway;
    alreadyInvoked = true;
  } else if (alreadyInvoked) {
    scaleAnim = scaleDown;
    moveAnim = moveInside;
    alreadyInvoked = false;
  } else {
    scaleAnim = 0;
    moveAnim = 0;
  }

  function goSettings() {
    props.toggleQuickSettings();
    props.goSettings();
    props.screenChange();
  }

  return (
    <Animated.View
      style={{
        ...styles.panel,
        transform: [{ scaleY: scaleAnim }, { translateY: moveAnim }],
      }}
    >
      <TouchableOpacity
        style={styles.buttons}
        activeOpacity={0.6}
        onPress={goSettings}
      >
        <Text style={styles.buttonText}>🔆 Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} activeOpacity={0.6}>
        <Text style={styles.buttonText}>⭐ Rate us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} activeOpacity={0.6}>
        <Text style={styles.buttonText}>⚠ About us</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttons}
        activeOpacity={0.6}
        onPress={() => {
          props.toggleQuickSettings();
          props.logOut();
          props.setScreen("");
        }}
      >
        <Text style={styles.buttonText}>🏁 Log out</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

let Theme = Colors.default;

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    backgroundColor: Theme.light,
    width: 150,
    elevation: 10,
    paddingBottom: 15,
  },
  buttons: {
    margin: 5,
    width: "100%",
    height: 30,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    color: Theme.dark,
    paddingLeft: 10,
  },
});
