'use strict';

import React from 'react';
import {
  View
} from 'react-native';
import SettingsMenuCell from './SettingsMenuCell';

const SettingsMenu = (props) => {
  return (
    <View style={{padding: 20}}>
      <SettingsMenuCell
        buttonText={"Download Charts"}
        navigateToSettingsView={() => {
          props.navigator.push({name: 'download'})
        }}
      />
    </View>
  );
};

export default SettingsMenu;
