import axios from 'axios'
const SERVER_API_URL = process.env.NODE_ENV === 'production' ? 'http://server:3001' : 'http://localhost:3001';
const CLIENT_API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001';


export default {
    auth: {
        verifyToken: () => axios.get(SERVER_API_URL + '/auth/verify-token'),
        login: (data) => axios.post(CLIENT_API_URL + '/auth/login', data),
    }
}