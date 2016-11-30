import axios from 'axios';
import { setApi } from './config';

const api = setApi();

export const postRoom = (data) => {
	return axios.post(`${api}/chat/room`, data)
};

export const authenticateRoom = (data) => {
	return axios.post(`${api}/chat/authenticate`, data)
};
