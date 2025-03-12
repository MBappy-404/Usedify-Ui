export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  address: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface TProduct {
  _id: string;
  userId: TUser;
  name: string;
  image: string;
  condition: string;
  price: number;
  category: string;
  location: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Define the type for a wishlist item
 
export interface TOrder {
  _id: string;
  seller: TUser;
  buyer: TUser;
  products: {
    product: TProduct;
  }[];
  totalPrice: number;
  status: string;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
  __v: number;
}

export interface TCartItem {
  user: TUser;
  products: TProduct;
  quantity: number;
}

export type QueryTypes = {
  name: string;
  value: string;
};
