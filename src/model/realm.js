'use strict';

import Realm from 'realm';

class VFRChart extends Realm.Object {}
VFRChart.schema = {
  name: 'VFRChart',
  primaryKey: 'regionId',
  properties: {
    regionName: 'string',
    regionId: 'string',
    publicationDate: 'date',
    expirationDate: 'date',
    version: 'int',
    isFavorited: 'bool',
  }
};

class VFRChartsList extends Realm.Object {}
VFRChartsList.schema = {
  name: 'VFRChartsList',
  properties: {
    charts: {type: 'list', objectType: 'VFRChart'},
  }
};

export default new Realm({schema: [VFRChart, VFRChartsList]});
