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
    name: 'Podstawowy Kurs posługiwania się bronią palną.',
    price: 100,
    description: 'Naucz się podstaw strzelectwa od żołnierza Navy SEAL.',
  },
  {
    id: '2',
    name: 'Kurs Strzelania Bojowego',
    price: 200,
    description: 'Opanuj taktykę defensywnego strzelania.'
  },
];
