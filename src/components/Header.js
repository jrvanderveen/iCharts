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

const Header = (props) => {
  return (
    <View style={[styles.header, {height: props.headerHeight}]}>
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

Header.propTypes = {
  headerHeight: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  hamburgerButton: {

  },
});

export default Header;
