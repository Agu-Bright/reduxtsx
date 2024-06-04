import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const url = "https://mango-cars-server-1.onrender.com/api/v1";

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

export interface Product {
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
  __v: number;
}

interface ApiResponse {
  success: boolean;
  products: Product[];
  productsCount: number;
  filteredProductCount: number;
  resPerPage: number;
  numberOfPages: number;
  searchNumberOfPages: number;
}

interface singelProductResponse {
  success: boolean;
  product: Product;
}
interface multipleProductsResponse {
  success: boolean;
  trendingProducts: Product[];
}

interface ProductState {
  success: boolean;
  products: Product[];
  popularProducts?: Product[];
  product: Product | null;
  productsCount: number;
  filteredProductCount: number;
  resPerPage: number;
  numberOfPages: number;
  searchNumberOfPages: number;
  loading: boolean;
  error: string | null;
  brand: string | null;
  location: string | null;
  millage: string | null;
  loadingP: boolean;
  activeYear?: string | null;
}

const initialState: ProductState = {
  success: false,
  products: [],
  popularProducts: [],
  productsCount: 0,
  filteredProductCount: 0,
  resPerPage: 0,
  numberOfPages: 0,
  searchNumberOfPages: 0,
  loading: false,
  error: null,
  product: null,
  brand: null,
  location: null,
  millage: null,
  loadingP: false,
  activeYear: null,
};

//create Product thunk

//get all product thunk
export const getAllProducts = createAsyncThunk(
  "/product/getAllProducts",
  async ({
    searchQuery,
    page,
    brand,
    location,
    millage,
    activeYear,
  }: // category,
  {
    searchQuery?: string | null;
    page?: number | null;
    brand?: string | null;
    location?: string | null;
    millage?: string | null;
    activeYear?: string | null;
    // category: string;
  }) => {
    try {
      let link = `${url}/products`;

      const queryParams: string[] = [];

      if (page !== null) {
        queryParams.push(`page=${page}`);
      }
      if (searchQuery) {
        queryParams.push(`search=${searchQuery}`);
      }
      if (brand) {
        queryParams.push(`brand=${brand}`);
      }
      if (location) {
        queryParams.push(`location=${location}`);
      }
      if (millage) {
        queryParams.push(`milage=${millage}`);
      }
      if (activeYear) {
        queryParams.push(activeYear);
      }

      if (queryParams.length > 0) {
        link += `?${queryParams.join("&")}`;
      }

      const { data } = await axios.get<ApiResponse>(link);
      return data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);
export const getSingleProduct = createAsyncThunk(
  "/product/getSingelProduct",
  async (_id: string) => {
    try {
      const { data } = await axios.get<singelProductResponse>(
        `${url}/product/${_id}`
      );
      return data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);
export const getPopularProduct = createAsyncThunk(
  "/product/getPopularProducts",
  async (_) => {
    try {
      const { data } = await axios.get<multipleProductsResponse>(
        `${url}/trendingProducts`
      );
      return data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterBrand: (state, action) => {
      state.brand = action.payload;
      state.millage = null;
      state.location = null;
    },
    filterLocation: (state, action) => {
      state.location = action.payload;
      state.brand = null;
      state.millage = null;
    },
    filterMillage: (state, action) => {
      state.millage = action.payload;
      state.location = null;
      state.brand = null;
    },
    setYear: (state, action) => {
      state.activeYear = action.payload;
      state.millage = null;
      state.location = null;
      state.brand = null;
    },
    clearFilter: (state) => {
      state.brand = null;
      state.location = null;
      state.millage = null;
      state.activeYear = null;
    },
  },
  extraReducers: (builder) => {
    //create product

    //get prducts
    builder.addCase(getAllProducts.pending, (state) => {
      state.success = false;
      state.products = [];
      state.productsCount = 0;
      state.filteredProductCount = 0;
      state.resPerPage = 0;
      state.numberOfPages = 0;
      state.searchNumberOfPages = 0;
      state.loading = true;
      state.error = null;
      state.product = null;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.success = true;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.filteredProductCount = action.payload.filteredProductCount;
      state.resPerPage = action.payload.resPerPage;
      state.numberOfPages = action.payload.numberOfPages;
      state.searchNumberOfPages = action.payload.searchNumberOfPages;
      state.loading = false;
      state.error = null;
      state.product = null;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.success = false;
      state.products = [];
      state.productsCount = 0;
      state.filteredProductCount = 0;
      state.resPerPage = 0;
      state.numberOfPages = 0;
      state.searchNumberOfPages = 0;
      state.loading = false;
      state.error = action.error.message ?? "Unknown Error";
      state.product = null;
    });

    //get single product
    builder.addCase(getSingleProduct.pending, (state) => {
      state.success = false;
      // state.products = [];
      state.productsCount = 0;
      state.filteredProductCount = 0;
      state.resPerPage = 0;
      state.numberOfPages = 0;
      state.searchNumberOfPages = 0;
      state.loading = true;
      state.error = null;
      state.product = null;
    });
    builder.addCase(getSingleProduct.fulfilled, (state, action) => {
      state.success = true;
      // state.products = [];
      state.productsCount = 0;
      state.filteredProductCount = 0;
      state.resPerPage = 0;
      state.numberOfPages = 0;
      state.searchNumberOfPages = 0;
      state.loading = false;
      state.error = null;
      state.product = action.payload.product;
    });
    builder.addCase(getSingleProduct.rejected, (state, action) => {
      state.success = true;
      // state.products = [];
      state.productsCount = 0;
      state.filteredProductCount = 0;
      state.resPerPage = 0;
      state.numberOfPages = 0;
      state.searchNumberOfPages = 0;
      state.loading = false;
      state.error = action.error.message ?? "unknown error";
      state.product = null;
    });

    //get popular products
    builder.addCase(getPopularProduct.pending, (state) => {
      state.popularProducts = [];
      state.loadingP = true;
    });
    builder.addCase(getPopularProduct.fulfilled, (state, action) => {
      state.popularProducts = action.payload.trendingProducts;
      state.loadingP = false;
    });
    builder.addCase(getPopularProduct.rejected, (state, action) => {
      state.popularProducts = [];
      state.error = action.error.message ?? "unknown Error";
      state.loadingP = false;
    });
  },
});

export const {
  filterBrand,
  filterLocation,
  filterMillage,
  clearFilter,
  setYear,
} = productSlice.actions;

export default productSlice.reducer;
