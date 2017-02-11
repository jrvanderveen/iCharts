'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors } from '../styles';

const SettingsBackButton = (props) => {
  return (
    <TouchableOpacity style={styles.backButton} onPress={props.onPress}>
      <Text>
        Back
      </Text>
    </TouchableOpacity>
  );
}

SettingsBackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    height: 32,
    justifyContent:'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 6,
    marginBottom: 4,
    paddingLeft: 20,
  },
});

export default SettingsBackButton;
