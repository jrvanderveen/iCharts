'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors, FontStyles, RegionIdColors } from '../styles';

const ChartInformation = (props) => {
  const {vfrChart, toggleExpanded, children, style} = props;

  const colorIndex = (vfrChart.regionId.toLowerCase().charCodeAt(0) - 97) % RegionIdColors.length;

  return (
    <View style={[style, styles.inputsContainer]}>
      <View style={styles.vfrText}>
        <TouchableOpacity onPress={toggleExpanded} activeOpacity={0.5}>
          <View style={[styles.regionIdContainer, {borderColor: RegionIdColors[colorIndex]}]}>
            <Text style={[FontStyles.regionId, {color: RegionIdColors[colorIndex]}]}>
              {vfrChart.regionName}
            </Text>
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
  regionIdContainer:{
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    padding: 10,
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
