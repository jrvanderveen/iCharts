// @flow
'use strict';

import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class SideMenu extends Component {
  static propTypes = {
    headerComponent: PropTypes.element.isRequired,
    headerHeight: PropTypes.number.isRequired,
    height: PropTypes.number,
    menu: PropTypes.element,
    menuWidth: PropTypes.number.isRequired,
    menuOpenBuffer: PropTypes.number.isRequired,
    openMenu: PropTypes.bool,
    respondOnStart: PropTypes.bool.isRequired,
    useLinearGradient: PropTypes.bool,
    width: PropTypes.number,
  }
  
  constructor(props) {
    super(props);

    // bindings
    this._menuIsOpenToThreshold = this._menuIsOpenToThreshold.bind(this);
    this._openOrCloseMenu = this._openOrCloseMenu.bind(this);
    this._absoluteXValueOfCurrentSceneDuringPan = this._absoluteXValueOfCurrentSceneDuringPan.bind(this);
    this._touchIsOnHeader = this._touchIsOnHeader.bind(this);

    // State not used in render method
    this._isMenuOpen = false;

    this.state = {
      pan: new Animated.ValueXY(),
      panResponder: PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => {
          console.log("***********************WE GOT A TOUCH ON START!", this.props.respondOnStart);
          return this.props.respondOnStart ? this.props.respondOnStart : false;
        },
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          console.log("***********************WE GOT A TOUCH ON MOVE!", gestureState.dx, gestureState.dy);
          return this._isMenuOpen || (gestureState.dx != 0 && gestureState.dy != 0 && gestureState.dx > gestureState.dy);
        },
        onPanResponderGrant: this._handlePanResponderGrant.bind(this),
        onPanResponderMove: this._handlePanResponderMove.bind(this),
        onPanResponderRelease: this._handlePanResponderEnd.bind(this),
        onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
      })
    };
  }

  componentWillReceiveProps(nextProps: object) {
    this._openOrCloseMenu(nextProps.openMenu)
  }

  render() {
    let menuStyle = {
      position: 'absolute',
      width: this.props.width ? this.props.width : screenWidth,
      height: this.props.height ? this.props.height : screenHeight,
    };

    return (
      <View>
        <View style={menuStyle}>
          {this.props.menu}
        </View>
        <Animated.View
          {...this.state.panResponder.panHandlers}
          style={[this.state.pan.getLayout(), menuStyle]}>
          <View style={this.props.useLinearGradient ? styles.sceneContainer : [styles.sceneContainer, {marginLeft: 0}]}>
              {this.props.useLinearGradient ?
                <LinearGradient
                  start={[0.0, 0.0]} end={[1.0, 0.0]}
                  colors={['transparent', 'rgba(0, 0, 0, 0.3)']}
                  style={styles.linearGradient}
                />
                : <View />}
              <View style={{flex: 1}}>
                {this.props.headerComponent}
                {this.props.children}
              </View>
          </View>
        </Animated.View>
      </View>
    )
  }

  _handlePanResponderGrant(e: Object, gestureState: Object) {
    // set the offset to be 0 or the menu width, and reset the values to 0 to avoid a jump
    // before the binding with gestureState.dx takes over and resets the x value
    this.state.pan.setOffset({x: this.state.pan.x._value, y: 0});
    this.state.pan.setValue({x: 0, y: 0});
  }

  _handlePanResponderMove(e: Object, gestureState: Object) {
    // update pan.x unless pan goes off left of screen. Then set pan to be the very left 
    if (this._absoluteXValueOfCurrentSceneDuringPan(gestureState.dx) >= 0)
      this.state.pan.setValue({x: gestureState.dx, y: 0});
    else
      this.state.pan.setValue({x: this._isMenuOpen ? -this.props.menuWidth : 0, y: 0});
  }

  _handlePanResponderEnd(e: Object, gestureState: Object) {
    // Set x value to be absolute position because the animation is from an offset of 0,
    // and currently the offset may be the menuWidth
    if (this._isMenuOpen)
      this.state.pan.setValue({x: this.props.menuWidth + this.state.pan.x._value, y: 0});

    // reset the offset to 0 because we are manually setting the x value to be absolute
    let shouldMenuOpen = this._menuIsOpenToThreshold(gestureState.dx);
    this._openOrCloseMenu(shouldMenuOpen);
  }

  _openOrCloseMenu(openMenu: bool) {
    let toValue = openMenu ? {x: this.props.menuWidth, y: 0} : {x: 0, y: 0};
    this.state.pan.setOffset({x: 0});
    Animated.spring(
      this.state.pan,
      {
        toValue: toValue
      }
    ).start();

    this._isMenuOpen = openMenu;
  }

  _menuIsOpenToThreshold(xPosition: number) {
    // this.props.menuOpenBuffer defines a buffer to the left of the menuWidth in which to snap the menu open
    let menuOpenBuffer = this.props.menuOpenBuffer ? this.props.menuOpenBuffer : 0;
    return this._isMenuOpen
      ? xPosition >= -menuOpenBuffer
      : xPosition >= this.props.menuWidth - menuOpenBuffer;
  }

  _absoluteXValueOfCurrentSceneDuringPan(xPosition: number) {
    return !this._isMenuOpen
      ? xPosition
      : this.props.menuWidth + xPosition;
  }

  _touchIsOnHeader(gestureState: object) {
    console.log("***********************CHECKING WHERE THE TOUCH IS: ", gestureState.moveX, gestureState.moveY, gestureState.dx, gestureState.dy)
    return gestureState.y0 < this.props.headerHeight;
  }
}

const styles = StyleSheet.create({
  sceneContainer: {
    flex: 1,
    marginLeft: -15,
    flexDirection: 'row'
  },
  linearGradient: {
    width: 15
  }
});

export default SideMenu;
