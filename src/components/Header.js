// @flow
'use strict';

import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Border from './Border';
import Colors from '../styles/Colors';
import FontStyles from '../styles/FontStyles';

const headerBorderMarginLeftRight = 5;

class Header extends Component {
  static propTypes = {
    height: PropTypes.number,
    hideHeader: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(this.props.height || 65), // the header height
    };

    this.animateOpen = this.animateOpen.bind(this);
    this.animateClosed = this.animateClosed.bind(this);
  }

  animateOpen() {
    requestAnimationFrame(() =>
      Animated.timing(
        this.state.animatedValue,
        {
          duration: 250,
          toValue: this.props.height || 65,
        }
      ).start());
  }

  animateClosed() {
    requestAnimationFrame(() => {
      Animated.timing(
        this.state.animatedValue,
        {
          duration: 250,
          toValue: 0,
        }
      ).start();
    });
  }

  render() {
    const screenWidth = Dimensions.get('window').width;
    const borderWidth = {
      width: screenWidth - headerBorderMarginLeftRight * 2
    };

    if (this.props.hideHeader)
      this.animateClosed();
    else
      this.animateOpen();

    return (
      <Animated.View style={{height: this.state.animatedValue}}>
        <View style={styles.header}>
          <TouchableHighlight
            underlayColor={Colors.primary}
            style={styles.icon}
            onPress={() => this.props.onPress()}>
            <Icon style={{paddingTop: 3}} name="ios-list-outline" size={20} color={Colors.border}/>
          </TouchableHighlight>
          <View style={styles.title}>
            <Text style={FontStyles.title}>
              {this.props.title}
            </Text>
          </View>
        </View>
        <Border style={[styles.border, borderWidth]}/>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  border: {
    height: 1,
    marginLeft: headerBorderMarginLeftRight,
    marginTop: -1,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: 15,
    borderWidth: 0.5,
    height: 30,
    justifyContent: 'center',
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 24,
    width: 30,
  },
  title: {
    alignItems: 'center',
    flex: 1,
    paddingRight: 60,
    paddingTop: 8,
  },
});

export default Header;
