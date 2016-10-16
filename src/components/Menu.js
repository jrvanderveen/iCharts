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
import MenuCell from './MenuCell';
import Scenes from '../containers/Scenes';

const Menu = (props) => {
  return (
    <View style={styles.menu}>
      <MenuCell
        onPress={props.onPress}
        scene={Scenes.HOME}
        menuWidth={props.menuWidth}
      />
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
    backgroundColor: Colors.highlight,
    paddingTop: 50
  },
});

export default Menu;
