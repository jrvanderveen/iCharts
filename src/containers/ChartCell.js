// @flow
'use strict';

import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../styles/Colors';
import FontStyles from '../styles/FontStyles';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const dateStringCutoffIndex = 15;

export default class ChartCell extends Component {
  constructor(props) {
    super(props);

    this.isExpanded = false;
    this.expandedBodyHeight = 0;
    this.state = {
      animatedHeight: new Animated.Value(0),
      animatedIconSpringValue: new Animated.Value(1),
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.springHeart = this.springHeart.bind(this);
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
        duration: 250,
        easing: Easing.ease,
      }
    ).start();
  }

  springHeart() {
    this.state.animatedIconSpringValue.setValue(0.5);
    Animated.spring(
      this.state.animatedIconSpringValue,
      {
        toValue: 1,
        friction: 5,
      }
    ).start();
  }

  render() {
    let favIcon = this.props.vfrChart.isFavorited ? 'ios-heart' : 'ios-heart-outline';
    let heartColor = this.props.vfrChart.isFavorited ? Colors.highlight : Colors.border;

    return (
      <View style={{overflow: 'hidden'}}>
        <View style={styles.inputsContainer}>
          <View style={styles.vfrText}>
            <TouchableHighlight onPress={this.toggleExpanded} underlayColor={Colors.primary}>
              <Text style={FontStyles.thin}>
                {this.props.vfrChart.regionId}
                {"\n"}
                {this.props.vfrChart.regionName}
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              underlayColor={Colors.primary}
              style={styles.icon}
              onPress={() => {
                this.props.onFavorited(this.props.vfrChart);
                this.springHeart();
              }}>
              <AnimatedIcon
                style={{paddingTop: 3, transform: [{scale: this.state.animatedIconSpringValue}]}}
                name={favIcon}
                size={18}
                color={heartColor}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              underlayColor={Colors.primary}
              style={styles.icon}
              onPress={() => this.props.onChartPressed(this.props.vfrChart)}>
              <Icon style={{paddingTop: 3}} name="ios-arrow-forward" size={20} color={Colors.border} />
            </TouchableHighlight>
          </View>
        </View>

        <Animated.View
          style={{
            height: this.state.animatedHeight,
          }}>
          <View
            style={styles.informationContainer}
            onLayout={(event) => this.expandedBodyHeight = event.nativeEvent.layout.height}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.informationContent, FontStyles.subHeader]}>
                Publication Date:
              </Text>
              <Text style={FontStyles.thin}>
                {this.props.vfrChart.publicationDate.toString().slice(0, dateStringCutoffIndex)}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.informationContent, FontStyles.subHeader]}>
                Expiration Date:
              </Text>
              <Text style={FontStyles.thin}>
                {this.props.vfrChart.expirationDate.toString().slice(0, dateStringCutoffIndex)}
              </Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.border} />
      </View>
    );
  }
}

ChartCell.propTypes = {
    vfrChart: PropTypes.object.isRequired,
    onChartPressed: PropTypes.func.isRequired,
    onFavorited: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  inputsContainer:{
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    alignItems: 'center',
  },
  border: {
    borderColor: '#D3D3D3',
    borderBottomWidth: 0.5,
  },
  informationContainer: {
    backgroundColor: Colors.secondary,
    paddingBottom: 10,
  },
  informationContent: {
    marginLeft: 10,
    marginRight: 10,
  },
  vfrText: {
    flex: 1,
    paddingTop: 10,
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
});
