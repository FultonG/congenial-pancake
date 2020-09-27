import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

const sendScreenshot = (file) => {
    let formData = new FormData();
    formData.append('plate', file);
    return api.post('/api/ocr', formData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
        .then(res => res.data);
}

const createUser = (userData) => {
    return api.post('/users/create', {userData}).then(res => res.data)
}

const createVendor = (vendorData) => {
    return api.post('/vendors/create', {vendorData}).then(res => res.data)
}

const loginUser = (userData) => {
    return api.post('/users/login', userData).then(res => res.data)
}

const getAllVendors = () => {
    return api.get('/vendors/all').then(res => res.data)
}

export default {
    sendScreenshot,
    createUser,
    createVendor,
    loginUser,
    getAllVendors
}