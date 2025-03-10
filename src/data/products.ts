// src/data/products.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Handgun Basics Course',
    price: 99.99,
    description: 'Learn the fundamentals of marksmanship from a Navy SEAL.',
  },
  {
    id: '2',
    name: 'Combat Shooting Course',
    price: 149.99,
    description: 'Master defensive shooting tactics.',
  },
];
