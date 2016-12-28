import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  View
} from 'react-native';
import Colors from '../styles/Colors';
import DownloadChartsView from './DownloadChartsView';
import SettingsScenes from '../constants/SettingsScenes';
import SettingsMenu from '../components/SettingsMenu';

class SettingsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.settings}>
        <Navigator
          style={{ flex:1 }}
          initialRoute={{ name: SettingsScenes.SETTINGS_MAIN_MENU }}
          renderScene={(route, navigator) => {
            switch (route.name) {
              case SettingsScenes.DOWNLOAD:
                console.log("RENDER SCENE SETTINGS CONTAINER DOWNLOAD");
                return <DownloadChartsView navigator={navigator} />
              case SettingsScenes.SETTINGS_MAIN_MENU:
              default:
                console.log("RENDER SCENE SETTINGS CONTAINER MAIN MENU");
                return <SettingsMenu navigator={navigator} />
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settings: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
});

export default SettingsContainer;
