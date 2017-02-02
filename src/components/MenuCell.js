// @flow
'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../styles';

const MenuCell = ({currentRoute, iconName, menuWidth, onPress, goToScene}) => {
  const widthToAdd = currentRoute === goToScene ? 2 : 2;
  const cellSizeStyle = {
    borderColor: currentRoute === goToScene ? Colors.menuCellBorder : Colors.secondary,
    borderRadius: menuWidth,
    borderWidth: 2,
    height: menuWidth / 2 + 8,
    justifyContent: 'center',
    padding: 2,
    marginLeft: menuWidth * 0.25,
    width: menuWidth / 2 + 8,
  };
  const touchStyle = {
    alignItems: 'center',
    borderColor: Colors.border,
    borderRadius: menuWidth / 4,
    borderWidth: 0.5,
    height: menuWidth / 2,
    justifyContent: 'center',
    width: menuWidth / 2,
  };

  return (
    <View style={[styles.default, cellSizeStyle]}>
      <TouchableHighlight style={touchStyle} onPress={() => onPress(goToScene)} underlayColor={Colors.primary}>
        <Icon style={{paddingTop: 3}} name={iconName} size={menuWidth / 4} color={Colors.border} />
      </TouchableHighlight>
    </View>
  );
}

MenuCell.propTypes = {
  currentRoute: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  menuWidth: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  goToScene: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  default: {
    alignItems: 'flex-start',
    marginBottom: 15,
    marginTop: 15,
  },
});

export default MenuCell;
