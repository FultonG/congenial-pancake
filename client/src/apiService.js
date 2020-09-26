import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3001',
  });

const sendScreenshot = (dataUri) => {
    return api.post('/api/ocr', { image: dataUri })
        .then(res => res.data);
}

export default {
    sendScreenshot
}