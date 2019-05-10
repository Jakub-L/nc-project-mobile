import axios from 'axios';

const API_URL = 'https://site-seeing.herokuapp.com/api';

export const getPins = async () => {
  const { data } = await axios.get(`${API_URL}/pins`);
  return data.pins;
};