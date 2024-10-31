import axiosInstance from './axiosInstance';

// Function to fetch all destinations
export const getDestinations = async () => {
  try {
    console.log('Fetching destinations...'); // Log before making the request
    console.log('API Base URL:', axiosInstance.defaults.baseURL); // Log the base URL to ensure it's correct

    const response = await axiosInstance.get('/get-destinations');
    console.log('Response data:', response.data); // Log response data if successful
    return response.data; // Returns the list of destinations
  } catch (error: any) {
    console.error('Error fetching destinations:', error.message);
    console.error('Error details:', error); // Log full error details
    throw error;
  }
};
