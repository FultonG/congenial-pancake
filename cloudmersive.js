var CloudmersiveImageApiClient = require('cloudmersive-image-api-client');
var fs = require("fs");
var defaultClient = CloudmersiveImageApiClient.ApiClient.instance;

// Configure API key authorization: Apikey
var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = '458c4164-0e45-4327-bf25-29d2ba0562cb';

// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Apikey.apiKeyPrefix = 'Token';

var apiInstance = new CloudmersiveImageApiClient.RecognizeApi();

var imageFile = Buffer.from(fs.readFileSync(__dirname + "\\download.png").buffer); // File | Image file to perform the operation on.  Common file formats such as PNG, JPEG are supported.

var callback = function(error, data, response, res) {
  if (error) {
    console.error(error);
    // return error;
    res.status(500).send(error);
  } else {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    if(data.Successful == true) {
      let plate = data.DetectedLicensePlates[0].LicensePlateText_BestMatch ;
      res.send(plate);
    }
    else {
      res.status(400).send(data);
    }
    
  }
};
const readLicense = (b64string, res) => {

  var buf = Buffer.from(b64string, 'base64').buffer; // Ta-da
  return apiInstance.recognizeDetectVehicleLicensePlates(buf, (error, data, response) => {
    return callback(error, data, response, res)
  });
}
// apiInstance.recognizeDetectVehicleLicensePlates(imageFile, callback);
exports.readLicense = readLicense;