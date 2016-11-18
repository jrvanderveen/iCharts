'use strict';

import Realm from 'realm';

class VFRChart extends Realm.Object {}
VFRChart.schema = {
  name: 'VFRChart',
  properties: {
    regionName: 'string',
    regionId: 'string',
    publicationDate: 'date',
    expirationDate: 'date',
    revisionNumber: 'int',
    chartUrl: 'string',
    filePath: 'string',
    isFavorited: 'bool',
    uniqueId: 'int',
  }
};

class VFRChartsList extends Realm.Object {}
VFRChartsList.schema = {
  name: 'VFRChartsList',
  properties: {
    items: {type: 'list', objectType: 'VFRChart'},
  }
};

export default new Realm({schema: [VFRChart, VFRChartsList]});
