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
import Icon from 'react-native-vector-icons/Ionicons';
import Border from './Border';
import Colors from '../styles/Colors';
import FontStyles from '../styles/FontStyles';

const Header = (props) => {
  const screenWidth = Dimensions.get('window').width;
  var borderWidth = {
    width: screenWidth - 10
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableHighlight
          underlayColor={Colors.primary}
          style={styles.icon}
          onPress={() => props.onPress()}>
          <Icon style={{paddingTop: 3}} name="ios-list-outline" size={20} color={Colors.border} />
        </TouchableHighlight>
        <View style={styles.title}>
          <Text style={FontStyles.title}>
            {props.title}
          </Text>
        </View>
      </View>
      <Border style={[styles.border, borderWidth]} />
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
    flexDirection: 'row',
    height: 65,
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  border: {
    height: 1,
    marginTop: -1,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: 15,
    borderWidth: 0.5,
    height: 30,
    justifyContent: 'center',
    margin: 15,
    width: 30,
  },
  title: {
    alignItems: 'center',
    flex: 1,
    paddingRight: 60
  }
});

export default Header;
