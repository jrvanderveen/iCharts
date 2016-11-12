// @flow
'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/Colors';

const MenuCell = (props) => {
  let cellSizeStyle = {
    paddingLeft: props.menuWidth * 0.25,
  }
  let touchStyle = {
    alignItems: 'center',
    borderColor: Colors.border,
    borderRadius: props.menuWidth / 4,
    borderWidth: 0.5,
    height: props.menuWidth / 2,
    justifyContent: 'center',
    width: props.menuWidth / 2,
  }

  return (
    <View style={[styles.default, cellSizeStyle]}>
      <TouchableHighlight style={touchStyle} onPress={() => props.onPress(props.scene)} underlayColor={Colors.primary}>
        <Icon style={{paddingTop: 3}} name={props.iconName} size={props.menuWidth / 4} color={Colors.border} />
      </TouchableHighlight>
    </View>
  );
}

MenuCell.propTypes = {
  iconName: PropTypes.string.isRequired,
  menuWidth: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  scene: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  default: {
    alignItems: 'flex-start',
    marginBottom: 15,
    marginTop: 15,
  },
});

export default MenuCell;
