'use strict';

import RNFetchBlob from 'react-native-fetch-blob';

const fs = RNFetchBlob.fs;
const servicesEndpoint = 'http://192.168.0.11:8888';

export default class ServicesClient {

  // Fetch the zip file containing tiles for the supplied region and save in the documents folder
  static async downloadTilesZip(regionId) {
    if (!regionId || regionId === '')
      return;

    try {
      console.log(`Request tiles for reqion id: ${regionId}`);
      const response = await RNFetchBlob.fetch('GET', `${servicesEndpoint}/charts/${regionId}/zip`);

      let status = response.info().status;
      if (status !== 200) {
        console.warn(`Request for ${regionId} failed with code ${status}`);
        return;
      }

      const zipPath = `${fs.dirs.DocumentDir}/${regionId}.zip`;
      const responseBase64 = await response.base64();
      await fs.createFile(zipPath, responseBase64, 'base64');

      return zipPath;
    } catch(error) {
      console.warn(`Error getting chart tiles for ${regionId}: ${error}`);
    }
  }
}
