import { ICustomerCreate, ICustomerUpdate, Customer } from "../models/Customer";
import { api, handleRequest } from "./baseService";
const CUSTOMERS_ENDPOINT = '/customers'


export const fetchAllCustomers = async () => {
  return handleRequest<Customer[]>(api.get(CUSTOMERS_ENDPOINT));
}

export const fetchCustomer = async (id: number) => {
  return handleRequest<Customer>(api.get(`${CUSTOMERS_ENDPOINT}/${id}`));
}

export const fetchCustomerByEmail = async (email: string) => {
  return handleRequest<Customer>(api.get(`${CUSTOMERS_ENDPOINT}/email/${email}`));
}

export const createCustomer = async (payload: ICustomerCreate) => {
  return handleRequest<Customer>(api.post(CUSTOMERS_ENDPOINT, payload));
}

export const updateCustomer = async (id: number, payload: ICustomerUpdate) => {
  return handleRequest<Customer>(api.patch(`${CUSTOMERS_ENDPOINT}/${id}`, payload));
}

export const deleteCustomer = async (id: number) => {
  return handleRequest(api.delete(`${CUSTOMERS_ENDPOINT}/${id}`));
}