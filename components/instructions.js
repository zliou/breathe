import * as React from 'react';
import { Text, View } from 'react-native';

import I18nLibrary from './i18n_library.js';

export default class Instructions extends React.Component {
  constructor(props) {
    super(props);
    let i18n = new I18nLibrary();
    let library = i18n.getLibrary();
    this.state = {
      currentInstruction: 0,
      hl: props.hl,
    };
    this.instructions = [
      library.inhale[props.hl],
      library.hold[props.hl],
      library.exhale[props.hl],
      library.hold[props.hl],
    ];
  }
  
  componentDidMount() {
    // This implementation is a hard-code of 4-second square breathing.
    this.timer = setInterval(() => {
      this.count();
    }, 4000);
  }
  
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  count() {
    this.setState({
      currentInstruction: (
          this.state.currentInstruction + 1) % this.instructions.length
    })
  }

  render() {
    return (
      <View>
        <Text>{this.instructions[this.state.currentInstruction]}</Text>
      </View>
    );
  } 
}
