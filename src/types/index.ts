export interface Car {
  image: string;
  title?: string;
  price?: number;
  milage?: number;
  caption?: string;
  rating?: number;
  name?: string;
}

interface ProductImage {
  _id: string;
  public_id: string;
  url: string;
}

interface ProductReview {
  user: string; // Assuming this is the ID of the user who posted the review
  name: string;
  rating: number;
  comment: string;
}

export interface Products {
  _id: string;
  name: string;
  price: number;
  negotiable: boolean;
  description: string;
  year: number;
  location: string;
  images: ProductImage[];
  stock: string; // Should this be a number or a string?
  reviews: ProductReview[];
  user: string; // Assuming this is the ID of the user who posted the product
  brand: string;
  numberOfReviews: number;
  rating: number;
  carStatus: string;
  status: string;
  createdAt: string;
  milage?: number;
  __v: number;
}

export interface CarListProps {
  cars: Car[];
  title?: string;
  scroll?: boolean;
  reviews?: boolean;
}

export interface ProductListProps {
  products?: Products[];
  title?: string;
  scroll?: boolean;
  reviews?: boolean;
  productsCount?: number;
  filteredProductCount?: number;
  numberOfPages?: number;
  searchNumberOfPages?: number;
  loading?: boolean;
  error?: string;
  pagination?: boolean;
}
