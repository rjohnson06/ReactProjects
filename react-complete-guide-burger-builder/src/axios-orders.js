import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerbuilder-233b1.firebaseio.com/'
});

export default instance;
