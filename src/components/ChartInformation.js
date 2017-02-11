'use strict';

import React, { PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors, FontStyles } from '../styles';

const ChartInformation = (props) => {
  const {vfrChart, toggleExpanded, children, style} = props;

  return (
    <View style={[style, styles.inputsContainer]}>
      <View style={styles.vfrText}>
        <TouchableOpacity onPress={toggleExpanded} activeOpacity={0.5}>
          <View style={styles.borderShadow}>
            <View style={styles.regionIdContainer}>
              <Text style={[FontStyles.regionId]}>
                {vfrChart.regionName}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

ChartInformation.propTypes = {
  toggleExpanded: PropTypes.func.isRequired,
  vfrChart: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  regionIdContainer: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 0,
    justifyContent: 'center',
    padding: 10,
  },
  borderShadow: {
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: Colors.border,
        shadowOffset: {width: 0.5, height: 1},
        shadowRadius: 2,
        shadowOpacity: 0.4,
      },
      android: {
        borderColor: Colors.border + '2f',
        borderBottomWidth: 3,
        borderLeftWidth: 1,
        borderRightWidth: 2,
        borderTopWidth: 1,
      },
    }),
  },
  inputsContainer:{
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    alignItems: 'center',
  },
  vfrText: {
    flex: 1,
  },
});

export default ChartInformation;
