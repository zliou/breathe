import * as React from 'react';
import { Animated, Button, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import Count from './count.js';
import Instructions from './instructions.js';
import I18nLibrary from './i18n_library.js'; 

const INHALE_DURATION_MS = 4000;
const HOLD_IN_DURATION_MS = 4000;
const EXHALE_DURATION_MS = 4000;
const HOLD_OUT_DURATION_MS = 4000;

const INHALED_SIZE = 260;
const EXHALED_SIZE = 50;

const THEME_COLOR_PRIMARY_HEX = "#86c06c";

export default class BreathingShape extends React.Component {
  state = {
    hl: "en",
    i18nModalVisible: false,
    resizeAnim: new Animated.Value(EXHALED_SIZE),
    rotation: new Animated.Value(0),
  }

  constructor() {
    super();
    // Start the animation.
    this.growNoDelay();
  }

  grow = () => {
    this.setState({instruction: "Inhale"});
    Animated.timing(this.state.resizeAnim, {
      toValue: INHALED_SIZE,
      duration: INHALE_DURATION_MS,
    }).start(this.holdInhaled);
  };
  shrink = () => {
    this.setState({instruction: "Exhale"});
    Animated.timing(this.state.resizeAnim, {
      toValue: EXHALED_SIZE,
      duration: EXHALE_DURATION_MS,
    }).start(this.holdExhaled);
  };
  holdExhaled = () => {
    this.setState({instruction: "Hold (out)"});
    Animated.timing(this.state.rotation, {
      toValue: 0,
      duration: EXHALE_DURATION_MS,
    }).start(this.grow);
  };
  holdInhaled = () => {
    this.setState({instruction: "Hold (in)"});
    Animated.timing(this.state.rotation, {
      toValue: 1,
      duration: EXHALE_DURATION_MS,
    }).start(this.shrink);
  };
  growNoDelay = () => {
    this.state.instruction = "Inhale";
    Animated.timing(this.state.resizeAnim, {
      toValue: INHALED_SIZE,
      duration: INHALE_DURATION_MS,
    }).start(this.holdInhaled);
  };

  toggleI18nModal= () => {
    this.setState({ i18nModalVisible: !this.state.i18nModalVisible});
  }

  setLanguage = (lang) => {
    this.setState({
      hl: lang,
    });
    this.toggleI18nModal();
  }

  renderI18nButton = () => {
    let i18n_library = new I18nLibrary().getLibrary();
    let hl_map = i18n_library.hlToLanguage;
    let buttons = Object.keys(hl_map).map((hl) => {
        return (
          <View key={hl} style={styles.languageButtonContainer}>
            <Button
                key={hl_map[hl]}
                color={THEME_COLOR_PRIMARY_HEX}
                title={hl_map[hl]}
                onPress={() => this.setLanguage(hl)}/>
          </View>
        );
    });

    return (
      <View>{ buttons }</View>
    );
  }

  render() {
    const spin = this.state.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg']
    });
    return (
      <View style={styles.container}>
        <View style={styles.circle}>
          <Animated.View
            style={[
              styles.breathingSquare, {
                height: this.state.resizeAnim,
                width: this.state.resizeAnim,
                transform: [{ rotate: spin }],
              }
            ]}
          >
          </Animated.View>
        </View>
        <View style={styles.instructionsContainer}>
          <Instructions hl={this.state.hl}/>
          <Count/>
          <Text>{this.state.instruction}</Text>
        </View>
        <View style={styles.buttonRow}>
          <Button
              accessibilityLabel="Select language"
              color="#eeeeee"
              onPress={this.toggleI18nModal}
              title=" &#127760;  "/>
        </View>
        { this.state.i18nModalVisible &&
          <View style={styles.i18nModal}>
            <TouchableHighlight
                style={styles.closeI18nModal}
                onPress={this.toggleI18nModal}>
              <Text style={styles.closeI18nModalText}>✕</Text>
            </TouchableHighlight>
            {this.renderI18nButton()}
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  breathingSquare: {
    backgroundColor: THEME_COLOR_PRIMARY_HEX,
    borderRadius: 15,
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  breatheText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  buttonRow: {
    flexDirection: "row",
    paddingTop: 50,
  },
  circle: {
    alignItems: "center",
    backgroundColor: 'black',
    borderRadius: 180,
    height: 360,
    justifyContent: "center",
    width: 360,
  },
  closeI18nModal: {
    height: 30,
    width: 30,
  },
  closeI18nModalText: {
    color: "white",
    fontSize: 30,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  i18nModal: {
    ...StyleSheet.absoluteFillObject,
    top: 100,
    left: 0,
    right: 0,
    bottom: 'auto',
    padding: 10,
    paddingBottom: 40,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  instructionsContainer: {
    padding: 15,
    alignItems: "center",
  },
  languageButtonContainer: {
    paddingTop: 10,
  },
});
