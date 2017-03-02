import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
	TouchableOpacity,
  View
} from 'react-native';
import Showable from './Showable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default class App extends Component {
	constructor() {
		super();
		this.state = { show: false };
	}

	toggle = () => this.setState(({ show }) => ({ show: !show }));

  render() {
    return (
      <View style={styles.container}>
				<TouchableOpacity onPress={this.toggle}>
					<Text style={styles.label}>
						Open
					</Text>
				</TouchableOpacity>
				<Showable show={this.state.show} onClose={this.toggle}/>
      </View>
    );
  }
}

