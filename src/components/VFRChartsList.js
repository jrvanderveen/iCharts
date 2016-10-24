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
import ChartCell from './ChartCell'

class VFRChartsList extends Component {
  static propTypes = {
    onChartPress: PropTypes.func.isRequired,
    onViewPress: PropTypes.func.isRequired,
    vfrChartsToShow: PropTypes.arrayOf(Object).isRequired,
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    // bindings
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(vfrChart: VFRChart) {
      return(
        <View>
            <ChartCell
                vfrChart={vfrChart}
                onChartPress={this.props.onChartPress}
                onViewPress={this.props.onViewPress}
            />
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
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'green',
    justifyContent: 'center',
  }
});

export default VFRChartsList;
