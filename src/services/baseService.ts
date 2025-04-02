import axios, { AxiosResponse } from "axios";
export const API_URL = "https://e-shop-stripe-google-api.vercel.app/";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleRequest = async<T>(request: Promise<AxiosResponse<T>>) => {
  try {
    const response: {data: T} = await request
    return response.data;
  } catch (error) {
    console.log(error)
    throw error
  } 
}