'use strict';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ChartInformation from '../components/ChartInformation';
import DropdownChartInformationContainer from './DropdownChartInformationContainer';
import { fetchAndProcessTiles } from '../utility/StorageUtility';
import { Colors, FontStyles } from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import realm from '../model/realm';
import ServicesClient from '../api/ServicesClient';
import { Circle } from 'react-native-progress';

export default class DownloadChartCell extends Component {
  static propTypes = {
    vfrChart: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.isStillMounted = false;
    this.state = {
      hasDownloaded: false,
      isDownloading: false,
      downloadProgress: 0,
      indeterminate: true,
      error: null,
    };
  }

  componentDidMount() {
    this.isStillMounted = true;
  }

  componentWillUnmount() {
    this.isStillMounted = false;
  }

  render() {
    const { vfrChart } = this.props;

    return (
      <View>
        <ChartInformation style={{paddingRight: 20}} toggleExpanded={this._toggleExpanded} vfrChart={vfrChart}>
          {this._getIcon()}
        </ChartInformation>

        <DropdownChartInformationContainer
          ref={(informationExpander) => { this.informationExpander = informationExpander; }}
          vfrChart={vfrChart}
        />

        <View style={styles.border} />
      </View>
    );
  }

  _getIcon = () => {
    const { hasDownloaded, isDownloading, downloadProgress, indeterminate, error } = this.state;
    let icon;

    if (hasDownloaded) {
      icon = <Icon
        style={[styles.icon, {paddingTop: 2, paddingLeft: 6}]}
        name="ios-checkmark-circle-outline"
        size={40}
        color="green"
      />
    } else if (isDownloading) {
      icon = <Circle
        size={32}
        style={styles.icon}
        progress={downloadProgress}
        indeterminate={indeterminate}
      />;
    } else if (error) {
      icon = <TouchableOpacity
        activeOpacity={0.5}
        style={styles.icon}
        onPress={this._fetchAndProcessTiles}>
        <Icon
          style={{paddingTop: 5}}
          name="ios-warning-outline"
          size={40}
          color="red"
        />
      </TouchableOpacity>;
    } else {
      icon = <TouchableOpacity
        activeOpacity={0.5}
        style={styles.icon}
        onPress={this._fetchAndProcessTiles}>
        <Icon
          style={{paddingTop: 6}}
          name="ios-cloud-download-outline"
          size={40}
          color={Colors.border}
        />
      </TouchableOpacity>;
    }

    return icon;
  }

  _toggleExpanded = () => {
    if (!this.informationExpander)
      return;

    this.informationExpander.toggleExpanded();
  }

  _fetchAndProcessTiles = () => {
    const { vfrChart } = this.props;

    if (!vfrChart || !vfrChart.regionId)
      return;

    this.setState({
      isDownloading: true,
    });

    fetchAndProcessTiles(vfrChart.regionId, this._progressCallback).then((result) => {
      const successfullyDownloaded = !(result && result.error);

      if (this.isStillMounted) {
        this.setState({
          isDownloading: false,
          hasDownloaded: successfullyDownloaded,
          indeterminate: false,
          downloadProgress: 0,
          error: result && result.error,
        });
      }

      // add this vfr chart to the realm
      if (successfullyDownloaded) {
        realm.write(() => {
          const { expirationDate, publicationDate, ...rest } = vfrChart;
          
          realm.create('VFRChart', {
            ...rest,
            publicationDate: new Date(publicationDate),
            expirationDate: new Date(expirationDate),
            isFavorited: false,
          }, true);
        });
      }
    });
  }

  _progressCallback = (bytesWritten, contentLength) => {
    const percentage = bytesWritten / contentLength;

    if (this.isStillMounted) {
      this.setState({
        downloadProgress: percentage,
        indeterminate: percentage === 100,
      });
    }
  }
}

const styles = StyleSheet.create({
  border: {
    borderColor: Colors.primary,
    borderBottomWidth: 4,
  },
  icon: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 15,
    marginTop: 10,
    width: 44,
  },
});
