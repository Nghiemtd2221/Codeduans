const API_URL = 'http://10.24.63.6:3000';

export const registerUser = async (username, password) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  return response.json();
};

export const LoginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/users?username=${username}&password=${password}`);
  return response.json();
};
