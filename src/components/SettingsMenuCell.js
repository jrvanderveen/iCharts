'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Colors } from '../styles';

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
    borderColor: Colors.border,
    borderRadius: 10,
    borderWidth: 1,
    height: 100,
    justifyContent: 'center',
    marginBottom: 10,
  },
  text: {
    paddingLeft: 8
  }
});

export default SettingsMenuCell;
