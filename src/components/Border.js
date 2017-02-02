// @flow
'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Colors} from '../styles';

const Border = (props) => {
  return (
    <View style={[styles.border, props.style]} />
  );
}

const styles = StyleSheet.create({
  border: {
    alignItems: 'flex-start',
    backgroundColor: Colors.border,
    height: 1,
  },
});

export default Border;
