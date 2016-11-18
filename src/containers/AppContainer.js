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
import realm from '../model/realm';
import Settings from '../components/Settings';
import Scenes from './Scenes';
import SideMenu from './SideMenu';
import VFRChart from '../model/VFRChart';
import { getSavedCharts } from '../utility/StorageUtility';

const headerHeight = 65;

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: Scenes.HOME,
      savedVfrCharts: [],
      hideHeader: false,
      vfrChartsToShow: [],
    };

    this._sideMenu = null;
    this._intervalId = 0;
    this._savedVfrCharts = realm.objects('VFRChartsList');

    console.log("SAVED CHARTS", this._savedVfrCharts);
    if (this._savedVfrCharts.length < 1) {
      realm.write(() => {
        console.log("WRITING CHART: ", getSavedCharts());
        realm.create('VFRChartsList', {name: 'VFRChartsList', items: getSavedCharts()});
      });
    }
  }

  componentDidMount() {
    const savedVfrCharts = Array.from(realm.objects('VFRChart'));

    this.setState({
      savedVfrCharts: savedVfrCharts,
      vfrChartsToShow: savedVfrCharts
    });

    this._timeOfLastActivity = Date.now();
  }

  handleFavPress(chartId: number){
    let savedVfrCharts = [];

    this.state.vfrChartsToShow.forEach(function(chart){
      if(chart.uniqueId === chartId){
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

    this._timeOfLastActivity = Date.now();
  }

  handleHamburgerPress() {
    if (this._sideMenu !== null) {
      this._sideMenu.toggleMenu();
      this._timeOfLastActivity = Date.now();
    }
  }

  handleMenuPress(route: string) {
    if (this._sideMenu !== null) {
      this._sideMenu.closeMenu();
    }

    this._timeOfLastActivity = Date.now();
    this.setState({
      hideHeader: false,
      route: route
    });
  }

  getCurrentSceneForRoute() {
    if (this._intervalId > 0){
      clearInterval(this._intervalId);
      this._intervalId = 0;
    }

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
        this._intervalId = setInterval(() => {
          if (this._shouldHideHeader() && Math.abs(Date.now() - this._timeOfLastActivity) > 3500) {
            this.setState({ hideHeader: true });
          }
        }, 4000);

        return <IChartsMapView style={{flex: 1}} onAction={() => { this._timeOfLastActivity = Date.now(); this.setState({ hideHeader: false }); }} />
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
    const { selectedChart, route, hideHeader } = this.state;

    const headerTitle = route === Scenes.CHARTVIEW && selectedChart ? selectedChart.regionName : route;
    const header =
      <Header
        hideHeader={hideHeader}
        title={headerTitle.toUpperCase()}
        height={headerHeight}
        onPress={() => this.handleHamburgerPress()}
      />;

    const currentScene = this.getCurrentSceneForRoute();
    const screenHeight = Dimensions.get('window').height;

    return (
      <View style={styles.container} onLayout={(event) => this.forceUpdate()}>
        <SideMenu
          ref={(sideMenu) => this._sideMenu = sideMenu}
          menu={menu}
          menuWidth={menuWidth}
          menuOpenBuffer={menuWidth / 2}
          headerComponent={header}
          useLinearGradient={true}
          height={screenHeight}
          shouldRespondToPan={route !== Scenes.CHARTVIEW}>
          {currentScene}
        </SideMenu>
      </View>
    );
  }

  _shouldHideHeader = () => {
    return this._sideMenu && !this._sideMenu.isOpen() && this.state.route === Scenes.CHARTVIEW;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default AppContainer;
