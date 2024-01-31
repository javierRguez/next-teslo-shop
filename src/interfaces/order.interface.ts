import { Product, Size } from ".";

export interface Order {
  id: string;
  subTotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
  isPaid: boolean;
  paidAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  OrderAddress: OrderAddress | null;
  OrderItem: OrderItem[];
}

export interface OrderItem {
  quantity: number;
  price: number;
  size: Size;
  product: OrderProduct;
}

export interface OrderAddress {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  address2?: string | null;
  postalCode: string;
  city: string;
  phone: string;
  countryId: string;
  orderId: string;
}

export interface OrderProduct {
  title: string;
  slug: string;
  ProductImage: OrderProductImage[];
}

export interface OrderProductImage {
  url: string;
}
