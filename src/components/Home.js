// @flow
'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Colors from '../styles/Colors';

const Home = (props) => {
  return (
    <View style={styles.default}>
      <Text>
        Home!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  default: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    flex: 1
  },
});

export default Home;
