'use strict';

import React, { Component, PropTypes } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ChartInformationContainer from './ChartInformationContainer';
import { fetchAndProcessTiles } from '../utility/StorageUtility';
import { FontStyles } from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import ServicesClient from '../api/ServicesClient';
import * as Progress from 'react-native-progress';

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

    this._toggleExpanded = this._toggleExpanded.bind(this);
    this._fetchAndProcessTiles = this._fetchAndProcessTiles.bind(this);
    this._progressCallback = this._progressCallback.bind(this);
    this._getIcon = this._getIcon.bind(this);
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
        <View style={styles.inputsContainer}>
          <View style={styles.vfrText}>
            <TouchableOpacity onPress={this._toggleExpanded} activeOpacity={0.5}>
              <Text style={FontStyles.thin}>
                {vfrChart.regionId}
                {"\n"}
                {vfrChart.regionName}
              </Text>
            </TouchableOpacity>
          </View>
          {this._getIcon()}
        </View>

        <ChartInformationContainer
          ref={(informationExpander) => { this.informationExpander = informationExpander; }}
          vfrChart={vfrChart}
        />

        <View style={styles.border} />
      </View>
    );
  }

  _getIcon() {
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
      icon = <Progress.Circle
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

  _toggleExpanded() {
    if (!this.informationExpander)
      return;

    this.informationExpander.toggleExpanded();
  }

  _fetchAndProcessTiles() {
    const { vfrChart } = this.props;

    if (!vfrChart || !vfrChart.regionId)
      return;

    this.setState({
      isDownloading: true,
    });

    fetchAndProcessTiles(vfrChart.regionId, this._progressCallback).then((result) => {
      if (this.isStillMounted) {
        this.setState({
          isDownloading: false,
          hasDownloaded: !(result && result.error),
          indeterminate: false,
          downloadProgress: 0,
          error: result && result.error,
        });
      }
    });
  }

  _progressCallback(bytesWritten, contentLength) {
    const percentage = Math.floor((bytesWritten / contentLength) * 100);

    if (this.isStillMounted) {
      this.setState({
        downloadProgress: percentage,
        indeterminate: percentage === 100,
      });
    }
  }
}

const styles = StyleSheet.create({
  inputsContainer:{
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: 'center',
  },
  border: {
    borderColor: '#D3D3D3',
    borderBottomWidth: 0.5,
  },
  vfrText: {
    flex: 1,
  },
  icon: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    width: 44,
  },
});
