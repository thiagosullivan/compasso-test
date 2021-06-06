import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.github.com/users',
    params: {
        'client_id': "3ef514ad42fa0954dc3e",
        'client_secret': "f67fe325a887dd1c66aa3904de44c6dce294828d"
      }
});