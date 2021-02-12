import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
} from "react-native";

import Colors from "../constants/colors";
import CircularProgress from "../components/CircularProgress";
import { IP_ADDRESS, PORT } from "../config";
import { Icons } from "../constants/images";

const BASE_URL = `http://${IP_ADDRESS}:${PORT}`;

let Theme = Colors.default;

export default function Home(props) {
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext({
    duration: 400,
    update: { type: "spring", springDamping: 1.5 },
  });

  const [USER, setUSER] = useState(props.user);
  const [anim, setAnim] = useState(600);
  const resolutions = props.resolutions;

  useEffect(() => {
    if (USER._id) getUser();
    setAnim(0);
  }, []);

  async function getUser() {
    await fetch(`${BASE_URL}/getuser/${props.user._id}`)
      .then((res) => res.json())
      .then((data) => setUSER(data));
  }

  return (
    <ScrollView style={{ ...styles.container, top: anim }}>
      {USER.my_resolutions && USER.my_resolutions.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.label}>My Resolutions</Text>
          <View style={styles.contents}>
            {resolutions
              .filter((el) =>
                USER.my_resolutions
                  .map((el) => el.resolution)
                  .includes(el.image_ref)
              )
              .map((el, index) => {
                let progressCalculated = Math.ceil(
                  (USER.my_resolutions.filter(
                    (item) => item.resolution === el.image_ref
                  )[0].completedSteps.length *
                    100) /
                    el.steps.length
                );
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                    onPress={() => {
                      props.chooseRes(el.image_ref);
                      props.goResolution();
                    }}
                  >
                    <View
                      style={{ ...styles.activeIcon, borderColor: el.color }}
                    >
                      <Image
                        style={styles.icon}
                        source={Icons[el.image_ref]}
                        tintColor={el.color}
                      />
                      <View style={styles.circularProgress}>
                        <CircularProgress
                          color={el.color}
                          progress={progressCalculated}
                          screenChange={props.screenChange}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      )}

      <View style={[styles.card, { marginBottom: 25 }]}>
        <Text style={styles.label}>Explore</Text>
        <View style={styles.contents}>
          {resolutions
            .filter((el) =>
              USER.my_resolutions && USER.my_resolutions.length > 0
                ? !USER.my_resolutions
                    .map((el) => el.resolution)
                    .includes(el.image_ref)
                : true
            )
            .map((el, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  onPress={() => {
                    props.chooseRes(el.image_ref);
                    props.goResolution();
                  }}
                >
                  <Image
                    style={styles.icon}
                    source={Icons[el.image_ref]}
                    tintColor={Colors.default.accent}
                  />
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: Theme.light,
    padding: 10,
    margin: 25,
    marginBottom: 0,
    borderRadius: 20,
    elevation: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.dark,
    paddingLeft: 20,
    paddingTop: 10,
  },
  contents: {
    flexDirection: "row",
    flexWrap: "wrap",
    elevation: 6,
  },
  icon: {
    margin: 15,
  },
  circularProgress: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  activeIcon: {},
});
