import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Pagination, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "swiper/css";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import {
  clearFilter,
  getAllProducts,
  setYear,
} from "../../state/products/productSlice";
import { ProductListProps } from "../../types";
import CarCard from "./CarCard";
import CarSkeleton from "./CarSkeleton";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
import emptyIllustration from "../../assets/no_data.svg";
const CarsList: FC<ProductListProps> = ({
  products,
  title,
  scroll,
  reviews,
  numberOfPages,
  searchNumberOfPages,
  pagination,
  loading,
}) => {
  const [swipe, setSwipe] = useState<SwiperClass>();
  const [page, setPage] = useState<number>(1);
  const query = useQuery();
  const searchQuery: any = query.get("search");
  const dispatch = useDispatch<AppDispatch>();
  const { brand, location, millage, activeYear } = useSelector(
    (state: RootState) => state.products
  );
  const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };
  console.log(products);
  useEffect(() => {
    dispatch(
      getAllProducts({
        searchQuery,
        page,
        brand,
        location,
        millage,
        activeYear,
      })
    );
  }, [page, searchQuery, brand, location, millage, activeYear, dispatch]);

  return (
    <section className="mw px-4 md:px-0 py-10">
      <h2 className="md:text-4xl text-lg font-bold mb-4 md:mb-10 ">{title}</h2>

      {!scroll && !reviews && (
        <div className="flex whitespace-nowrap overflow-x-auto md:grid grid-cols-5 gap-4 mb-4 text-sm md:text-base">
          <button
            onClick={() => dispatch(clearFilter())}
            className={`py-2 px-4 md:px-0 ${
              !activeYear ? "bg-zinc-300" : ""
            }  rounded`}
          >
            All years
          </button>
          <button
            onClick={() => dispatch(setYear("year[gte]=2006&year[lte]=2010"))}
            className={`py-2 px-4 md:px-0 border ${
              activeYear === "year[gte]=2006&year[lte]=2010"
                ? "bg-zinc-300"
                : ""
            } border-zinc-300 rounded`}
          >
            Year 2006 - 2010
          </button>
          <button
            onClick={() => dispatch(setYear("year[gte]=2011&year[lte]=2015"))}
            className={`py-2 px-4 md:px-0 border ${
              activeYear === "year[gte]=2011&year[lte]=2015"
                ? "bg-zinc-300"
                : ""
            } border-zinc-300 rounded`}
          >
            Year 2011 - 2015
          </button>
          <button
            onClick={() => dispatch(setYear("year[gte]=2016&year[lte]=2020"))}
            className={`py-2 px-4 md:px-0 border ${
              activeYear === "year[gte]=2016&year[lte]=2020"
                ? "bg-zinc-300"
                : ""
            } border-zinc-300 rounded`}
          >
            Year 2016 - 2020
          </button>
          <button
            onClick={() => dispatch(setYear("year[gte]=2021"))}
            className={`py-2 px-4 md:px-0 border ${
              activeYear === "year[gte]=2021" ? "bg-zinc-300 " : ""
            } border-zinc-300 rounded`}
          >
            Year 2021 and above
          </button>
        </div>
      )}

      {!scroll ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:mt-5">
            {products?.map((car) => (
              <CarCard _id={car._id} car={car} review={reviews} />
            ))}
            {loading && [0, 1, 2, 3, 4, 8, 6, 7].map(() => <CarSkeleton />)}
          </div>

          {products?.length === 0 && !loading && (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ width: "30%", height: "20%" }}
                  src={emptyIllustration}
                  alt="empty"
                />
                <h2 style={{ fontWeight: "600" }}>
                  No Item in this Category Found
                </h2>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="relative">
          <button className="absolute top-24 -left-8 rounded-full bg-white p-4 z-20 border-2 hidden md:block">
            <ChevronLeftIcon
              onClick={() => swipe?.slidePrev()}
              className="h-6"
            />
          </button>
          <button
            onClick={() => swipe?.slideNext()}
            className="absolute top-24 -right-8 rounded-full bg-white p-4 z-20 border-2 hidden md:block"
          >
            <ChevronRightIcon className="h-6" />
          </button>
          <Swiper
            onSwiper={(swiper) => setSwipe(swiper)}
            slidesPerGroup={2}
            slidesPerView={2}
            spaceBetween={16}
            breakpoints={{
              640: {
                slidesPerGroup: 4,
                slidesPerView: 4,
              },
            }}
          >
            {products?.map((car, i) => (
              <SwiperSlide className="bg-zinc-100 rounded overflow-clip">
                <CarCard _id={car._id} car={car} yellow={scroll} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {!scroll &&
        pagination &&
        !brand &&
        !location &&
        !millage &&
        !activeYear && (
          <Stack sx={{ alignItems: "center", color: "green" }} mt={2}>
            <Pagination
              count={numberOfPages}
              variant="outlined"
              onChange={handleChange}
              sx={{ color: "green" }}
            />
          </Stack>
        )}
      {!scroll && (brand || location || activeYear || millage) && (
        <Stack sx={{ alignItems: "center", color: "green" }} mt={2}>
          <Pagination
            count={searchNumberOfPages}
            variant="outlined"
            onChange={handleChange}
            sx={{ color: "green" }}
          />
        </Stack>
      )}
    </section>
  );
};

export default CarsList;
