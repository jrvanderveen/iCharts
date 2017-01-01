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
import SettingsContainer from './SettingsContainer';
import Scenes from '../constants/Scenes';
import SideMenu from './SideMenu';
import VFRChart from '../model/VFRChart';
import { getSavedCharts } from '../utility/StorageUtility';

const headerHeight = 65;

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: Scenes.HOME,
      hideHeader: false,
      selectedChart: {}
    };

    this._sideMenu = null;
    this._intervalId = 0;
    let savedVfrChartsList = realm.objects('VFRChartsList');

    if (savedVfrChartsList.length < 1) {
      realm.write(() => {
        realm.create('VFRChartsList', {name: 'VFRChartsList', charts: getSavedCharts()});
      });
    }

    // query the realm once for favorited charts and rely on auto-updated results
    this._savedVfrCharts = realm.objects('VFRChart');
    this._favoritedCharts = this._savedVfrCharts.filtered('isFavorited = true');
  }

  componentDidMount() {
    this._timeOfLastActivity = Date.now();
  }

  handleFavPress(favoritedChart) {
    if (favoritedChart) {
      realm.write(() => {
        favoritedChart.isFavorited = !favoritedChart.isFavorited;
      });
    }
  }

  handleViewPress(chart){
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

  handleMenuPress(route) {
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
                  vfrChartsToShow={Array.from(this._savedVfrCharts)}
                />;
      case Scenes.FAVORITES:
        return <VFRChartsList
                  onFavorited={(chartId) => this.handleFavPress(chartId)}
                  onChartPressed={(chart) => this.handleViewPress(chart)}
                  vfrChartsToShow={Array.from(this._favoritedCharts)}
                />;
      case Scenes.SETTINGS:
        return <SettingsContainer />;
      case Scenes.CHARTVIEW:
        this._intervalId = setInterval(() => {
          if (this._shouldHideHeader() && Math.abs(Date.now() - this._timeOfLastActivity) > 3500) {
            this.setState({ hideHeader: true });
          }
        }, 4000);

        return <IChartsMapView
                style={{flex: 1}}
                onAction={() => {
                  this._timeOfLastActivity = Date.now();
                  this.setState({ hideHeader: false });
                }}
                regionId={this.state.selectedChart.regionId} />
      default:
        console.log("Unknown route: ", this.state.route);
        return <VFRChartsList
                onFavorited={(chartId) => this.handleFavPress(chartId)}
                onChartPressed={(chart) => this.handleViewPress(chart)}
                vfrChartsToShow={Array.from(this._savedVfrCharts)}
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
