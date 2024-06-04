import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import CarsList from "../components/cars/CarsList";
import { cars } from "../data";
import { moneyFormat } from "../functions/moneyFormat";
import { getSingleProduct } from "../state/products/productSlice";
import { AppDispatch, RootState } from "../state/store";
import "./carpage.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import CallRequest from "../components/CallRequest";

const CarPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const car = id ? cars[Number(id)] : null;
  const { product, products } = useSelector(
    (state: RootState) => state.products
  );
  useEffect(() => {
    //fetch single car
    id && dispatch(getSingleProduct(id));
  }, [dispatch, id]);
  return (
    <div className="md:py-10 py-4 mw ">
      <div className="flex items-center text-zinc-500 gap-4 font-medium pb-4 px-4 md:px-0 md:mb-10">
        <Link to={"/cars"}>Cars</Link>{" "}
        <ChevronDoubleRightIcon className="h-5" />{" "}
        <span className="text-primary">{product?.brand}</span>
      </div>
      <div className="w-full grid md:grid-cols-2 gap-4">
        <div className="car_item_1">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            style={{
              height: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {product?.images.map(
              (
                img: any,
                index: number // Added parentheses and index parameter
              ) => (
                <SwiperSlide
                  key={index}
                  style={{ padding: "5px", height: "inherit" }}
                >
                  {" "}
                  {/* Added key prop */}
                  <img
                    src={img.url}
                    alt=""
                    style={{ height: "4px solid yellow" }}
                    className="aspect-3/4 col-span-3 rounded"
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
          <h1 className="prod_des pl-4 md:pl-0">Description</h1>
          <p className="px-4 md:px-0">{product?.description}</p>
        </div>

        <div className="flex flex-col gap-4 md:min-h-700px ">
          <div className="bg-zinc-100 rounded p-4 row-span-2 flex flex-col justify-between md:h-full">
            <div>
              <h4 className="text-lg font-medium">{product?.name}</h4>
              <p className="text-sm">
                <span className="text-primary">
                  {product?.price && moneyFormat(product?.price)}
                </span>
                <small className="text-primary ml-0.5 mr-2">
                  {product?.negotiable ? "Negotiatable" : ""}
                </small>{" "}
                {/* {product?.milage} mi. */}
              </p>
              <p className="text-xs text-zinc-500">
                Market price:{" "}
                {product?.price &&
                  moneyFormat(product?.price + 1000000) +
                    " - " +
                    moneyFormat(product?.price + 2000000)}
              </p>
              <p className="text-xs text-zinc-500 mb-5">
                location: {product?.location}
              </p>
            </div>
            <CallRequest />
          </div>
          <div className="bg-zinc-100 rounded p-4 flex flex-col justify-between md:h-full">
            <h4 className="text-lg font-medium">{car?.name} Autos</h4>
            <hr />
            <button className="py-4 w-full bg-primary text-white font-semibold rounded text-lg mb-2">
              View dealer's contact
            </button>
            <button className="py-4 w-full border border-primary text-primary font-semibold rounded text-lg">
              Start chat
            </button>
          </div>
        </div>
      </div>
      <CarsList title="Similar to this car" products={products} scroll={true} />
    </div>
  );
};

export default CarPage;
