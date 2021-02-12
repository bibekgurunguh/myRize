import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import LottieView from "lottie-react-native";
import Spinner from "./Spinner";

import Colors from "../constants/colors";
import { IP_ADDRESS, PORT } from "../config";

const BASE_URL = `http://${IP_ADDRESS}:${PORT}`;
const Theme = Colors.default;

export default function loginScreen(props) {
  const [initialLoad, setInitialLoad] = useState(true);
  const [form, setForm] = useState("login");
  const [switchForm, setSwitchForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    const result = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((user) => {
        if (user.message) {
          alert(user.message);
        } else {
          setInitialLoad(true);
          props.logIn();
          props.setUser(user);
          props.setUserId(user._id);
          props.getAllRes();
          props.setScreen("home");
        }
      });
    return result;
  }

  async function handleSignup(e) {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
      first: first,
      last: last,
      settings: {},
      my_resolutions: [],
      notes: [],
    };
    if (!first || !last) {
      alert("Invalid name");
      return;
    }
    if (!email || !password) {
      alert("Invalid email/password");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password confirmation must match");
      return;
    }

    const result = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((res) => alert(res.message));
    return result;
  }

  const slideLeft = new Animated.Value(400);
  Animated.spring(slideLeft, { toValue: 0, useNativeDriver: true }).start();

  const slideRight = new Animated.Value(-400);
  Animated.spring(slideRight, { toValue: 0, useNativeDriver: true }).start();

  const rollUp = new Animated.Value(400);
  Animated.spring(rollUp, { toValue: 0, useNativeDriver: true }).start();

  return (
    <Animated.ScrollView
      style={{ transform: [{ translateY: initialLoad ? rollUp : 0 }] }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <LottieView
        style={styles.logo}
        source={require("../assets/JSON/logoAnimation.json")}
        autoPlay
        loop
      ></LottieView>
      <Text style={styles.appTitle}>
        MY<Text style={styles.appTitle2}>R</Text>IZE
      </Text>

      {form === "login" ? (
        <Animated.View
          style={{
            alignItems: "center",
            transform: [{ translateX: switchForm ? slideRight : 0 }],
          }}
        >
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
              setSwitchForm(false);
              setInitialLoad(false);
            }}
            defaultValue={email}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text);
              setSwitchForm(false);
              setInitialLoad(false);
            }}
            defaultValue={password}
            secureTextEntry={true}
          />
          <View style={styles.btn}>
            <Button title="Log in" onPress={handleLogin} />
          </View>
          <TouchableOpacity
            style={styles.signup}
            activeOpacity={0.6}
            onPress={() => {
              setForm("signup");
              setSwitchForm(true);
              setInitialLoad(false);
            }}
          >
            <Text style={styles.signupText}>Don't have a login? Sign up</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Animated.View
          style={{
            alignItems: "center",
            transform: [{ translateX: switchForm ? slideLeft : 0 }],
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{ ...styles.TextInput, width: 140 }}
              placeholder="First Name"
              onChangeText={(text) => {
                setFirst(text);
                setSwitchForm(false);
                setInitialLoad(false);
              }}
              defaultValue={first}
            />
            <TextInput
              style={{ ...styles.TextInput, width: 140 }}
              placeholder="Last Name"
              onChangeText={(text) => {
                setLast(text);
                setSwitchForm(false);
                setInitialLoad(false);
              }}
              defaultValue={last}
            />
          </View>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
              setSwitchForm(false);
              setInitialLoad(false);
            }}
            defaultValue={email}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text);
              setSwitchForm(false);
              setInitialLoad(false);
            }}
            defaultValue={password}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Confirm Password"
            onChangeText={(text) => {
              setConfirmPassword(text);
              setSwitchForm(false);
              setInitialLoad(false);
            }}
            defaultValue={confirmPassword}
            secureTextEntry={true}
          />
          <View style={styles.btn}>
            <Button title="Sign up" onPress={handleSignup} />
          </View>
          <TouchableOpacity
            style={styles.signup}
            activeOpacity={0.6}
            onPress={() => {
              setForm("login");
              setSwitchForm(true);
              setPassword("");
              setConfirmPassword("");
            }}
          >
            <Text style={styles.signupText}>Already have a login? Log in</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  logo: {
    width: 300,
    alignSelf: "center",
  },
  appTitle: {
    position: "absolute",
    top: 250,
    alignSelf: "center",
    color: Theme.dark,
    fontSize: 30,
    fontWeight: "normal",
  },
  appTitle2: {
    fontSize: 40,
    // fontWeight: 'bold',
    color: Theme.dark,
  },
  TextInput: {
    color: Theme.dark,
    backgroundColor: Theme.light,
    height: 40,
    width: 300,
    margin: 10,
    padding: 10,
    elevation: 10,
  },
  btn: {
    margin: 40,
    width: 100,
    alignSelf: "center",
  },
  signup: {
    alignSelf: "center",
  },
  signupText: {
    color: Theme.accent,
  },
});
