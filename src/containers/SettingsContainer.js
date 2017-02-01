import React, { Component, PropTypes } from 'react';
import {
  Navigator,
  StyleSheet,
  View
} from 'react-native';
import Colors from '../styles/Colors';
import DownloadChartsView from './DownloadChartsView';
import RemoveChartsView from './RemoveChartsView';
import ServicesClient from '../api/ServicesClient';
import { SettingsScenes } from '../constants';
import SettingsMenu from '../components/SettingsMenu';
import SettingsMenuCell from '../components/SettingsMenuCell';

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
      downloadModels: undefined,
    };

    this._getModels = this._getModels.bind(this);
  }

  componentDidMount() {
    this.isStillMounted = true;
    this._getModels();
  }

  componentWillUnmount() {
    this.isStillMounted = false;
  }

  render() {
    const { initialRoute } = this.props;
    const { downloadModels, errorMessage } = this.state;

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
          renderScene={(route, navigator) => {
            switch (route.name) {
              case SettingsScenes.DOWNLOAD:
                return (
                  <DownloadChartsView
                    navigator={navigator}
                    downloadModels={downloadModels}
                    errorMessage={errorMessage}
                  />
                );
              case SettingsScenes.REMOVE:
                return (
                  <RemoveChartsView
                    navigator={navigator}
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
                      navigateToSettingsView={() => {
                        navigator.push({name: 'remove'})
                      }}
                    />
                  </SettingsMenu>
              );
            }
          }}
        />
      </View>
    );
  }

  _getModels() {
    ServicesClient.getAllModels().then((result) => {
      if (this.isStillMounted && result) {
        this.setState({
          downloadModels: result.models,
          errorMessage: result.error,
        });
      }
    });
  }
}

const styles = StyleSheet.create({
  settings: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
});

export default SettingsContainer;
