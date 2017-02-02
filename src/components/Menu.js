// @flow
'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Border from './Border';
import MenuCell from './MenuCell';
import Scenes from '../constants/Scenes';
import {Colors} from '../styles';

const Menu = ({currentRoute, menuWidth, onPress}) => {
  var borderStyle = {
    height: 0.5,
    marginLeft: 10,
    width: menuWidth - 20,
  };

  const menuBorder = <Border style={borderStyle} />

  return (
    <View style={styles.menu}>
      <MenuCell
        currentRoute={currentRoute}
        iconName="ios-home-outline"
        onPress={onPress}
        goToScene={Scenes.HOME}
        menuWidth={menuWidth}
      />
      {menuBorder}
      <MenuCell
        currentRoute={currentRoute}
        iconName="ios-heart-outline"
        onPress={onPress}
        goToScene={Scenes.FAVORITES}
        menuWidth={menuWidth}
      />
      {menuBorder}
      <MenuCell
        currentRoute={currentRoute}
        iconName="ios-settings-outline"
        onPress={onPress}
        goToScene={Scenes.SETTINGS}
        menuWidth={menuWidth}
      />
    </View>
  );
}

Menu.propTypes = {
  currentRoute: PropTypes.string.isRequired,
  menuWidth: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingTop: 50
  },
});

export default Menu;
