import axios from "axios";

const API_KEY = "e29082a36f0453d236c23083";
const API_BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

export const fetchCurrencyCodes = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/codes`);
  return data.supported_codes;
};
