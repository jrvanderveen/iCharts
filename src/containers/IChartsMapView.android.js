// @flow
import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  requireNativeComponent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import TileView from 'react-native-tileview';

class IChartsMapView extends Component {
  static propTypes = {
    onAction: PropTypes.func.isRequired,
    regionId: PropTypes.string.isRequired,
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <TileView displayTiles = {this.props.regionId} />

        <TouchableOpacity
          style={[styles.topTouchBar, {width: Dimensions.get('window').width}]}
          onPress={() => this.props.onAction()}
        />
      </View>
    );
  }
}

IChartsMapView.propTypes = {
  regionId: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  topTouchBar: {
    height: 60,
    position: 'absolute',
    top: 0,
  }
});

export default IChartsMapView;
