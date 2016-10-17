// @flow
'use strict';

import React, { Component } from 'react';
import {
  Dimensions,
  ListView,
  StyleSheet,
  View
} from 'react-native';
import VFRChartsList from '../components/VFRChartsList';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Settings from '../components/Settings';
import VFRChart from '../model/VFRChart';
import Scenes from './Scenes';
import SideMenu from './SideMenu';
import Colors from '../styles/Colors';
import { getSavedCharts } from '../utility/StorageUtility';

const statusBarHeight = 0;
const menuWidth = 200;
const screenHeight = Dimensions.get('window').height;

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: Scenes.HOME,
      openMenu: false,
      savedVfrCharts: [],
    };
  }

  componentDidMount() {
    var savedVfrCharts = getSavedCharts().map(function(chart) {
      return new VFRChart(chart);
    });

    this.setState({
      savedVfrCharts: savedVfrCharts,
    });
  }

  handleHeaderPress() {
    this.setState({
      openMenu: true
    });
  }
  
  handleMenuPress(route: string) {
    this.setState({
      route: route,
      openMenu: false
    });
  }

  getCurrentSceneForRoute() {
    switch (this.state.route.toLowerCase()) {
      case Scenes.HOME:
        return <VFRChartsList vfrChartsToShow={this.state.savedVfrCharts} />;
      case Scenes.SETTINGS:
        return <Settings />;
      default:
        console.log("Unkown route: ", route);
        return <VFRChartsList vfrChartsToShow={this.state.savedVfrCharts} />;
    }
  }
  
  render() {
    const menu = <Menu onPress={(route) => this.handleMenuPress(route)} menuWidth={menuWidth} />;
    const header =
      <Header
        title={this.state.route.toUpperCase()}
        onPress={() => this.handleHeaderPress()}
      />;

    const currentScene = this.getCurrentSceneForRoute();
    
    return (
      <View style={styles.container}>
        <SideMenu
          openMenu={this.state.openMenu}
          menu={menu}
          menuWidth={menuWidth}
          menuOpenBuffer={100}
          headerComponent={header}
          useLinearGradient={true}
          height={screenHeight - statusBarHeight}>
          {currentScene}
        </SideMenu>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: statusBarHeight,
  }
});

export default AppContainer;
