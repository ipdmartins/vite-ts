import axios from 'axios';

const baseURL = 'http://localhost:3333/';

const apiConnection = axios.create({
	baseURL,
});

export default apiConnection;
