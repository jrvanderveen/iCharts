'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Colors from '../styles/Colors';

const NoChartsWarningMessage = (props) => {
  return (
    <View style={styles.container}>
      <Text>
        It looks like you don't have any charts yet.
      </Text>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Text>
          Find some...
        </Text>
      </TouchableOpacity>
    </View>
  );
}

NoChartsWarningMessage.propTypes = {
  onPress: PropTypes.func.isRequired,
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
});

export default NoChartsWarningMessage;
