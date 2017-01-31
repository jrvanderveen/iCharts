// @flow
'use strict';

import React, { Component, PropTypes } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Colors from '../styles/Colors';
import FontStyles from '../styles/FontStyles';
import ChartCell from '../containers/ChartCell'

class VFRChartsList extends Component {
  static propTypes = {
    onChartPressed: PropTypes.func.isRequired,
    onFavorited: PropTypes.func.isRequired,
    vfrChartsToShow: PropTypes.arrayOf(Object).isRequired,
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    // bindings
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(vfrChart) {
      return(
        <View>
            <ChartCell
                vfrChart={vfrChart}
                onChartPressed={this.props.onChartPressed}
                onFavorited={this.props.onFavorited}
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
    backgroundColor: Colors.primary,
    justifyContent: 'center',
  }
});

export default VFRChartsList;
