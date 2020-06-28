import * as React from 'react';
import { Animated, Button, StyleSheet, Text, View } from 'react-native';

import Count from './count.js';
import Instructions from './instructions.js';

const INHALE_DURATION_MS = 4000;
const HOLD_IN_DURATION_MS = 4000;
const EXHALE_DURATION_MS = 4000;
const HOLD_OUT_DURATION_MS = 4000;

const INHALED_SIZE = 240;
const EXHALED_SIZE = 50;

export default class BreathingShape extends React.Component {
  state = {
    resizeAnim: new Animated.Value(EXHALED_SIZE),
    countAnim: new Animated.Value(0),
  }

  constructor() {
    super();
    // Start the animation.
    this.growNoDelay();
  }

  grow = () => {
    Animated.timing(this.state.resizeAnim, {
      toValue: INHALED_SIZE,
      delay: HOLD_OUT_DURATION_MS,
      duration: INHALE_DURATION_MS,
    }).start(this.shrink);
  };
  shrink = () => {
    Animated.timing(this.state.resizeAnim, {
      toValue: EXHALED_SIZE,
      delay: HOLD_IN_DURATION_MS,
      duration: EXHALE_DURATION_MS,
    }).start(this.grow);
  };
  growNoDelay = () => {
    Animated.timing(this.state.resizeAnim, {
      toValue: INHALED_SIZE,
      duration: INHALE_DURATION_MS,
    }).start(this.shrink);
  };

  count = () => {
    Animated.timing(this.state.countAnim, {
      toValue: 4,
      duration: INHALE_DURATION_MS,
    }).start(this.count);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.circle}>
          <Animated.View
            style={[
              styles.breathingSquare, {
                height: this.state.resizeAnim,
                width: this.state.resizeAnim,
              }
            ]}
          >
          </Animated.View>
        </View>
        <View style={styles.instructionsContainer}>
          <Instructions hl='zh'/>
          <Count/>
        </View>
        <View style={styles.buttonRow}>
          <Button
              accessibilityLabel="Select language"
              color="#eeeeee"
              title=" &#127760; "/>
        </View>
      </View>
    );
  }
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
    paddingTop: 50,
  },
});
