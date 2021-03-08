import * as React from 'react';
import * as Linking from 'expo-linking';
import { Animated, Button, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import Count from './count.js';
import Instructions from './instructions.js';
import I18nLibrary from './i18n_library.js'; 

import * as theme from '../theme.js';

const INHALE_DURATION_MS = 4000;
const HOLD_IN_DURATION_MS = 4000;
const EXHALE_DURATION_MS = 4000;
const HOLD_OUT_DURATION_MS = 4000;

const INHALED_SIZE = 260;
const EXHALED_SIZE = 50;

const COLOR_RED = "#b00020";
const COLOR_YELLOW = "#fbc02d";
const COLOR_GREEN = "#86c06c";
const COLOR_BLUE = "#039be5";
const COLOR_PURPLE = "#9575cd";
const COLOR_LIGHT_RED = "#ffcdd2";
const COLOR_LIGHT_YELLOW = "#fff9c4";
const COLOR_LIGHT_GREEN = "#dcedc8";
const COLOR_LIGHT_BLUE = "#bbdefb";
const COLOR_LIGHT_PURPLE = "#d1c4e9";

export default class BreathingShape extends React.Component {
  state = {
    i18nModalVisible: false,
    resizeAnim: new Animated.Value(EXHALED_SIZE),
    rotation: new Animated.Value(0),

    // Default settings below.
    hl: "en",
    theme: "dark",
    color: COLOR_GREEN,
  }

  constructor() {
    super();
    // Start the animation.
    this.growNoDelay();
  }

  grow = () => {
    this.setState({instruction: "inhale"});
    Animated.timing(this.state.resizeAnim, {
      toValue: INHALED_SIZE,
      duration: INHALE_DURATION_MS,
    }).start(this.holdInhaled);
  };
  shrink = () => {
    this.setState({instruction: "exhale"});
    Animated.timing(this.state.resizeAnim, {
      toValue: EXHALED_SIZE,
      duration: EXHALE_DURATION_MS,
    }).start(this.holdExhaled);
  };
  holdExhaled = () => {
    this.setState({instruction: "hold"});
    Animated.timing(this.state.rotation, {
      toValue: 0,
      duration: EXHALE_DURATION_MS,
    }).start(this.grow);
  };
  holdInhaled = () => {
    this.setState({instruction: "hold"});
    Animated.timing(this.state.rotation, {
      toValue: 1,
      duration: EXHALE_DURATION_MS,
    }).start(this.shrink);
  };
  growNoDelay = () => {
    this.state.instruction = "inhale";
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
                color={this.state.color}
                title={hl_map[hl]}
                onPress={() => this.setLanguage(hl)}/>
          </View>
        );
    });

    return (
      <View>{ buttons }</View>
    );
  }

  openDonateLink = () => {
    Linking.openURL("https://www.paypal.com/donate?business=W5ENGU2EYTHU6&item_name=Thanks+for+checking+out+my+breathing+app%21+If+you+find+it+useful%2C+please+consider+a+small+donation+%3A%29&currency_code=USD");
  }

  toggleTheme = () => {
    if (this.state.theme == "dark") {
      this.setState({ theme: "light" });
    } else {  // Default to dark theme.
      this.setState({ theme: "dark" });
    }
  }
  
  changeColor = (newColor) => {
    this.setState({ color: newColor });
  }

  render() {
    const spin = this.state.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg']
    });
    return (
      <View style={theme.setBackground(this.state.theme)}>
        <View style={theme.setCircle(this.state.theme)}>
          <Animated.View
            style={[
              styles.breathingSquare, {
                backgroundColor: this.state.color,
              }, {
                height: this.state.resizeAnim,
                width: this.state.resizeAnim,
                transform: [{ rotate: spin }],
              }
            ]}
          >
          </Animated.View>
        </View>
        <View style={styles.instructionsContainer}>
          <Instructions
              hl={this.state.hl}
              instruction={this.state.instruction}
              textColor={theme.setInstructionsTextColor(this.state.theme)}/>
        </View>
        <View style={styles.buttonRow}>
          <TouchableHighlight
              accessibilityLabel="Settings"
              style={[styles.settingsButton, {
                  backgroundColor: this.state.theme == "dark" ? "#333333" : "#eeeeee",
              }]}
              onPress={this.toggleI18nModal}>
              <Text>&#8942;</Text>
          </TouchableHighlight>
        </View>
        { this.state.i18nModalVisible &&
          <View style={styles.i18nModal}>
            <TouchableHighlight
                style={styles.closeI18nModal}
                onPress={this.toggleI18nModal}>
              <Text style={styles.closeI18nModalText}>✕</Text>
            </TouchableHighlight>
            <View style={styles.colorSelector}>
              <View style={styles.colorButtonRow}>
                <TouchableHighlight
                    onPress={() => this.changeColor(COLOR_RED)}
                    style={[styles.colorSelectButton, styles.red]}>
                  <View/>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.changeColor(COLOR_YELLOW)}
                    style={[styles.colorSelectButton, styles.yellow]}>
                  <View/>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.changeColor(COLOR_GREEN)}
                    style={[styles.colorSelectButton, styles.green]}>
                  <View/>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.changeColor(COLOR_BLUE)}
                    style={[styles.colorSelectButton, styles.blue]}>
                  <View/>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.changeColor(COLOR_PURPLE)}
                    style={[styles.colorSelectButton, styles.purple]}>
                  <View/>
                </TouchableHighlight>
              </View>
              <View style={styles.colorButtonRow}>
                <TouchableHighlight
                    onPress={() => this.changeColor(COLOR_LIGHT_RED)}
                    style={[styles.colorSelectButton, styles.lightRed]}>
                  <View/>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.changeColor(COLOR_LIGHT_YELLOW)}
                    style={[styles.colorSelectButton, styles.lightYellow]}>
                  <View/>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.changeColor(COLOR_LIGHT_GREEN)}
                    style={[styles.colorSelectButton, styles.lightGreen]}>
                  <View/>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.changeColor(COLOR_LIGHT_BLUE)}
                    style={[styles.colorSelectButton, styles.lightBlue]}>
                  <View/>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => this.changeColor(COLOR_LIGHT_PURPLE)}
                    style={[styles.colorSelectButton, styles.lightPurple]}>
                  <View/>
                </TouchableHighlight>
              </View>
            </View>
            <View style={styles.buttonColumnContainer}>
              <Button
                  accessibilityLabel="Update color theme"
                  color={this.state.theme == "dark" ? "#222222" : "#eeeeee"}
                  onPress={this.toggleTheme}
                  title="&#9728;&#65039;  / &#127769;"/>
              {this.renderI18nButton()}
            </View>
            <TouchableHighlight
                style={styles.donateButton}
                onPress={this.openDonateLink}>
              <Text>❤️</Text>
            </TouchableHighlight>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  breathingSquare: {
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
  buttonColumnContainer: {
    width: 274,
  },
  buttonRow: {
    flexDirection: "row",
    paddingTop: 50,
  },
  closeI18nModal: {
    height: 30,
    width: 30,
  },
  closeI18nModalText: {
    color: "white",
    fontSize: 30,
  },
  colorButtonRow: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  colorSelectButton: {
    borderRadius: 5,
    margin: 3,
    height: 50,
    width: 50,
  },
  colorSelector: {
    marginVertical: 5,
  },
  red: {
    backgroundColor: COLOR_RED,
  },
  yellow: {
    backgroundColor: COLOR_YELLOW,
  },
  green: {
    backgroundColor: COLOR_GREEN,
  },
  blue: {
    backgroundColor: COLOR_BLUE,
  },
  purple: {
    backgroundColor: COLOR_PURPLE,
  },
  lightRed: {
    backgroundColor: COLOR_LIGHT_RED,
  },
  lightYellow: {
    backgroundColor: COLOR_LIGHT_YELLOW,
  },
  lightGreen: {
    backgroundColor: COLOR_LIGHT_GREEN,
  },
  lightBlue: {
    backgroundColor: COLOR_LIGHT_BLUE,
  },
  lightPurple: {
    backgroundColor: COLOR_LIGHT_PURPLE,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#121212",
  },
  donateButton: {
    height: 20,
    marginTop: 15,
    width: 20,
  },
  i18nModal: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
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
  settingsButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    height: 36,
    width: 36,
  },
});
