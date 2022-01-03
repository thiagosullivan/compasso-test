import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.github.com/users',
    params: {
        'client_id': process.env.CLIENT_ID,
        'client_secret': process.env.CLIENT_SECRET
      }
});