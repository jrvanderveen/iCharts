// @flow
'use strict';

import React, { PropTypes } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Border from './Border';
import Colors from '../styles/Colors';
import FontStyles from '../styles/FontStyles';

const screenWidth = Dimensions.get('window').width;

const Header = (props) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableHighlight
          underlayColor='transparent'
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() => props.onPress()}>
          <Text style={FontStyles.title}>
            {props.title}
          </Text>
        </TouchableHighlight>
      </View>
      <Border style={styles.border} />
    </View>
  );
}

Header.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    height: 50,
    justifyContent: 'center',
    paddingTop: 12,
  },
  border: {
    height: 1,
    marginTop: -1,
    width: screenWidth - 10,
  },
});

export default Header;
