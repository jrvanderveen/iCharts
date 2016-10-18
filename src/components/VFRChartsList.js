// @flow
'use strict';

import React, { Component, PropTypes } from 'react';
import {
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
    onChartPress: PropTypes.func.isRequired,
    vfrChartsToShow: PropTypes.arrayOf(Object).isRequired
  }
  
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

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
    let vfrChartsToShow = this.props.vfrChartsToShow ? this.props.vfrChartsToShow : []; 
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.ds.cloneWithRows(vfrChartsToShow)}
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
