import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";

import CollapsibleStep from "./CollapsibleStep";
import Colors from "../constants/colors";
import { IP_ADDRESS, PORT } from "../config";
import { Backdrops } from "../constants/images";

const BASE_URL = `http://${IP_ADDRESS}:${PORT}`;
let Theme = Colors.default;

export default function Resolution(props) {
  const [USER, setUSER] = useState(props.user);
  const resolutions = props.resolutions;
  const [added, setAdded] = useState(false);

  const [nextStep, setNextStep] = useState(
    USER.my_resolutions && added
      ? USER.my_resolutions.filter((el) => el.resolution === props.chosenRes)[0]
          .completedSteps.length + 1
      : 1
  );

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    await fetch(`${BASE_URL}/getuser/${props.user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setUSER(data);
        setNextStep(
          data.my_resolutions.filter(
            (el) => el.resolution === props.chosenRes
          )[0].completedSteps.length + 1
        );
      })
      .catch((err) => {});
  }

  function addRes() {
    const newRes = {
      resolution: props.chosenRes,
      completedSteps: [],
    };
    return fetch(`${BASE_URL}/addres`, {
      method: "PUT",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newRes, userId: USER._id }),
    }).then(() => {
      USER.my_resolutions.push(newRes);
      getUser();
      setAdded(true);
    });
  }

  const rollUp = new Animated.Value(400);
  Animated.spring(rollUp, { toValue: 0, useNativeDriver: true }).start();

  const [rollAnim, setRollAnim] = useState(rollUp);

  return (
    <Animated.ScrollView
      style={{ ...styles.container, transform: [{ translateY: rollAnim }] }}
    >
      {USER.my_resolutions &&
        resolutions
          .filter((el) => el.image_ref === props.chosenRes)
          .map((el, index) => {
            return (
              <View key={index}>
                <View
                  style={[
                    styles.topCard,
                    { paddingBottom: el.my_resolutions ? 20 : 0 },
                  ]}
                >
                  <Image
                    style={styles.backdrop}
                    source={Backdrops[el.image_ref]}
                    resizeMethod="resize"
                  />
                  <Text style={styles.title}>{el.title}</Text>
                  <Text style={styles.overview}>{el.overview}</Text>
                  {USER.my_resolutions
                    .map((el) => el.resolution)
                    .includes(el.image_ref) &&
                    el.steps.map((step) => {
                      return (
                        <CollapsibleStep
                          key={step.id}
                          stepId={step.id}
                          title={step.label}
                          content={step.description}
                          userId={USER._id}
                          notes={USER.notes}
                          my_resolutions={USER.my_resolutions}
                          screenChange={props.screenChange}
                          chosenRes={props.chosenRes}
                          user={USER}
                          nextStep={nextStep}
                          setNextStep={setNextStep}
                        />
                      );
                    })}
                </View>
                {!USER.my_resolutions
                  .map((el) => el.resolution)
                  .includes(el.image_ref) &&
                  !added && (
                    <TouchableOpacity style={styles.startBtn} onPress={addRes}>
                      <Text style={styles.startBtnText}>+</Text>
                    </TouchableOpacity>
                  )}
              </View>
            );
          })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topCard: {
    backgroundColor: Theme.light,
    padding: 0,
    margin: 25,
    borderRadius: 20,
    elevation: 6,
  },
  title: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "bold",
    color: Theme.dark,
    paddingLeft: 20,
    paddingTop: 10,
    textShadowColor: Theme.light,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.dark,
    paddingLeft: 20,
    padding: 10,
  },
  backdrop: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
  overview: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 30,
    color: Theme.dark,
  },
  startBtn: {
    position: "relative",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 - 25 }],
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Theme.accent,
    elevation: 7,
  },
  startBtnText: {
    fontSize: 50,
    color: Theme.light,
  },
  step: {
    flexDirection: "row",
    padding: 25,
    alignItems: "center",
  },
  stepNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: Theme.light,
  },
  stepDescriptionCard: {
    backgroundColor: Theme.dark,
    borderRadius: 20,
    width: "80%",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  stepDescription: {
    padding: 20,
    color: Theme.light,
  },
});
