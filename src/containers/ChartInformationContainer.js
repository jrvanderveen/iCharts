'use strict';

import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import { dateStringCutoffIndex } from '../constants';
import { FontStyles } from '../styles';

export default class ChartInformationContainer extends Component {
  static propTypes = {
    vfrChart: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.isExpanded = false;
    this.expandedBodyHeight = 0;

    this.state = {
      animatedHeight: new Animated.Value(0),
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded() {
    let initialValue = this.isExpanded ? this.expandedBodyHeight : 0;
    let finalValue = this.isExpanded ? 0 : this.expandedBodyHeight;

    this.isExpanded = !this.isExpanded;

    this.state.animatedHeight.setValue(initialValue);
    Animated.timing(
      this.state.animatedHeight,
      {
        toValue: finalValue,
        duration: 150,
        easing: Easing.ease,
      }
    ).start();
  }

  render() {
    const { vfrChart } = this.props;
    const { animatedHeight } = this.state;

    return (
      <Animated.View
        style={{
          overflow: 'scroll',
          height: animatedHeight,
        }}>
        <View
          style={styles.informationContainer}
          onLayout={(event) => this.expandedBodyHeight = event.nativeEvent.layout.height}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.informationContent, FontStyles.subHeader]}>
              Publication Date:
            </Text>
            <Text style={FontStyles.thin}>
              {vfrChart.publicationDate.toString().slice(0, dateStringCutoffIndex)}
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.informationContent, FontStyles.subHeader]}>
              Expiration Date:
            </Text>
            <Text style={FontStyles.thin}>
              {vfrChart.expirationDate.toString().slice(0, dateStringCutoffIndex)}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  informationContainer: {
    backgroundColor: Colors.secondary,
    paddingBottom: 10,
  },
  informationContent: {
    marginLeft: 10,
    marginRight: 10,
  },
});
