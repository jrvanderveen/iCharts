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
import Colors from '../styles/Colors';

const Menu = (props) => {
  var borderStyle = {
    alignItems: 'flex-start',
    height: 0.5,
    marginLeft: 10,
    width: props.menuWidth - 20,
  };

  const menuBorder =
    <View style={{alignItems: "flex-start"}}>
      <Border style={borderStyle} />
    </View>

  return (
    <View style={styles.menu}>
      <MenuCell
        iconName="ios-home-outline"
        onPress={props.onPress}
        scene={Scenes.HOME}
        menuWidth={props.menuWidth}
      />
      {menuBorder}
      <MenuCell
        iconName="ios-heart-outline"
        onPress={props.onPress}
        scene={Scenes.FAVORITES}
        menuWidth={props.menuWidth}
      />
      {menuBorder}
      <MenuCell
        iconName="ios-settings-outline"
        onPress={props.onPress}
        scene={Scenes.SETTINGS}
        menuWidth={props.menuWidth}
      />
    </View>
  );
}

Menu.propTypes = {
  onPress: PropTypes.func.isRequired,
  menuWidth: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingTop: 50
  },
});

export default Menu;
