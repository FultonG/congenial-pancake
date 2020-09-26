var express = require("express");

var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.png')
    }
})

var upload = multer({ storage: storage });
var cloudmersive = require("../cloudmersive");
/**
 * Receives a base64 image to read with tesseract.
 */
router.post("/", upload.single('plate'), function (req, res) {
    cloudmersive.readLicense(req.file.filename, res);
});


module.exports = router;