import axios from "axios";

const USER_REST_API_BASE_URL = 'http://localhost:8080/api';
export const registerUser = async (data) => {
    try {
      const response = await axios.post(`${USER_REST_API_BASE_URL}/user/register`,data);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error; // Re-throw so calling code can handle it
    }
  };
  export const loginUser = async (data) => {
    try {
      const response = await axios.post(`${USER_REST_API_BASE_URL}/login`,data);
      return response.data;
    } catch (error) {
      console.error('Error signing in user:', error);
      throw error; // Re-throw so calling code can handle it
    }
  };