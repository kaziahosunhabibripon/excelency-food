export interface SubCategory {
  id: number;
  purchase_group_id: number;
  purchase_category_id?: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  purchase_group_id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  sub_categories: SubCategory[];
}

export interface FoodGroup {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  image: string;
  categories: Category[];
}
