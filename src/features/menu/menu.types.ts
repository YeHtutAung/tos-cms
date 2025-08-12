export type MenuItem = {
    id: number;
    name: string;
    description?: string;
    price: number;
    available: boolean;
    categoryId?: number | null;
  };