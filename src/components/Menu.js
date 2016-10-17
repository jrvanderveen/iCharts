// @flow
'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Border from './Border';
import MenuCell from './MenuCell';
import Scenes from '../containers/Scenes';
import Colors from '../styles/Colors';

const Menu = (props) => {
  var borderStyle = {
    alignItems: 'flex-start',
    height: 0.5,
    marginLeft: 10,
    width: props.menuWidth - 20,
  };

  return (
    <View style={styles.menu}>
      <MenuCell
        onPress={props.onPress}
        scene={Scenes.HOME}
        menuWidth={props.menuWidth}
      />
      <View style={{alignItems: 'flex-start'}}>
        <Border style={borderStyle} />
      </View>
      <MenuCell
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
