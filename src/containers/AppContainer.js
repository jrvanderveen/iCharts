// @flow
'use strict';

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native';
import VFRChartsList from '../components/VFRChartsList';
import Header from '../components/Header';
import IChartsMapView from './IChartsMapView';
import Menu from '../components/Menu';
import Settings from '../components/Settings';
import VFRChart from '../model/VFRChart';
import Scenes from './Scenes';
import SideMenu from './SideMenu';
import { getSavedCharts } from '../utility/StorageUtility';

const headerHeight = 65;

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: Scenes.HOME,
      savedVfrCharts: [],
      vfrChartsToShow: []
    };

    this._sideMenu = null;
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

  handleFavPress(chartId: number){
    let savedVfrCharts = [];

    this.state.vfrChartsToShow.forEach(function(chart){
        if(chart.uniqueId == chartId){
          chart.isFavorited = !chart.isFavorited;
        }
        savedVfrCharts.push(chart);
    });

    this.setState({
      savedVfrCharts: savedVfrCharts
    });
  }

  handleViewPress(chart: object){
    this.setState({
      route: Scenes.CHARTVIEW,
      selectedChart: chart,
    });
  }

  handleHeaderPress() {
    if (this._sideMenu !== null) {
      this._sideMenu.toggleMenu();
    }
  }

  handleMenuPress(route: string) {
    if (this._sideMenu !== null) {
      this._sideMenu.closeMenu();
    }
    
    this.setState({
      route: route
    });
  }

  getCurrentSceneForRoute() {
    switch (this.state.route.toLowerCase()) {
      case Scenes.HOME:
        return <VFRChartsList
                  onFavorited={(chartId) => this.handleFavPress(chartId)}
                  onChartPressed={(chart) => this.handleViewPress(chart)}
                  vfrChartsToShow={this.state.vfrChartsToShow}
                />;
      case Scenes.FAVORITES:
        return <VFRChartsList
                  onFavorited={(chartId) => this.handleFavPress(chartId)}
                  onChartPressed={(chart) => this.handleViewPress(chart)}
                  vfrChartsToShow={this.state.savedVfrCharts.filter((chart) => { return chart.isFavorited; }) }
                />;
      case Scenes.SETTINGS:
        return <Settings />;
      case Scenes.CHARTVIEW:
        return <IChartsMapView style={{height: Dimensions.get('window').height - headerHeight}} />
      default:
        console.log("Unknown route: ", this.state.route);
        return <VFRChartsList
                onFavorited={(chartId) => this.handleFavPress(chartId)}
                onChartPressed={(chart) => this.handleViewPress(chart)}
                vfrChartsToShow={this.state.vfrChartsToShow}
              />;
    }
  }

  render() {
    const menuWidth = Math.max((Dimensions.get('window').width),(Dimensions.get('window').height))/5;
    const menu = <Menu onPress={(route) => this.handleMenuPress(route)} menuWidth={menuWidth} />;

    const headerTitle = this.state.route === Scenes.CHARTVIEW && this.state.selectedChart
      ? this.state.selectedChart.regionName
      : this.state.route;

    const header =
      <Header
        title={headerTitle.toUpperCase()}
        height={headerHeight}
        onPress={() => this.handleHeaderPress()}
      />;

    const currentScene = this.getCurrentSceneForRoute();
    const screenHeight = Dimensions.get('window').height;

    return (
      <View style={styles.container} onLayout={(event) => this.setState({reRender: true})}>
        <SideMenu
          ref={(sideMenu) => this._sideMenu = sideMenu }
          menu={menu}
          menuWidth={menuWidth}
          menuOpenBuffer={menuWidth / 2}
          headerComponent={header}
          useLinearGradient={true}
          height={screenHeight}
          shouldRespondToPan={this.state.route !== Scenes.CHARTVIEW}>
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
