export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  category: 'Fiction' | 'Non-Fiction' | 'Favorites';
  description: string;
  inStock: boolean;
}

export interface CartItem extends Book {
  quantity: number;
}

export type PaymentMethod = 'CBE' | 'Awash' | 'Abyssinia' | 'TeleBirr';

export type DeliveryArea = 'Betel' | 'Thohiloch' | 'Zenebework' | 'Mexico';

export interface PaymentDetails {
  fullName: string;
  phone: string;
  email?: string;
  city: 'Addis Ababa' | 'Hawassa';
  bank: PaymentMethod;
  deliveryMethod: 'delivery' | 'pickup';
  deliveryArea?: DeliveryArea;
  streetAddress?: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}