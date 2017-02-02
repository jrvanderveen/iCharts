'use strict';

import React, { Component, PropTypes } from 'react';
import {
  Alert,
  Animated,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ChartInformationContainer from './ChartInformationContainer';
import { FontStyles } from '../styles';
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
        <View style={styles.inputsContainer}>
          <View style={styles.vfrText}>
            <TouchableOpacity onPress={this._toggleExpanded} activeOpacity={0.5}>
              <Text style={FontStyles.thin}>
                {vfrChart.regionId}
                {"\n"}
                {vfrChart.regionName}
              </Text>
            </TouchableOpacity>
          </View>
          {this._getIcon()}
        </View>

        <ChartInformationContainer
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
              duration: 400,
            }
          ).start(() => doRemoveTiles(vfrChart));
        }},
      ]
    );
  };
}

const styles = StyleSheet.create({
  inputsContainer:{
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: 'center',
  },
  border: {
    borderColor: '#D3D3D3',
    borderBottomWidth: 0.5,
  },
  vfrText: {
    flex: 1,
  },
  icon: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 10,
    marginTop: 10,
    width: 44,
  },
});
