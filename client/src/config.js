// deprecated
const config = {
    DEV_API_BASE_URL: 'http://localhost:5000/api',
    DEV_UPLOAD_BASE_URL: 'http://localhost:5000',
	API_BASE_URL: process.env.NODE_ENV === 'production' ? 'https://lovely-aip.herokuapp.com/api' : 'http://localhost:5000/api',
	UPLOAD_BASE_URL: process.env.NODE_ENV === 'production' ? 'https://lovely-aip.herokuapp.com' :  'http://localhost:5000/',
};

export default config;

// new version of config
export const UPLOAD_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://lovely-aip.herokuapp.com/' : 'http://localhost:5000/';
export const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://lovely-aip.herokuapp.com/api' : 'http://localhost:5000/api';
