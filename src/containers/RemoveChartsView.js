'use strict';

import React, { Component, PropTypes } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import RemoveChartCell from './RemoveChartCell';
import Icon from 'react-native-vector-icons/Ionicons';
import realm from '../model/realm';
import { sortModelsByRegionId, removeTiles } from '../utility';
import SettingsBackButton from '../components/SettingsBackButton';

export default class RemoveChartsView extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this._savedVfrCharts = realm.objects('VFRChart');
  }

  render() {
    const { navigator } = this.props;

    const chartsArray = Array.from(this._savedVfrCharts).sort(sortModelsByRegionId);

    return (
      <View style={{flex: 1, backgroundColor: Colors.secondary}}>
        <SettingsBackButton onPress={() => navigator.pop()} />
        <View style={styles.listView}>
          <ListView
            enableEmptySections={true}
            dataSource={this.ds.cloneWithRows(chartsArray)}
            renderRow={(vfrChartModel) => {
              return (
                <RemoveChartCell
                  doRemoveTiles={this.doRemoveTiles}
                  vfrChart={vfrChartModel}
                />
              );
            }}
          />
        </View>
      </View>
    );
  }

  doRemoveTiles = (vfrChart) => {
    if (!vfrChart)
      return;

    realm.write(() => {
      removeTiles(vfrChart.regionId);
      realm.delete(vfrChart);
      this.forceUpdate();
    });
  };
}

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    justifyContent: 'center',
  },
});
