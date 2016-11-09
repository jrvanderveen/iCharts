// @flow
'use strict';

import React, { Component, PropTypes } from 'react';
import {
  requireNativeComponent,
} from 'react-native';

class IChartsMapView extends Component {
  static propTypes = {
  };

  render() {
    return (
      <IChartsMap {...this.props} />
    );
  }
}

var IChartsMap = requireNativeComponent('IChartsMap', IChartsMapView);

export default IChartsMapView;
