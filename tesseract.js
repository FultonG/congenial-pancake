const { createWorker, createScheduler} = require('tesseract.js');

const worker = createWorker({
  logger: m => console.log(m), // Add logger here
});
const worker2 = createWorker();
const worker3 = createWorker();

const scheduler = createScheduler();

const recognizeImage = (base64url) => new Promise(async function (resolve, reject) {
    await worker.load();
    await worker2.load();
    await worker3.load();
    await worker.loadLanguage('eng');
    await worker2.loadLanguage('eng');
    
    await worker3.loadLanguage('eng');
    await worker.initialize('eng');
    await worker2.initialize('eng');
    await worker3.initialize('eng');
    await worker.setParameters({
        tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    });
    await worker2.setParameters({
        tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    });
    await worker3.setParameters({
        tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    });
    //Add schedulers
    scheduler.addWorker(worker);
    scheduler.addWorker(worker2);

    scheduler.addJob('recognize', base64url).then((res) => {
        console.log(res.data.text);
        resolve(res.data.text);
    })
    .catch(err => {
        reject(err);
    })
    // return worker.recognize(base64url).then(async (res) => {
    //     // await worker.terminate();
    //     resolve(res.data.text);
    // })
    // .catch(async (err) => {
    //     // await worker.terminate();
    //     reject(err);
    // });
});

exports.recognizeImage = recognizeImage;