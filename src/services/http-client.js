import axios from 'axios';

const config = {
  timeout: 30000,
  baseURL: process.env.VUE_APP_BACKEND_URL,
  contentType: 'application/json'
};
const httpClient = axios.create(config);
export { httpClient };
