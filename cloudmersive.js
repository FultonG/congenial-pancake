var CloudmersiveImageApiClient = require('cloudmersive-image-api-client');
var fs = require("fs");
var defaultClient = CloudmersiveImageApiClient.ApiClient.instance;
var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = process.env.CLOUDMERSIVE_KEY;

var apiInstance = new CloudmersiveImageApiClient.RecognizeApi();

var callback = function (error, data, response, res) {
  if (error) {
    res.status(500).send(error);
  } else {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    if (data.Successful == true) {
      let plate = data.DetectedLicensePlates[0].LicensePlateText_BestMatch;
      res.send(plate);
    }
    else {
      res.status(400).send(data);
    }
  }
};

const readLicense = (filename, res) => {
  var imageFile = Buffer.from(fs.readFileSync(__dirname + `/uploads/${filename}`).buffer); // File | Image file to perform the operation on.  Common file formats such as PNG, JPEG are supported.

  apiInstance.recognizeDetectVehicleLicensePlates(imageFile, (error, data, response) => {
    callback(error, data, response, res)
  });
}

exports.readLicense = readLicense;
