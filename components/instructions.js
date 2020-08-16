import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import I18nLibrary from './i18n_library.js';

export default class Instructions extends React.Component {
  constructor(props) {
    super(props);
    let i18n = new I18nLibrary();
    this.library = i18n.getLibrary();
    this.state = {
      instruction: this.library[props.instruction][props.hl],
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.hl != this.props.hl ||
        nextProps.instruction != this.props.instruction) {
      this.updateInstruction(nextProps.instruction, nextProps.hl);
    }
  }

  updateInstruction = (instruction, hl) => {
    this.setState({
      instruction: this.library[instruction][hl],
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  count() {
    this.setState({
      currentInstruction: (
          this.state.currentInstruction + 1) % this.state.instructions.length
    })
  }

  render() {
    return (
      <View>
        <Text style={styles.instructionText}>{this.state.instruction}</Text>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  instructionText: {
    color: "white",
  },
});
