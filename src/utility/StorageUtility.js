// @flow
'use strict';

import RNFetchBlob from 'react-native-fetch-blob';
import ServicesClient from './ServicesClient';
import ZipArchive from 'react-native-zip-archive';

const fs = RNFetchBlob.fs;

var exampleVfrCharts = [
  {
    regionName: 'Albuquerque',
    regionId: 'ALB',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: true,
    uniqueId: 0,
  },
  {
    regionName: 'Anchorage',
    regionId: 'ANC',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: false,
    uniqueId: 1,
  },
  {
    regionName: 'Atlanta',
    regionId: 'ATL',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: false,
    uniqueId: 2,
  },
  {
    regionName: 'Bethel',
    regionId: 'BET',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: false,
    uniqueId: 3,
  },
  {
    regionName: 'Billings',
    regionId: 'BIL',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: false,
    uniqueId: 4,
  },
  {
    regionName: 'Denver',
    regionId: 'DEN',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: false,
    uniqueId: 5,
  },
  {
    regionName: 'Detroit',
    regionId: 'DET',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: false,
    uniqueId: 6,
  },
  {
    regionName: 'Dutch Harbor',
    regionId: 'DUT',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: true,
    uniqueId: 7,
  },
  {
    regionName: 'Great Falls',
    regionId: 'GF',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: false,
    uniqueId: 8,
  },
  {
    regionName: 'Halifax',
    regionId: 'HAL',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: false,
    uniqueId: 9,
  },
  {
    regionName: 'Jacksonville',
    regionId: 'JAC',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: false,
    uniqueId: 10,
  },
  {
    regionName: 'Juneau',
    regionId: 'JUN',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: false,
    uniqueId: 11,
  },
  {
    regionName: 'Ketchikan',
    regionId: 'KET',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: true,
    uniqueId: 12,
  },
  {
    regionName: 'Kodiak',
    regionId: 'KOD',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: false,
    uniqueId: 13,
  },
  {
    regionName: 'Klamath Falls',
    regionId: 'KF',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: false,
    uniqueId: 14,
  },
  {
    regionName: 'Seattle',
    regionId: 'SEA',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    chartUrl: 'https://www.google.com',
    filePath: '',
    isFavorited: false,
    uniqueId: 15,
  }
];
const getSavedCharts = () => {
  // this is where we will load our charts from disk, for now populate with this list
  return exampleVfrCharts;
};

async function fetchAndProcessTiles(regionId) {
  if (!regionId || regionId === '')
    return;

  try {
    let zipFilePath = await ServicesClient.downloadTilesZip(regionId);
    if (!zipFilePath)
      return;

    const unzippedTilesPath = `${fs.dirs.DocumentDir}/${regionId}/`;
    let exists = await fs.exists(unzippedTilesPath);
    if (exists) {
      console.log(`Unzipped tiles already exist; removing them.`);
      await fs.unlink(unzippedTilesPath);
    }

    console.log(`Unzipping ${regionId}.zip`);
    await ZipArchive.unzip(zipFilePath, unzippedTilesPath);

    console.log(`Removing ${regionId}.zip`);
    await fs.unlink(zipFilePath);
  } catch(error) {
    console.warn(`Error getting chart tiles for ${regionId}: ${error}`);
  }
}

export { getSavedCharts, fetchAndProcessTiles };
