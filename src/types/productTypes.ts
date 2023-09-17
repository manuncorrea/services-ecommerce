export interface ProductData {
  name: string;
  description: string;
  images: string[];
  price: number; 
  stock: number;  
  isVisible: boolean; 
  categoryId: string;
  brandId: string;
}

export interface UpdatedProductData extends Partial<ProductData> {}
