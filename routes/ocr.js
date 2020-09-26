var express = require("express");

var router = express.Router();
var tesseract = require("../tesseract");
/**
 * Receives a base64 image to read with tesseract.
 */
router.post("/", function(req, res) {
    let image = req.body.image;

    tesseract.recognizeImage(image).then(response => {  
        // console.log(res, response);
        res.send(response);
    })
    .catch(err => {
        console.log('err', err)
        res.status(500);
    })
});


module.exports = router;