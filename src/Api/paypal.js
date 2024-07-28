import axios from 'axios';

const createOrder = async () => {
  const response = await axios.post('http://localhost:5000/create-order');
  return response.data;
};

const captureOrder = async (orderId) => {
  const response = await axios.post('http://localhost:5000/capture-order', { orderId });
  return response.data;
};

export { createOrder, captureOrder };
