import { decodeBase64 } from "./dataConversion";
import { ENDPOINT } from "../config/settings";

async function sendDataToServer(data) {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to send data to the server');
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
        console.error('Error sending data to the server:', error);
        throw error;
    }
  }

  
async function loadDataFromServer() {
    try {
      const response = await fetch('/sample.json');
      if (!response.ok) {
        throw new Error('Failed to load data from the server');
      }
      const data = await response.json();
      return decodeBase64(data.graphData)
    } catch (error) {
        console.error('Error loading data from the server:', error);
      throw error;
    }
  }
  

export { sendDataToServer, loadDataFromServer }