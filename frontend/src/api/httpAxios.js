import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://10.5.0.3:3000/',
  timeout: 10000,
});

export default instance

