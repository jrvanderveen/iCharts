// @flow
'use strict';

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native';
import VFRChartsContainer from './VFRChartsContainer';
import Header from '../components/Header';
import Home from '../components/Home';
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

    var savedVfrCharts = getSavedCharts().map(function(chart) {
      return new VFRChart(chart);
    });
    
    this.state = {
      route: Scenes.HOME,
      openMenu: false,
      savedVfrCharts: savedVfrCharts
    };

    this.chartsContainer = null;
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

  handleVerticalScroll(gestureStateDy: number) {
    console.log("****************VERTICAL SCROLLL!!", gestureStateDy, this.chartsContainer !== null, this.state.route,
      Scenes.HOME,
      this.chartsContainer !== null && this.state.route === Scenes.HOME);
    if (this.chartsContainer !== null && this.state.route === Scenes.HOME) {
      this.chartsContainer.scrollTo(-gestureStateDy)
    }
  }

  getCurrentSceneForRoute() {
    switch (this.state.route.toLowerCase()) {
      case Scenes.HOME:
        return <VFRChartsContainer ref={(ref) => { this.chartsContainer = ref; }} vfrChartsToShow={this.state.savedVfrCharts} />;
      case Scenes.SETTINGS:
        return <Settings />;
      default:
        console.log("Unkown route: ", route);
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
          onVerticalScroll={(yValue) => this.handleVerticalScroll(yValue)}
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
