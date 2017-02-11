'use strict';

import React, { Component, PropTypes } from 'react';
import {
  ActivityIndicator,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors } from '../styles';
import ChartsView from './ChartsView';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsBackButton from '../components/SettingsBackButton';

export default class SettingsChartsViewWrapper extends Component {
  static propTypes = {
    chartCellClass: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
    chartCellProps: PropTypes.object,
    errorMessage: PropTypes.string,
    modelsToShow: PropTypes.array,
    showIsWorkingIndicator: PropTypes.bool,
  };

  static defaultProps = {
    modelsToShow: [],
    showIsWorkingIndicator: false,
  };

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  render() {
    const { chartCellProps, chartCellClass, modelsToShow, errorMessage, showIsWorkingIndicator } = this.props;

    console.log("chart cell props", chartCellProps, chartCellClass)

    return (
      <View style={{flex: 1, backgroundColor: Colors.primary}}>
        <SettingsBackButton onPress={() => this.props.navigator.pop()} />
        <View style={styles.listView}>
          {errorMessage ?
            this._renderErrorMessage(errorMessage) :
          showIsWorkingIndicator && modelsToShow.length === 0 ?
            <ActivityIndicator
              style={{flex: 1, backgroundColor: Colors.secondary }}
              size="small"
            /> :
            <ChartsView
              chartsToShow={modelsToShow}
              chartCellClass={chartCellClass}
              chartCellProps={chartCellProps}
            />
          }
        </View>
      </View>
    );
  }

  _renderErrorMessage = message => {
    return (
      <View style={styles.centered}>
        <Icon
          style={{paddingTop: 5}}
          name="ios-warning-outline"
          size={60}
          color="red"
        />
        <Text>
          {message}
        </Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
  },
  listView: {
    flex: 1,
    justifyContent: 'center',
  },
});
