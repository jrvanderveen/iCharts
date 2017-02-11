'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors } from '../styles';

const NoChartsWarningMessage = ({onPress, message, buttonPrompt}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.frown}>
        :(
      </Text>
      <Text>
        {message}
      </Text>
      {
        buttonPrompt ?
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>
            {buttonPrompt}
          </Text>
        </TouchableOpacity>
        : null
      }
    </View>
  );
}

NoChartsWarningMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonPrompt: PropTypes.string,
};

const styles = StyleSheet.create({
  button: {
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    flex: 1,
    justifyContent: 'center',
  },
  frown: {
    fontSize: 96,
    paddingBottom: 20,
  }
});

export default NoChartsWarningMessage;
