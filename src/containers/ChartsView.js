'use strict';

import React, { Component, PropTypes } from 'react';
import {
  ListView,
  StyleSheet,
  View
} from 'react-native';
import {Colors} from '../styles';
import FontStyles from '../styles/FontStyles';

export default class ChartsView extends Component {
  static propTypes = {
    chartsToShow: PropTypes.arrayOf(Object).isRequired,
    chartCellClass: PropTypes.func.isRequired,
    chartCellProps: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  renderRow = vfrChart => {
    const {chartCellClass, chartCellProps} = this.props;

    return React.createElement(
      chartCellClass,
      {vfrChart, ...chartCellProps},
      null
    );
  }

  render() {
    const { chartsToShow } = this.props;

    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.ds.cloneWithRows(chartsToShow)}
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
    justifyContent: 'center',
  }
});
