import * as React from 'react';
import { Text, View } from 'react-native';

import I18nLibrary from './i18n_library.js';

export default class Instructions extends React.Component {
  constructor(props) {
    super(props);
    let i18n = new I18nLibrary();
    this.library = i18n.getLibrary();
    this.state = {
      currentInstruction: 0,
      instructions: [
        this.library.inhale[props.hl],
        this.library.hold[props.hl],
        this.library.exhale[props.hl],
        this.library.hold[props.hl],
      ],
    };
  }
  
  componentDidMount() {
    // This implementation is a hard-code of 4-second square breathing.
    this.timer = setInterval(() => {
      this.count();
      console.log(Date.now() + " instruction change");
    }, 4004);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.hl != this.props.hl) {
      this.updateLanguage(nextProps.hl);
    }
  }

  updateLanguage = (hl) => {
    this.setState({
      instructions: [
        this.library.inhale[hl],
        this.library.hold[hl],
        this.library.exhale[hl],
        this.library.hold[hl],
      ],
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
        <Text>{this.state.instructions[this.state.currentInstruction]}</Text>
      </View>
    );
  } 
}
