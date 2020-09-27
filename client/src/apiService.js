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
    return api.post('/users/create', { userData }).then(res => res.data)
}

const createVendor = (vendorData) => {
    return api.post('/vendors/create', { vendorData }).then(res => res.data)
}

const loginUser = (userData) => {
    return api.post('/users/login', userData).then(res => res.data)
}

const getAllVendors = () => {
    return api.get('/vendors/all').then(res => res.data)
}

const checkout = (checkoutData) => {
    let user = JSON.parse(localStorage.getItem('user'));
    let jwt = localStorage.getItem('userJWT');
    return api.post('/finance/purchase/create', { ...checkoutData, account_id: user.account_id }, {
        headers: {
            authorization: jwt
        }
    }).then(res => res.data)
}

export default {
    sendScreenshot,
    createUser,
    createVendor,
    loginUser,
    getAllVendors,
    checkout
}