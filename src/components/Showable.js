import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ReactTransitionGroup from 'react-addons-transition-group';

const styles = StyleSheet.create({
	backdrop: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		alignItems: 'center',
		justifyContent: 'center'
	},
	box: {
		width: 200,
		height: 200,
		backgroundColor: 'blue',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		color: 'white',
		fontWeight: '600',
		fontSize: 21
	}
});

class Showable extends Component {
	constructor() {
		super();
		this.state = { animation: new Animated.Value(0) };
	}

	componentDidMount() {
		console.log('[Showable#componentDidMount]');
		Animated.spring(this.state.animation, {
			toValue: 1
		}).start();
	}

	componentWillLeave(cb) {
		console.log('[Showable#componentWillLeave]');
		Animated.timing(this.state.animation, {
			toValue: 0,
			duration: 1000
		}).start(cb);
	}

	render() {
		const opacity = this.state.animation;
		const translateY = this.state.animation.interpolate({
			inputRange: [0, 1],
			outputRange: [Dimensions.get('window').height + 200, 0]
		});
		const transform = [{ translateY }];

		return (
			<Animated.View style={[styles.backdrop, { opacity }]} pointerEvents='box-none'>
				<Animated.View style={[styles.box, { transform }]}>
					<TouchableOpacity onPress={this.props.onClose}>
						<Text style={styles.text}>Close</Text>
					</TouchableOpacity>
				</Animated.View>
			</Animated.View>
		);
	}
}

const FullView = (props) => (
	<View
		{...props}
		pointerEvents='box-none'
		style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
	/>
);

export default class TransitionedShowable extends Component {
	render() {
		console.log('[TransitionedShowable] props: ', this.props);
		return (
			<ReactTransitionGroup component={FullView}>
				{this.props.show && <Showable {...this.props}/>}
			</ReactTransitionGroup>
		);
	}
}
