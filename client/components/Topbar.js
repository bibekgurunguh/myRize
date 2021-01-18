import React, { useState } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';

import Colors from '../constants/colors';

let alreadyInvoked = false;

export default function Topbar(props) {

  const USER = props.user;

  const rotateLeft = new Animated.Value(0);
  Animated.spring(
    rotateLeft,
    {toValue: -1.55,
    useNativeDriver: true}
  ).start();
  const rotateRight = new Animated.Value(-1.55);
  Animated.spring(
    rotateRight,
    {toValue: 0,
    useNativeDriver: true}
  ).start();

  let rotateAnim;
  if (props.qsInvoked) {
    rotateAnim = rotateLeft;
    alreadyInvoked = true;
  } else if (alreadyInvoked) {
    rotateAnim = rotateRight;
    alreadyInvoked = false;
  } else {
    rotateAnim = '0deg';
  }

  return (
    <View style={styles.topbar}>
      <View><Text style={styles.title}>{USER.first} {USER.last}</Text></View>
      <TouchableOpacity
        style={styles.tripleDot}
        onPress={props.toggleQuickSettings}
      >
        <Animated.View style={{transform: [{rotate: rotateAnim}]}}>
          <Text style={styles.tripleDotText}>&#8942;</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    backgroundColor: Colors.default.primary,
    height: 100,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  title: {
    paddingBottom: 10,
    color: Colors.default.dark,
    fontSize: 25,
    fontWeight: 'bold',
  },
  tripleDot: {
    textAlign: 'center',
    width: 30,
  },
  tripleDotText: {
    color: Colors.default.dark,
    paddingBottom: 10,
    color: Colors.default.dark,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
