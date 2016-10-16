// @flow
'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Colors from '../styles/Colors';
import FontStyles from '../styles/FontStyles';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TouchableHighlight
        underlayColor='transparent'
        style={{justifyContent: 'center', alignItems: 'center',}}
        onPress={() => props.onPress()}>
        <Text style={FontStyles.title}>
          {props.title}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    height: 50
  },
  hamburgerButton: {

  },
});

export default Header;
