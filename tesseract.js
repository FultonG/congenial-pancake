const { createWorker } = require('tesseract.js');

// Tesseract.recognize(
//   'https://tesseract.projectnaptha.com/img/eng_bw.png',
//   'eng',
//   { logger: m => console.log(m) }
// ).then(({ data: { text } }) => {
//   console.log(text);
// })


const worker = createWorker({
  logger: m => console.log(m), // Add logger here
});

// (async () => {
//   await worker.load();
//   await worker.loadLanguage('eng');
//   await worker.initialize('eng');
//   const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
//   console.log(text);
//   await worker.terminate();
// })();

const recognizeImage = (base64url) => new Promise(async function (resolve, reject) {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    // const { data: { text } } = await worker.recognize(base64url);
    // console.log(text);
    return worker.recognize(base64url).then(res => {
        resolve(res.data.text);
        worker.terminate();
    })
    .catch(err => {
        reject(err);
        worker.terminate();
    });
});

exports.recognizeImage = recognizeImage;