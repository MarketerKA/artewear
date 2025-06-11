export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
  category?: string;
  inStock?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
} 