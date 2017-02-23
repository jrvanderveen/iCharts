// @flow
'use strict';

import RNFS from 'react-native-fs';
import ServicesClient from '../api/ServicesClient';
import ZipArchive from 'react-native-zip-archive';

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

export { fetchAndProcessTiles, removeTiles };
