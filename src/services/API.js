import axios from 'axios';
// @flow
const API_KEY = '23567b218376f79d9415' // other valid API keys: '760b5fb497225856222a', '0e2a751704a65685eefc'
const API_ENDPOINT = 'http://195.39.233.28:8035'

let accessToken = null;

async function renewAccessToken() {
  try {
    const { data } = await axios.post(`${API_ENDPOINT}/auth`, {
      "apiKey": API_KEY
    });
    const { auth, token } = data || {};
    if (!auth) {
      throw new Error('Wrong API KEY');
    }
    accessToken = token;
    return token;
  } catch (error) {
    throw new Error('Wrong API KEY');
  }
}

async function getHeaders() {
  if (!accessToken) {
    await renewAccessToken();
  }
  return {
    "Authorization": `Bearer ${accessToken}`,
  }
}

export async function getPictures (page: number = 1): Array<Object> {
  // http://195.39.233.28:8035/images?page=xxx
  try {
    const headers = await getHeaders();
    const options = {
      method: 'GET',
      headers,
      url: `${API_ENDPOINT}/images?page=${page}&limit=20`,
    };
    const { data, status } = await axios(options);
    return {
      ...data,
      status,
    };
  } catch (error) {
    console.error('getPictures', error.response);
    const { status } = error.response;
    if (status === 401) {
      // token expired, force renewal
      accessToken = null;
      await getPictures(page);
    } else {
      return {
        status,
        errorMessage: 'Request fail'
      }
    }
  }
}

export async function getPictureDetails (id: number): Object {
  // http://195.39.233.28:8035/images/id
  try {
    const headers = await getHeaders();
    const options = {
      method: 'GET',
      headers,
      url: `${API_ENDPOINT}/images/${id}`,
    };
    const { data, status } = await axios(options);
    return {
      ...data,
      status,
    };
  } catch (error) {
    console.error('getPictureDetails', error.response);
    const { status } = error.response;
    if (status === 401) {
      // token expired, force renewal
      accessToken = null;
      await getPictureDetails(id);
    } else {
      return {
        status,
        errorMessage: 'Request fail'
      }
    }
  }
}
