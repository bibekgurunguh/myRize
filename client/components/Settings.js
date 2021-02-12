import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";

import Colors from "../constants/colors";
const Theme = Colors.default;

export default function Settings(props) {
  const [changeTheme, setChangeTheme] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const rollUp = new Animated.Value(400);
  Animated.spring(rollUp, { toValue: 0, useNativeDriver: true }).start();

  const [rollAnim, setRollAnim] = useState(rollUp);

  function toggleChangeTheme() {
    setChangeTheme(!changeTheme);
  }

  function toggleNotifications() {
    setNotifications(!notifications);
  }

  return (
    <Animated.ScrollView
      style={{ ...styles.container, transform: [{ translateY: rollAnim }] }}
    >
      <Text style={styles.label}>Settings</Text>

      <View style={styles.line}></View>

      <View style={styles.card}>
        <TouchableOpacity
          onPress={toggleNotifications}
          style={styles.toggleOption}
        >
          <Text style={styles.label}>Notifications</Text>
          <View
            style={
              notifications
                ? styles.notificationsActive
                : styles.notificationsInactive
            }
          ></View>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <TouchableOpacity onPress={toggleChangeTheme}>
          <Text style={styles.label}>Change theme</Text>
          {changeTheme ? (
            <View>
              <Text>Hi</Text>
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: Theme.accent,
  },
  line: {
    marginVertical: 10,
    borderBottomColor: Theme.accent,
    borderBottomWidth: 1,
  },
  card: {
    backgroundColor: Theme.light,
    margin: 5,
    padding: 10,
    elevation: 10,
  },
  toggleOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationsActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "lightgreen",
    borderWidth: 2,
    borderColor: "green",
  },
  notificationsInactive: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "lightgrey",
    borderWidth: 2,
    borderLeftColor: "grey",
    borderTopColor: "grey",
    borderRightColor: "black",
    borderBottomColor: "black",
  },
});
