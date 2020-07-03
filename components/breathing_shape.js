import * as React from 'react';
import { Animated, Button, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Modal from 'modal-enhanced-react-native-web';

import Count from './count.js';
import Instructions from './instructions.js';
import I18nLibrary from './i18n_library.js'; 

const INHALE_DURATION_MS = 4000;
const HOLD_IN_DURATION_MS = 4000;
const EXHALE_DURATION_MS = 4000;
const HOLD_OUT_DURATION_MS = 4000;

const INHALED_SIZE = 260;
const EXHALED_SIZE = 50;

export default class BreathingShape extends React.Component {
  state = {
    hl: "en",
    i18nModalVisible: false,
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
      duration: INHALE_DURATION_MS,
    }).start(this.holdInhaled);
  };
  shrink = () => {
    Animated.timing(this.state.resizeAnim, {
      toValue: EXHALED_SIZE,
      duration: EXHALE_DURATION_MS,
    }).start(this.holdExhaled);
  };
  holdExhaled = () => {
    Animated.timing(this.state.resizeAnim, {
      toValue: EXHALED_SIZE,
      duration: EXHALE_DURATION_MS,
    }).start(this.grow);
  };
  holdInhaled = () => {
    Animated.timing(this.state.resizeAnim, {
      toValue: INHALED_SIZE,
      duration: INHALE_DURATION_MS,
    }).start(this.shrink);
  };
  growNoDelay = () => {
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
          <View style={styles.languageButtonContainer}>
            <Button
                key={hl}
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
          <Instructions hl={this.state.hl}/>
          <Count/>
        </View>
        <View style={styles.buttonRow}>
          <Button
              accessibilityLabel="Select language"
              color="#eeeeee"
              onPress={this.toggleI18nModal}
              title=" &#127760;  "/>
        </View>
        <View>
          <Modal isVisible={this.state.i18nModalVisible}>
            <TouchableHighlight
                style={styles.closeI18nModal}
                onPress={this.toggleI18nModal}>
              <Text style={styles.closeI18nModalText}>✕</Text>
            </TouchableHighlight>
            {this.renderI18nButton()}
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  breathingSquare: {
    backgroundColor: "#86c06c",
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
  instructionsContainer: {
    padding: 15,
    alignItems: "center",
  },
  languageButtonContainer: {
    paddingTop: 10,
  },
});
