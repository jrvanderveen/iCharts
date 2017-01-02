'use strict';

import React from 'react';
import {
  View
} from 'react-native';

const SettingsMenu = (props) => {
  return (
    <View style={{padding: 20, flex: 1}}>
      {props.children}
    </View>
  );
};

export default SettingsMenu;
