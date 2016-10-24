// @flow
'use strict';

export default class VFRChart {
  regionName: string;
  regionId: string;
  publicationDate: string;
  expirationDate: string;
  revisionNumber: number;
  chartUrl: string;
  filePath: string;
  isFavorited: bool;
  uniqueId: number;

  constructor(modelObject: object) {
    this.regionName = modelObject.regionName ? modelObject.regionName : '';
    this.regionId = modelObject.regionId ? modelObject.regionId : '';
    this.publicationDate = modelObject.publicationDate ? modelObject.publicationDate : '';
    this.expirationDate = modelObject.expirationDate ? modelObject.expirationDate : '';
    this.revisionNumber = modelObject.revisionNumber ? modelObject.revisionNumber : -1;
    this.chartUrl = modelObject.chartUrl ? modelObject.chartUrl : '';
    this.filePath = modelObject.filePath ? modelObject.filePath : '';
    this.isFavorited = modelObject.isFavorited ? modelObject.isFavorited : false;
    this. uniqueId = modelObject.uniqueId ? modelObject.uniqueId : -1;
  }
}
