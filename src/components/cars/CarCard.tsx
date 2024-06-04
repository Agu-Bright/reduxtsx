import { ChevronDoubleRightIcon, StarIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { Link } from "react-router-dom";
import { generateArray, moneyFormat } from "../../functions/moneyFormat";
import { Products } from "../../types";
// import { useNavigate } from "react-router-dom";

const CarCard: FC<{
	_id: string;
	car: Products;
	yellow?: boolean;
	review?: boolean;
}> = ({ _id, car, yellow, review }) => {
  // const navigate = useNavigate()
  return (
    <Link to={"/cars/" + _id} className="rounded overflow-clip bg-zinc-100">
      <div className="relative">
        <img
          className="aspect-[4/3] rounded-b"
          src={car.images[1].url}
          alt=""
        />
        <div
          className={`flex items-center absolute ${
            review ? "top-0 left-0" : "right-0 bottom-0"
          } ${
            yellow ? "bg-secondary" : "bg-primary"
          } gap-1 py-1 px-4 text-white rounded-br rounded-tl`}
        >
          {!review ? (
            <>
              View <ChevronDoubleRightIcon className="h-4" />
            </>
          ) : (
            "Review"
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="md:text-lg text-base font-semibold">{review ? "" : car.name}</h3>
        {!review && (
          <div className="flex">
            {generateArray(5).map((i) => (
              <StarIcon
                className={`h-4 ${
                  car.rating && i <= car.rating
                    ? "text-amber-500"
                    : "text-zinc-300"
                }`}
              />
            ))}
          </div>
        )}
        <p className="text-zinc-500">Brand:{car.brand}</p>
        <p className="text-zinc-500 text-sm md:text-base">
          {review
            ? car.brand
            : car.price && moneyFormat(car.price) + " - " + car.milage + " mi."}
        </p>
      </div>
    </Link>
  );
};

export default CarCard;
