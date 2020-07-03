import * as React from 'react';
import { Text, View } from 'react-native';

export default class Count extends React.Component {
  constructor() {
    super();

    this.state = { count: 1 };
    this._maxCount = 4;
  }
  
  componentDidMount() {
    this.timer = setInterval(() => {
      this.count();
    }, 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  count() {
    this.setState({
      count: ++this.state.count
    })
    if (this.state.count > this._maxCount) {
      this.setState({
        count: 1
      })
    } 
  }

  render() {
    return (
      <View>
        <Text>{this.state.count}</Text>
      </View>
    );
  } 
}
