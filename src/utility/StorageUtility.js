// @flow
'use strict';

import RNFS from 'react-native-fs';
import ServicesClient from '../api/ServicesClient';
import ZipArchive from 'react-native-zip-archive';

var exampleVfrCharts = [
  {
    regionName: 'Albuquerque',
    regionId: 'ALB',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    isFavorited: true,
  },
  {
    regionName: 'Anchorage',
    regionId: 'ANC',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    isFavorited: false,
  },
  {
    regionName: 'Atlanta',
    regionId: 'ATL',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    isFavorited: false,
  },
  {
    regionName: 'Bethel',
    regionId: 'BET',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    isFavorited: false,
  },
  {
    regionName: 'Billings',
    regionId: 'BIL',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    isFavorited: false,
  },
  {
    regionName: 'Denver',
    regionId: 'DEN',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    isFavorited: false,
  },
  {
    regionName: 'Detroit',
    regionId: 'DET',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    isFavorited: false,
  },
  {
    regionName: 'Dutch Harbor',
    regionId: 'DUT',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    isFavorited: true,
  },
  {
    regionName: 'Great Falls',
    regionId: 'GF',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    isFavorited: false,
  },
  {
    regionName: 'Halifax',
    regionId: 'HAL',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    isFavorited: false,
  },
  {
    regionName: 'Jacksonville',
    regionId: 'JAC',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    isFavorited: false,
  },
  {
    regionName: 'Juneau',
    regionId: 'JUN',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    isFavorited: false,
  },
  {
    regionName: 'Ketchikan',
    regionId: 'KET',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    isFavorited: true,
  },
  {
    regionName: 'Kodiak',
    regionId: 'KOD',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    isFavorited: false,
  },
  {
    regionName: 'Klamath Falls',
    regionId: 'KF',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    isFavorited: false,
  },
  {
    regionName: 'Seattle',
    regionId: 'SEA',
    publicationDate: new Date('2016-01-29'),
    expirationDate: new Date('2016-12-05'),
    revisionNumber: 0,
    isFavorited: false,
  }
];
const getSavedCharts = () => {
  // this is where we will load our charts from disk, for now populate with this list
  return exampleVfrCharts;
};

async function fetchAndProcessTiles(regionId, progressCallback) {
  if (!regionId)
    return;

  try {
    let downloadResponse = await ServicesClient.downloadTilesZip(regionId, progressCallback);
    let zipFilePath = downloadResponse.zipPath;
    if (!zipFilePath) {
      return {
        error: downloadResponse.error,
      };
    }

    const unzippedTilesPath = `${RNFS.DocumentDirectoryPath}/${regionId}/`;
    let exists = await RNFS.exists(unzippedTilesPath);
    if (exists) {
      console.log(`Unzipped tiles already exist; removing them.`);
      await RNFS.unlink(unzippedTilesPath);
    }

    console.log(`Unzipping ${regionId}.zip`);
    await ZipArchive.unzip(zipFilePath, unzippedTilesPath);

    console.log(`Removing ${regionId}.zip`);
    await RNFS.unlink(zipFilePath);
  } catch(error) {
    console.warn(`Error getting chart tiles for ${regionId}: ${error}`);
    return {
      error: error,
    };
  }
}

async function removeTiles(regionId) {
  if (!regionId)
    return;

  try {
    const unzippedTilesPath = `${RNFS.DocumentDirectoryPath}/${regionId}/`;
    let exists = await RNFS.exists(unzippedTilesPath);
    if (exists) {
      console.log(`Removing tiles for ${regionId}.`);
      await RNFS.unlink(unzippedTilesPath);
    }
  } catch(error) {
    console.warn(`Error removing chart tiles for ${regionId}: ${error}`);
    return {
      error: error,
    };
  }
}

export { getSavedCharts, fetchAndProcessTiles, removeTiles };
