export interface DataPayloadProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const data: DataPayloadProps[] = [
  {
    id: 1,
    name: "Apple",
    quantity: 2,
    price: 0.52,
  },
  {
    id: 2,
    name: "Banana",
    quantity: 3,
    price: 0.67,
  },
];
