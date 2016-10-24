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
import ChartCell from '../components/ChartCell'
import Header from '../components/Header';
import Menu from '../components/Menu';
import Settings from '../components/Settings';
import VFRChart from '../model/VFRChart';
import Scenes from './Scenes';
import SideMenu from './SideMenu';
import Colors from '../styles/Colors';
import { getSavedCharts, updateVfrCharts } from '../utility/StorageUtility';


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
  //handle just like menu press so update both savedVfrCharts and vfrChartsToShow
  handleFavPress(chartId: number){
    let savedVfrCharts = [];
    let vfrChartsToShow = [];
    let vfrChart;

    for(let i = 0; i < this.state.savedVfrCharts.length; i++){
      savedVfrCharts[i] = this.state.savedVfrCharts[i];
      if(savedVfrCharts[i].uniqueId == chartId){
        savedVfrCharts[i].isFavorited = !savedVfrCharts[i].isFavorited;
      }
    }

    switch(this.state.route){
      case Scenes.FAVORITES:
        vfrChartsToShow = savedVfrCharts.filter((chart) => {
          return chart.isFavorited;
        });
        this.setState({
          savedVfrCharts: savedVfrCharts,
          vfrChartsToShow: vfrChartsToShow,
        });
        break;
      case Scenes.HOME:
        this.setState( {
          savedVfrCharts: savedVfrCharts,
          vfrChartsToShow: savedVfrCharts,
        });
        break;
      default:
        console.log("Unkown route: ", this.state.route);
    }
  }

  handleViewPress(){
    this.setState({
      route: Scenes.SETTINGS,
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
        return <VFRChartsList
                    onChartPress={(chartId) => this.handleFavPress(chartId)}
                    onViewPress={() => this.handleViewPress()}
                    vfrChartsToShow={this.state.vfrChartsToShow}
                />;
      case Scenes.SETTINGS:
        return <Settings />;
      default:
        console.log("Unkown route: ", this.state.route);
        return <VFRChartsList onChartPress={(chartId) => this.handleFavPress(chartId)} vfrChartsToShow={this.state.vfrChartsToShow}/>;
    }
  }
// ^^^^^^^^^^^^^left off here just need to add the on press to the fav button
  render() {
    const menuWidth = Math.max((Dimensions.get('window').width),(Dimensions.get('window').height))/5;
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
