import axios from 'axios';

const API_URL = 'https://site-seeing.herokuapp.com/api';

export const getPins = async () => {
  const { data } = await axios.get(`${API_URL}/pins`);
  return data.pins;
};

export const loginUser = async (email, password) => {
  const { data } = await axios.post(`${API_URL}/login`, { email, password });
  return data.user;
}