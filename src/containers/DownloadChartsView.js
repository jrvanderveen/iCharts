'use strict';

import React, { Component, PropTypes } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import DownloadChartCell from './DownloadChartCell';
import Icon from 'react-native-vector-icons/Ionicons';
import ServicesClient from '../api/ServicesClient';

export default class DownloadChartsView extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    downloadModels: PropTypes.array,
    errorMessage: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  render() {
    const { downloadModels, errorMessage } = this.props;

    return (
      <View style={{flex: 1, backgroundColor: Colors.secondary}}>
        <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigator.pop()}>
          <Text>
            Back
          </Text>
        </TouchableOpacity>
        <View style={styles.listView}>
          {downloadModels ?
            <ListView
              enableEmptySections={true}
              dataSource={this.ds.cloneWithRows(downloadModels)}
              renderRow={(downloadVfrChartModel) => {
                return (
                  <DownloadChartCell
                    vfrChart={downloadVfrChartModel}
                  />
                );
              }}
            /> :
            this._renderErrorMessage(errorMessage)
          }
        </View>
      </View>
    );
  }

  _renderErrorMessage = (message) => {
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
  backButton: {
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    height: 32,
    justifyContent:'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    paddingLeft: 20,
  },
  centered: {
    alignItems: 'center',
  },
  listView: {
    flex: 1,
    justifyContent: 'center',
  },
});
