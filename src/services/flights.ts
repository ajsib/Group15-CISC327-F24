import axiosInstance from './axiosInstance';

interface SearchFlightsParams {
  origin_id?: number;
  destination_id?: number;
  departureDate?: string;
  returnDate?: string;
  adults?: number;
  children?: number;
  seniors?: number;
  page?: number;
  limit?: number; 
}

// Function to search flights with query parameters
export const searchFlights = async (params: SearchFlightsParams) => {
  console.log('Initiating flight search with parameters:', params);

  try {
    const response = await axiosInstance.get('flights/search-results', { params });
    console.log('Flight search successful. Response data:', response.data);
    return response.data; // Returns the flight search results
  } catch (error: any) {
    console.error('Error searching flights:', error.message);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    throw error;
  }
};
