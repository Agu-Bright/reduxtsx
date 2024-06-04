import { useDispatch, useSelector } from "react-redux";
import CarsList from "../components/cars/CarsList";
import AboutVision from "../components/home/AboutVision";
import { HeaderSection } from "../components/home/HeaderSection";
import { AppDispatch, RootState } from "../state/store";
import { useEffect } from "react";
import {
  getAllProducts,
  getPopularProduct,
} from "../state/products/productSlice";

const Home = () => {
  const {
    products,
    productsCount,
    filteredProductCount,
    numberOfPages,
    searchNumberOfPages,
    loading,
    error,
    popularProducts,
    loadingP,
  } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      getAllProducts({
        searchQuery: "",
        page: 1,
        brand: "",
        location: "",
        millage: "",
      })
    );

    dispatch(getPopularProduct());
  }, []);
  return (
    <>
      <HeaderSection />
      <CarsList
        title="All Used Cars Categories"
        products={products}
        productsCount={productsCount}
        filteredProductCount={filteredProductCount}
        numberOfPages={numberOfPages}
        searchNumberOfPages={searchNumberOfPages}
        loading={loading}
        error={error || ""}
        pagination={true}
      />

      <CarsList
        title="Popular car search"
        products={popularProducts}
        scroll={true}
      />
      <AboutVision />
      <CarsList
        title="What our customers are saying"
        products={products}
        reviews={true}
      />
    </>
  );
};

export default Home;
