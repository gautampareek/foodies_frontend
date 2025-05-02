import axios from 'axios';
import { toast } from 'react-toastify';

const FOOD_REST_API_BASE_URL = 'http://localhost:8080/api/foods';
export const addFoodItem = async (formData) => axios.post(FOOD_REST_API_BASE_URL,formData,{headers:{"Content-Type":"multipart/form-data"}});
export const getFoodList = async () => axios.get(FOOD_REST_API_BASE_URL);
export const deleteFoodItem = async (id) => axios.delete(`${FOOD_REST_API_BASE_URL}/${id}`);
export const getFoodById = async (id) => {
    try {
      const response = await axios.get(`${FOOD_REST_API_BASE_URL}/byId`, {
        params: { id }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching food by ID:', error);
      throw error; // Re-throw so calling code can handle it
    }
  };
  