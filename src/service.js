import axios from 'axios';

const sevice = axios.create({
    baseURL: "http://localhost:5000",
});

export default sevice;
