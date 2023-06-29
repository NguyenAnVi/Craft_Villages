import * as httpRequest from '~/utils/httpRequest';

const API_URL = '/auth/';

// Register user
const signUp = async (userData: any) => {
  const response = await httpRequest.post(API_URL + 'signUp', userData);

  if (response) {
    localStorage.setItem('user', JSON.stringify(response));
  }

  return response;
};

// Login user
const signIn = async (userData: any) => {
  try {
    const response = await httpRequest.post(API_URL + 'signIn', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      return response;
    }
  }
  catch (err) {
    console.log(err);
  }
};

// Logout user
const logout = async () => {
  const response = await httpRequest.post(API_URL + 'signIn');

  if (response) {
    localStorage.removeItem('user');
  }

  return response;
};

const authService = {
  signUp,
  signIn,
  logout,
};

export default authService;
