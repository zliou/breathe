import * as React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { Count } from './count.js';
import { Instructions } from './instructions.js';

export default function BreathingShape() {
  let INHALE_DURATION_MS = 4000;
  let HOLD_IN_DURATION_MS = 4000;
  let EXHALE_DURATION_MS = 4000;
  let HOLD_OUT_DURATION_MS = 4000;

  let INHALED_SIZE = 240;
  let EXHALED_SIZE = 50;

  const resizeAnim = React.useRef(new Animated.Value(EXHALED_SIZE)).current;
  const grow = () => {
    Animated.timing(resizeAnim, {
      toValue: INHALED_SIZE,
      delay: HOLD_OUT_DURATION_MS,
      duration: INHALE_DURATION_MS,
    }).start(shrink);
  };
  const shrink = () => {
    Animated.timing(resizeAnim, {
      toValue: EXHALED_SIZE,
      delay: HOLD_IN_DURATION_MS,
      duration: EXHALE_DURATION_MS,
    }).start(grow);
  };
  const growNoDelay = () => {
    Animated.timing(resizeAnim, {
      toValue: INHALED_SIZE,
      duration: INHALE_DURATION_MS,
    }).start(shrink);
  };

  const countAnim = React.useRef(new Animated.Value(0)).current;
  const count = () => {
    Animated.timing(countAnim, {
      toValue: 4,
      duration: INHALE_DURATION_MS,
    }).start(count);
  };

  // Start the animation.
  growNoDelay();

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Animated.View
          style={[
            styles.breathingSquare, {
              height: resizeAnim,
              width: resizeAnim,
            }
          ]}
        >
        </Animated.View>
      </View>
      <View style={styles.instructionsContainer}>
        <Instructions hl='zh'/>
        <Count/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    backgroundColor: '#333333',
    borderRadius: 180,
    height: 360,
    justifyContent: "center",
    width: 360,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  breathingSquare: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "powderblue",
    justifyContent: "center",
  },
  breatheText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructionsContainer: {
    padding: 15,
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16
  },
});
