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
import Scenes from './Scenes';
import Colors from '../styles/Colors';

const index = 0;

class VFRChartsContainer extends Component {
  static propTypes = {
    vfrChartsToShow: PropTypes.arrayOf(Object).isRequired
  }
  
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.vfrChartsToShow),
    };

    this.listView = null;

    // bindings
    this.renderRow = this.renderRow.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
  }

  scrollTo(yValue: number) {
    if (this.listView !== null) {
      console.log("****************SCROLLING");
      this.listView.scrollTo({y: yValue, animation: false});
    }
  }

  renderRow(vfrChart: VFRChart) {
    index++;
    return (
      <View style={{height: 60}}>
        <Text>
          {index}
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
          ref={(ref) => {
            this.listView = ref;
          }}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    flex: 1
  }
});

export default VFRChartsContainer;
