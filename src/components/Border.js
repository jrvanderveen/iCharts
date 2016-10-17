// @flow
'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Colors from '../styles/Colors';

const Border = (props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.border, props.style]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  border: {
    alignItems: 'center',
    backgroundColor: Colors.border,
    height: 1,
  },
});

export default Border;
