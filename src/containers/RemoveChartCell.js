'use strict';

import React, { Component, PropTypes } from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ChartInformation from '../components/ChartInformation';
import DropdownChartInformationContainer from './DropdownChartInformationContainer';
import { Colors, FontStyles } from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';

export default class RemoveChartCell extends Component {
  static propTypes = {
    doRemoveTiles: PropTypes.func.isRequired,
    vfrChart: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      animatedScale: new Animated.Value(1),
    };
  }

  componentWillReceiveProps() {
    this.state.animatedScale.setValue(1);
  }

  render() {
    const { animatedScale } = this.state;
    const { vfrChart } = this.props;

    return (
      <Animated.View style={{transform: [{scale: animatedScale}]}}>
        <ChartInformation style={{paddingRight: 25}} toggleExpanded={this._toggleExpanded} vfrChart={vfrChart}>
          {this._getIcon()}
        </ChartInformation>

        <DropdownChartInformationContainer
          ref={(informationExpander) => { this.informationExpander = informationExpander; }}
          vfrChart={vfrChart}
        />

        <View style={styles.border} />
      </Animated.View>
    );
  }

  _getIcon() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.icon}
        onPress={this._removeChart}>
        <Icon
          style={{paddingTop: 6}}
          name="ios-close-circle-outline"
          size={40}
          color={Colors.border}
        />
      </TouchableOpacity>
    );
  }

  _toggleExpanded = () => {
    if (!this.informationExpander)
      return;

    this.informationExpander.toggleExpanded();
  };

  _removeChart = () => {
    const { animatedScale } = this.state;
    const { vfrChart, doRemoveTiles } = this.props;

    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to remove ${vfrChart.regionName}?`,
      [
        {text: 'Cancel'},
        {text: 'OK', onPress: () => {
          Animated.timing(
            animatedScale,
            {
              toValue: 0,
              duration: 300,
            }
          ).start(() => doRemoveTiles(vfrChart));
        }},
      ]
    );
  };
}

const styles = StyleSheet.create({
  border: {
    borderColor: Colors.primary,
    borderBottomWidth: 4,
  },
  icon: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 25,
    marginTop: 10,
    width: 44,
  },
});
