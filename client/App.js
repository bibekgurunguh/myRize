import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

import Colors from "./constants/colors";
const Theme = Colors.default;
import Topbar from "./components/Topbar";
import Bottombar from "./components/Bottombar";
import QuickSettings from "./components/QuickSettings";
import Dashboard from "./components/Dashboard";
import LoginScreen from "./components/loginScreen";
import { IP_ADDRESS, PORT } from "./config";

const BASE_URL = `http://${IP_ADDRESS}:${PORT}`;

export default function App() {
  const [quickSettings, setQuickSettings] = useState(false);
  const [screen, setScreen] = useState("");
  const [screenChange, setScreenChange] = useState(false);
  const [logged, setLogged] = useState(false);
  const [userId, setUserId] = useState();
  const [user, setUser] = useState({});
  const [resolutions, setResolutions] = useState([]);

  useEffect(() => {
    getAllRes();
    if (user._id) getUser();
  }, []);

  function getAllRes() {
    return fetch(`${BASE_URL}/allresolutions`)
      .then((res) => res.json())
      .then((data) => {
        setResolutions(data);
      });
  }

  async function getUser() {
    await fetch(`${BASE_URL}/getuser/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }

  function toggleQuickSettings() {
    setQuickSettings(!quickSettings);
    setScreenChange(false); //To prevent screen change animation when quick settings is invoked
  }

  return (
    <View style={styles.wrapper}>
      {!logged ? (
        <View style={styles.LoginScreen}>
          <LoginScreen
            logIn={() => setLogged(true)}
            setUser={setUser}
            setUserId={setUserId}
            getAllRes={getAllRes}
            setScreen={setScreen}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Topbar
            user={user}
            qsInvoked={quickSettings}
            toggleQuickSettings={toggleQuickSettings}
          />

          <View style={styles.dashboard}>
            <Dashboard
              user={user}
              resolutions={resolutions}
              setUser={setUser}
              screen={screen}
              screenChange={screenChange}
              goResolution={() => {
                setScreen("resolution");
                setScreenChange(true);
              }}
            />
          </View>

          <View style={styles.bottombar}>
            <Bottombar
              screen={screen}
              goHome={() => {
                if (screen !== "home") {
                  setScreen("home");
                  setScreenChange(true);
                }
              }}
              goNotifications={() => {
                if (screen !== "notifications") {
                  setScreen("notifications");
                }
              }}
              goProgress={() => {
                if (screen !== "progress") {
                  setScreen("progress");
                }
              }}
              goProfile={() => {
                if (screen !== "profile") {
                  setScreen("profile");
                }
              }}
            />
          </View>

          {
            // Inactive area when quick settings is invoked // dismisses the quick settings if pressed
            quickSettings && (
              <>
                <TouchableWithoutFeedback onPress={toggleQuickSettings}>
                  <View style={styles.dismissArea}></View>
                </TouchableWithoutFeedback>
                <View style={styles.quickSettings}>
                  <QuickSettings
                    user={user}
                    invoked={quickSettings}
                    toggleQuickSettings={toggleQuickSettings}
                    goSettings={() => {
                      if (screen !== "settings") {
                        setScreen("settings");
                      }
                    }}
                    screenChange={() => setScreenChange(true)}
                    setScreen={setScreen}
                    logOut={() => {
                      setLogged(false);
                      setScreen("home");
                    }}
                  />
                </View>
              </>
            )
          }

          <StatusBar style="auto" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  LoginScreen: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: Theme.primary,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.default.primary,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  quickSettings: {
    position: "absolute",
    top: 110,
    right: 10,
    // zIndex: 1,
    elevation: 16,
  },
  dashboard: {
    flex: 1,
    width: "100%",
    // height: '78%',
  },
  bottombar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  dismissArea: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0)",
    elevation: 15,
  },
});
