import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-pr.firebaseio.com/'

});

export default instance;

