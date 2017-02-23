'use strict';

import RNFS from 'react-native-fs';

const servicesEndpoint = 'http://104.236.153.135';

export default class ServicesClient {

  // Fetch all models
  static async getAllModels() {
    const errorObject = {
      error: `Failed to retrieve downloadable charts.`
    };

    try {
      let modelsResponse = await fetch(`${servicesEndpoint}/charts/`);

      let status = modelsResponse.status;
      if (status !== 200) {
        console.warn(`Request for all models failed with code ${status}`);
        return errorObject;
      }

      const modelsJson = await modelsResponse.json();
      const models = modelsJson.map(this.jsonToModelMapper);

      return {
        models: models
      };
    } catch(error) {
      console.warn(`Error getting models for download: ${error}`);
      return errorObject;
    }
  }

  // Fetch a region's model
  static async getModelForRegion(regionId) {
    const errorObject = {
      error: `Failed to retrive chart for region ${regionId}.`
    };

    try {
      let modelResponse = await fetch(`${servicesEndpoint}/charts/${regionId}`);

      let status = modelResponse.status;
      if (status !== 200) {
        console.warn(`Request for ${regionId} model failed with code ${status}`);
        return errorObject;
      }

      return {
        models: this.jsonToModelMapper(await modelResponse.json())
      };
    } catch(error) {
      console.warn(`Error getting model for region ${regionId}: ${error}`);
      return errorObject;
    }
  }

  // Fetch the zip file containing tiles for the supplied region and save in the documents folder
  static async downloadTilesZip(regionId, progressCallback) {
    if (!regionId)
      return;

    try{
      console.log(`Request tiles for reqion id: ${regionId}`);
      const zipPath = `${RNFS.DocumentDirectoryPath}/${regionId}.zip`;
      await RNFS.downloadFile({
        fromUrl: `${servicesEndpoint}/charts/${regionId}/zip`,
        toFile: zipPath,
        progress: (response) => {
          if (progressCallback)
            progressCallback(response.bytesWritten, response.contentLength);
        },
      }).promise;

      return {
        zipPath: zipPath,
      };
    } catch (error) {
      console.warn(`Error getting chart tiles for ${regionId}: ${error}`);
      return {
        error: error,
      };
    }
  }

  // convert json string properties to correct data types
  static jsonToModelMapper(modelJson) {
    let model = {...modelJson};

    model.publicationDate = new Date(modelJson.publicationDate);
    model.expirationDate = new Date(modelJson.expirationDate);
    model.version = parseInt(modelJson.version);

    return model;
  }
}
