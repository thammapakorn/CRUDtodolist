import axios from "axios";

//http://localhost:5000/api/login

export const register = async (data) =>
  await axios.post('http://localhost:5000/api/register/',data);

export const login = async (data) =>
  await axios.post('http://localhost:5000/api/login/',data);
