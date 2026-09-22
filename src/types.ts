export interface ProductOption {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

export interface ProductVariant {
  id: number;
  title: string;
  price: number;
  compare_at_price?: number;
  sku: string;
  available: boolean;
  option1?: string | null;
  option2?: string | null;
  option3?: string | null;
}

export interface Product {
  id: number;
  title: string;
  handle: string;
  category: string;
  product_type: string;
  vendor: string;
  collections: string[];
  tags: string;
  badge: string;
  rating: number;
  review_count: number;
  price: number;
  price_max: number;
  compare_at_price?: number;
  images: string[];
  options: ProductOption[];
  variant_count: number;
  variants: ProductVariant[];
  description: string;
}

export interface CartItem {
  productId: number;
  variantId: number;
  title: string;
  variantTitle: string;
  price: number;
  image: string;
  quantity: number;
}
