export interface User {
  _id: string;
  username?: string;
  name?: string;
  email: string;
  roles: string[];
  approve: boolean;
}

export interface Item {
  _id?: string;
  name: string;
  price: number | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T = any> {
  message: string;
  data: T;
}
