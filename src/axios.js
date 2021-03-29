import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://us-central1-clone-d3b78.cloudfunctions.net/api',
	//the API (cloud function) URL
	//'http://localhost:5001/clone-d3b78/us-central1/api'
});

export default instance;
