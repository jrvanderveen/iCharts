// @flow
'use strict';

import React, { Component, PropTypes } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ChartInformation from '../components/ChartInformation';
import DropdownChartInformationContainer from './DropdownChartInformationContainer';
import { Colors } from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontStyles } from '../styles';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const emptyHeartIcon = 'ios-heart-outline';
const fullHeartIcon = 'ios-heart';

export default class ChartCell extends Component {
  static propTypes = {
      vfrChart: PropTypes.object.isRequired,
      onChartPressed: PropTypes.func.isRequired,
      onFavorited: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    // store heart color in state to toggle the color faster than waiting
    // for the re-render after the realm write
    this.state = {
      heartIcon: this.props.vfrChart.isFavorited ? fullHeartIcon : emptyHeartIcon,
      heartColor: this.props.vfrChart.isFavorited ? Colors.highlight : Colors.border,
      animatedIconSpringValue: new Animated.Value(1),
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.springHeart = this.springHeart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.vfrChart.regionId === this.props.vfrChart.regionId)
      return;

    this.setState({
      heartIcon: nextProps.vfrChart.isFavorited ? fullHeartIcon : emptyHeartIcon,
      heartColor: nextProps.vfrChart.isFavorited ? Colors.highlight : Colors.border,
    });
  }

  toggleExpanded() {
    if (!this.informationExpander)
      return;

    this.informationExpander.toggleExpanded();
  }

  springHeart() {
    this.setState({
      heartIcon: this.state.heartIcon === emptyHeartIcon ? fullHeartIcon : emptyHeartIcon,
      heartColor: this.state.heartColor === Colors.border ? Colors.highlight : Colors.border
    });

    this.state.animatedIconSpringValue.setValue(0.5);
    Animated.spring(
      this.state.animatedIconSpringValue,
      {
        toValue: 1,
        friction: 3,
      }
    ).start();
  }

  render() {
    const { vfrChart } = this.props;

    return (
      <View>
        <ChartInformation toggleExpanded={this.toggleExpanded} vfrChart={vfrChart}>
          {this._getIcons()}
        </ChartInformation>

        <DropdownChartInformationContainer
          ref={(informationExpander) => { this.informationExpander = informationExpander; }}
          vfrChart={vfrChart}
        />

        <View style={styles.border} />
      </View>
    );
  }

  _getIcons = () => {
    const { heartIcon, heartColor } = this.state;

    return (
      <View style={styles.iconsContainer}>
        <View style={styles.buttons}>
          <TouchableOpacity
            activeOpacity={1.0}
            style={styles.icon}
            onPress={this._heartPressed}>
            <AnimatedIcon
              style={{transform: [{scale: this.state.animatedIconSpringValue}]}}
              name={heartIcon}
              size={30}
              color={heartColor}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.icon}
            onPress={this._showChart}>
            <Icon name="ios-paper-plane-outline" size={30} color={Colors.border} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _heartPressed = () => {
    const { vfrChart, onFavorited } = this.props;
    this.springHeart();
    onFavorited(vfrChart);
  }

  _showChart = () => {
    const { vfrChart, onChartPressed } = this.props;
    onChartPressed(vfrChart)
  }
}

const styles = StyleSheet.create({
  border: {
    borderColor: 'transparent',
    borderBottomWidth: 4,
  },
  buttons: {
    width: 52,
  },
  icon: {
    height: 30,
    margin: 15,
    width: 30,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 28,
  }
});
