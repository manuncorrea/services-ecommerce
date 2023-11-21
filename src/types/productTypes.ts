export interface ProductData {
  name: string;
  description: string;
  images: string[];
  price: number; 
  color: string;
  stock: number;  
  isVisible: boolean; 
  categoryId: string;
  brandId: string;
}

export interface UpdatedProductData extends Partial<ProductData> {}
