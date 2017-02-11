import React, { Component, PropTypes } from 'react';
import {
  Navigator,
  StyleSheet,
  View
} from 'react-native';
import { Colors } from '../styles';
import DownloadChartCell from './DownloadChartCell';
import realm from '../model/realm';
import RemoveChartCell from './RemoveChartCell';
import ServicesClient from '../api/ServicesClient';
import SettingsChartsViewWrapper from './SettingsChartsViewWrapper';;
import { SettingsScenes } from '../constants';
import SettingsMenu from '../components/SettingsMenu';
import SettingsMenuCell from '../components/SettingsMenuCell';
import { sortModelsByRegionId, removeTiles } from '../utility';

class SettingsContainer extends Component {
  static propTypes = {
    initialRoute: PropTypes.string,
  };

  static defaultProps = {
    initialRoute: SettingsScenes.SETTINGS_MAIN_MENU,
  };

  constructor(props) {
    super(props);

    this.isStillMounted = false;
    this.state = {
      downloadModels: [],
    };

    this._savedVfrCharts = realm.objects('VFRChart');
  }

  componentDidMount() {
    this.isStillMounted = true;
    this._getModels();
  }

  componentWillUnmount() {
    this.isStillMounted = false;
  }

  renderScene = (route, navigator) => {
    const { downloadModels, errorMessage } = this.state;

    switch (route.name) {
      case SettingsScenes.DOWNLOAD:
        return (
          <SettingsChartsViewWrapper
            navigator={navigator}
            chartCellClass={DownloadChartCell}
            modelsToShow={downloadModels.sort(sortModelsByRegionId)}
            errorMessage={errorMessage}
            showIsWorkingIndicator={true}
          />
        );
      case SettingsScenes.REMOVE:
        return (
          <SettingsChartsViewWrapper
            navigator={navigator}
            chartCellClass={RemoveChartCell}
            modelsToShow={Array.from(this._savedVfrCharts).sort(sortModelsByRegionId)}
            chartCellProps={{
              doRemoveTiles: this._doRemoveTiles
            }}
            showIsWorkingIndicator={false}
          />
        );
      case SettingsScenes.SETTINGS_MAIN_MENU:
      default:
        return (
          <SettingsMenu>
            <SettingsMenuCell
              buttonText={"Download Charts"}
              navigateToSettingsView={() => {
                navigator.push({name: 'download'})
              }}
            />
            <SettingsMenuCell
              buttonText={"Remove Charts"}
              disabled={!this._savedVfrCharts || this._savedVfrCharts.length === 0}
              navigateToSettingsView={() => {
                navigator.push({name: 'remove'})
              }}
            />
          </SettingsMenu>
      );
    }
  }

  render() {
    const { initialRoute } = this.props;

    const initialRouteStack = [
      {mame: SettingsScenes.SETTINGS_MAIN_MENU}
    ];

    if (initialRoute && initialRoute !== '') {
      initialRouteStack.push({name: initialRoute});
    }

    return (
      <View style={styles.settings}>
        <Navigator
          initialRouteStack={initialRouteStack}
          renderScene={this.renderScene}
        />
      </View>
    );
  }

  _getModels = () => {
    ServicesClient.getAllModels().then((result) => {
      if (this.isStillMounted && result) {
        this.setState({
          downloadModels: result.models,
          errorMessage: result.error,
        });
      }
    });
  }

  _doRemoveTiles = vfrChart => {
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
  settings: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
});

export default SettingsContainer;
