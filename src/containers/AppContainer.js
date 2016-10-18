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

const menuWidth = 120;

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: Scenes.HOME,
      openMenu: false,
      savedVfrCharts: [],
      vfrChartsToShow: []
    };

    // Track the state of the menu to determine whether to open or close it when the header is clicked
    this._isMenuOpen = false;
  }

  componentDidMount() {
    var savedVfrCharts = getSavedCharts().map(function(chart) {
      return new VFRChart(chart);
    });

    this.setState({
      savedVfrCharts: savedVfrCharts,
      vfrChartsToShow: savedVfrCharts
    });
  }

  handleHeaderPress() {
    this.setState({
      openMenu: !this._isMenuOpen
    });
  }
  
  handleMenuPress(route: string) {
    let vfrChartsToShow = [];
    switch(route) {
      case Scenes.FAVORITES:
        vfrChartsToShow = this.state.savedVfrCharts.filter((chart) => {
          return chart.isFavorited;
        });
        break;
      case Scenes.HOME:
      default:
        vfrChartsToShow = this.state.savedVfrCharts;
    }
    
    this.setState({
      route: route,
      openMenu: false,
      vfrChartsToShow: vfrChartsToShow
    });
  }

  handleMenuOpen(isMenuOpen: bool) {
    this._isMenuOpen = isMenuOpen;
  }

  getCurrentSceneForRoute() {
    switch (this.state.route.toLowerCase()) {
      case Scenes.HOME:
      case Scenes.FAVORITES:
        return <VFRChartsList onChartPress={() => console.log("Show the chart")} vfrChartsToShow={this.state.vfrChartsToShow} />;
      case Scenes.SETTINGS:
        return <Settings />;
      default:
        console.log("Unkown route: ", this.state.route);
        return <VFRChartsList onChartPress={() => console.log("Show the chart")} vfrChartsToShow={this.state.savedVfrCharts} />;
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
    const screenHeight = Dimensions.get('window').height;
    
    return (
      <View style={styles.container} onLayout={(event) => this.setState({reRender: true})}>
        <SideMenu
          openMenu={this.state.openMenu}
          menu={menu}
          menuWidth={menuWidth}
          menuOpenBuffer={menuWidth / 2}
          headerComponent={header}
          useLinearGradient={true}
          onMenuOpened={(isMenuOpen) => this.handleMenuOpen(isMenuOpen)}
          height={screenHeight}>
          {currentScene}
        </SideMenu>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default AppContainer;