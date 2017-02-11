// @flow
'use strict';

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  InteractionManager,
  LayoutAnimation,
  StyleSheet,
  View
} from 'react-native';
import { Colors } from '../styles';
import ChartCell from './ChartCell';
import ChartsView from './ChartsView';
import Header from '../components/Header';
import IChartsMapView from './IChartsMapView';
import Menu from '../components/Menu';
import NoChartsWarningMessage from '../components/NoChartsWarningMessage';
import realm from '../model/realm';
import SettingsContainer from './SettingsContainer';
import { Scenes, SettingsScenes } from '../constants';
import SideMenu from './SideMenu';
import { getSavedCharts, sortModelsByRegionId } from '../utility';

const headerHeight = 65;

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWorking: false,
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

    this._savedVfrCharts.addListener((allSavedCharts, changes) => {
      if (changes.insertions.length > 0) {
        this.forceUpdate();
      }
    });
  }

  componentDidMount() {
    this._timeOfLastActivity = Date.now();
  }

  componentWillUnmount() {
    realm.removeAllListeners();
  }

  handleFavPress = favoritedChart => {
    if (favoritedChart) {
      realm.write(() => {
        favoritedChart.isFavorited = !favoritedChart.isFavorited;
      });
    }
  }

  handleViewPress = chart => {
    this.setState({
      route: Scenes.CHARTVIEW,
      selectedChart: chart,
    });

    this._timeOfLastActivity = Date.now();
  }

  handleHamburgerPress = () => {
    if (this._sideMenu !== null) {
      this._sideMenu.toggleMenu();
      this._timeOfLastActivity = Date.now();
    }
  }

  handleMenuPress = route => {
    this.setState({
      isWorking: true,
      route: route,
      initialSettingsRoute: null,
    });

    if (this._sideMenu !== null) {
      this._sideMenu.closeMenu();
    }

    // give the menu some time to close before changing the scene to make the
    // animation smoother. Rerendering and animations don't mix well
    InteractionManager.runAfterInteractions(() => {
      this._timeOfLastActivity = Date.now();
      this.setState({
        isWorking: false,
        hideHeader: false,
      });
    });
  }

  setLastActivity = () => {
    this._timeOfLastActivity = Date.now();
    this.setState({ hideHeader: false });
  }

  getCurrentSceneForRoute = () => {
    if (this._intervalId > 0) {
      clearInterval(this._intervalId);
      this._intervalId = 0;
    }

    switch (this.state.route.toLowerCase()) {
      case Scenes.FAVORITES:
        const noFavoritesButton = (
          <NoChartsWarningMessage
            message={"It looks like you don't have any favorited charts."}
            onPress={this._goToDownloadsView}
          />
        );
        const favoritedChartsList = (
          <ChartsView
            chartsToShow={Array.from(this._favoritedCharts).sort(sortModelsByRegionId)}
            chartCellClass={ChartCell}
            chartCellProps={{
              onFavorited: this.handleFavPress,
              onChartPressed: this.handleViewPress
            }}
          />
        );

        return this._favoritedCharts.length === 0 ? noFavoritesButton : favoritedChartsList;
      case Scenes.SETTINGS:
        return <SettingsContainer initialRoute={this.state.initialSettingsRoute} />;
      case Scenes.CHARTVIEW:
        this._intervalId = setInterval(() => {
          if (this._shouldHideHeader() && Math.abs(Date.now() - this._timeOfLastActivity) > 3500) {
            this.setState({ hideHeader: true });
          }
        }, 4000);

        return (
          <IChartsMapView
            style={{flex: 1}}
            onAction={this.setLastActivity}
            regionId={this.state.selectedChart.regionId}
          />
        );
      case Scenes.HOME:
      default:
        const noChartsButton = (
          <NoChartsWarningMessage
            message={"It looks like you don't have any charts yet."}
            buttonPrompt={"Do you want some?"}
            onPress={this._goToDownloadsView}
          />
        );
        const defaultChartsList = (
          <ChartsView
            chartsToShow={Array.from(this._savedVfrCharts).sort(sortModelsByRegionId)}
            chartCellClass={ChartCell}
            chartCellProps={{
              onFavorited: this.handleFavPress,
              onChartPressed: this.handleViewPress
            }}
          />
        );

        return this._savedVfrCharts.length === 0 ? noChartsButton : defaultChartsList;
    }
  }

  render() {
    const { selectedChart, route, hideHeader, isWorking } = this.state;

    const menuWidth = Math.max((Dimensions.get('window').width),(Dimensions.get('window').height)) / 5;
    const menu = <Menu currentRoute={route} onPress={this.handleMenuPress} menuWidth={menuWidth} />;

    const headerTitle = route === Scenes.CHARTVIEW && selectedChart ? selectedChart.regionName : route;
    const header =
      <Header
        hideHeader={hideHeader}
        title={headerTitle.toLowerCase()}
        height={headerHeight}
        onPress={this.handleHamburgerPress}
      />;

    let currentScene = null;
    if (isWorking) {
      currentScene = <ActivityIndicator
                        style={{flex: 1, backgroundColor: Colors.secondary }}
                        size="large"
                      />
    } else {
      currentScene = this.getCurrentSceneForRoute();
    }
    const screenHeight = Dimensions.get('window').height;

    return (
      <View style={styles.container} onLayout={(event) => this.forceUpdate()}>
        <SideMenu
          ref={(sideMenu) => this._sideMenu = sideMenu}
          mainContentBackgroundColor={Colors.primary}
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
    return this._sideMenu
      && !this._sideMenu.isOpen()
      && this.state.route === Scenes.CHARTVIEW
      && !this.state.hideHeader;
  }

  _goToDownloadsView = () => {
    const customLayoutSpring = {
      duration: 400,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.9,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.9,
      },
    };
    LayoutAnimation.configureNext(customLayoutSpring);
    this.setState({
      route: Scenes.SETTINGS,
      initialSettingsRoute: SettingsScenes.DOWNLOAD,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default AppContainer;
