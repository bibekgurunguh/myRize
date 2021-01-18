import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function CircularProgress(props) {
  const size = 80;

  let progressAnim;
  if (props.screenChange) {
    progressAnim = new Animated.Value(200);
    Animated.spring(
      progressAnim,
      {
        toValue: 200 - (props.progress * 2),
        useNativeDriver: true,
        friction: 8,
        tension: 10,
        delay: 600,
      },
    ).start();
  } else {
    progressAnim = 200 - (props.progress * 2);
  }

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  return (
    <View style={styles.circles}>
      <Svg width={size} height={size}>
        <Circle
          cx={size/2}
          cy={size/2}
          r={30}
          stroke={props.color}
          strokeWidth={5}
          opacity={0.3}
        />
        <AnimatedCircle
          cx={size/2}
          cy={size/2}
          r={30}
          stroke={props.color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="200"
          strokeDashoffset={progressAnim}
        />
        
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  circles: {
    transform: [{rotate: "-90deg"}]
  }
})
