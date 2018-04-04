import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://quiz-23-3-2018.firebaseio.com/'
});

export default instance;