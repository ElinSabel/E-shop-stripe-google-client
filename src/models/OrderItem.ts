export type OrderItem = {
    id: number,
    order_id: number,
    product_id: number,
    product_name: string,
    product_image: string,
    quantity: number,
    unit_price: number,
    created_at: string
}
  
export interface IOrderItemCreate {
    product_id: number,
    product_name: string,
    product_image: string, 
    quantity: number,
    unit_price: number,
}

  
export interface IOrderItemUpdate {
    quantity: number
}