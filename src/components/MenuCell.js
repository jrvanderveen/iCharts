// @flow
'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Colors from '../styles/Colors';
import FontStyles from '../styles/FontStyles';

const MenuCell = (props) => {
  let cellSizeStyle = {
    paddingLeft: props.menuWidth * 0.1,
    paddingRight: props.menuWidth * 0.2,
    width: props.menuWidth
  } 
  return (
    <View style={[styles.default, cellSizeStyle]}>
      <TouchableHighlight onPress={() => props.onPress(props.scene)} underlayColor='transparent'>
        <Text style={FontStyles.text}>
          This will be a really cool menu icon!
        </Text>
      </TouchableHighlight>
    </View>
  );
}

MenuCell.propTypes = {
  menuWidth: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  scene: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  default: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
});

export default MenuCell;
