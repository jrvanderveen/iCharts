// @flow
'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Colors from '../styles/Colors';

const Settings = (props) => {
  return (
    <View style={styles.settings}>
      <Text>
        Settings!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  settings: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    flex: 1
  },
});

export default Settings;
