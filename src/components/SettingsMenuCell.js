'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Colors, FontStyles } from '../styles';

const SettingsMenuCell = (props) => {
  const disabled = props.disabled || false;
  return (
    <TouchableHighlight
      disabled={disabled}
      style={[styles.textHighlight, {opacity: disabled ? 0.5 : 1}]}
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
  navigateToSettingsView: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  textHighlight: {
    alignItems: 'center',
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
