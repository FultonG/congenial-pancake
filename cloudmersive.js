var CloudmersiveImageApiClient = require('cloudmersive-image-api-client');
var fs = require("fs");
var defaultClient = CloudmersiveImageApiClient.ApiClient.instance;
var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = process.env.CLOUDMERSIVE_KEY;

var apiInstance = new CloudmersiveImageApiClient.RecognizeApi();

var callback = function (error, data, response) {
  if (error) {
    if(error.response.status == 200)
      return { data: null }
    else
      return { err: error, status: 500}
  } else {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    if (data.Successful == true) {
      let plate = data.DetectedLicensePlates[0].LicensePlateText_BestMatch;
      return { data: plate };
    }
    else {
      return { err: error, status: 400}
    }
  }
};

const readLicense = (filename) => new Promise((resolve, reject) =>  {
  var imageFile = Buffer.from(fs.readFileSync(__dirname + `/uploads/${filename}`).buffer); // File | Image file to perform the operation on.  Common file formats such as PNG, JPEG are supported.

  apiInstance.recognizeDetectVehicleLicensePlates(imageFile, (error, data, response) => {
    let callbackRes = callback(error, data, response);
    if(callbackRes.data !== undefined) {
      resolve(callbackRes.data);
    }
    else {
      reject(callbackRes)
    }
    
  });
});

exports.readLicense = readLicense;
