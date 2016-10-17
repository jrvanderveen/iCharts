// @flow
'use strict';

import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import VFRChart from '../model/VFRChart';
import Scenes from '../containers/Scenes';
import Colors from '../styles/Colors';
import FontStyles from '../styles/FontStyles';

class VFRChartsList extends Component {
  static propTypes = {
    vfrChartsToShow: PropTypes.object.isRequired
  }
  
  constructor(props) {
    super(props);

    // bindings
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(vfrChart: VFRChart) {
    return (
      <View style={{height: 60, paddingTop: 10}}>
        <Text style={FontStyles.thin}>
          {vfrChart.regionId}
          {vfrChart.regionName}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.props.vfrChartsToShow}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    flex: 1,
    justifyContent: 'center',
  }
});

export default VFRChartsList;
