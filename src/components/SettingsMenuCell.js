'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import Colors from '../styles/Colors';

const SettingsMenuCell = (props) => {
  return (
    <TouchableHighlight
      style={styles.textHighlight}
      onPress={props.navigateToSettingsView}
      underlayColor={Colors.primary}>
      <Text style={[FontStyles.settingsItem, styles.text]}>
        {props.buttonText}
      </Text>
    </TouchableHighlight>
  );
};

SettingsMenuCell.propTypes = {
  buttonText: PropTypes.string.isRequired,
  navigateToSettingsView: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  textHighlight: {
    borderRadius: 10,
    height: 100,
    justifyContent: 'center',
  },
  text: {
    paddingLeft: 8
  }
});

export default SettingsMenuCell;
