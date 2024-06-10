// auth.js
import { jwtDecode } from 'jwt-decode'; // Library to decode JWTs

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false; // No token found, user is not authenticated
  }

  try {
    const decodedToken = jwtDecode(token);
    // Check if the token has expired
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp > currentTime; // True if token is valid
  } catch (err) {
    console.error('Error decoding JWT:', err);
    return false; // Invalid token
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
};
