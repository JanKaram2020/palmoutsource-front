export type Drink = {
  id: number;
  name: string;
  variants: Record<string, number>;
};

export type Order = {
  id: number;
  created: string;
  items: {
    id: number;
    variant: string;
    quantity: number;
  }[];
};
