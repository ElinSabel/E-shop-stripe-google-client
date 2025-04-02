export type Customer = {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phone: string,
    street_address: string,
    postal_code: string,
    city: string,
    country: string,
    created_at: string,
}
  
export interface ICustomerCreate {
  firstname: string,
    lastname: string,
    email: string,
  phone: string,
  password?: string,
    street_address: string,
    postal_code: string,
    city: string,
    country: string,
}

export interface ICustomerUpdate {
  firstname: string,
  lastname: string,
  email: string,
  password?: string,
  phone: string,
  street_address: string,
  postal_code: string,
  city: string,
  country: string,
}