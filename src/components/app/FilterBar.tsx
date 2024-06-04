import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterBrand,
  filterLocation,
  filterMillage,
} from "../../state/products/productSlice";
import { useLocation } from "react-router-dom";

const brandArray = [
  "BMW",
  "Mercedes",
  "Lexus",
  "Toyota",
  "Volkswagen",
  "Ford",
  "Others",
];

const locationArray = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const millageArray = ["5000", "10000", "15000"];

const FilterBar = () => {
  const { pathname } = useLocation();

  return (
    <div
      className={`grid ${
        pathname != "/cars"
          ? "grid-rows-4 md:grid-rows-1 md:grid-cols-4"
          : "grid-cols-4 text-xs"
      } mt-4 md:mt-10 rounded overflow-clip border`}
    >
      <FilterSelect title={"Brand Model"} options={brandArray} />
      <FilterSelect title={"Location"} options={locationArray} />
      <FilterSelect title={"Milage"} options={millageArray} />

      <button className="bg-primary flex justify-center items-center font-semibold text-white">
        {pathname != "/cars" ? "Schedule an inspection" : "Show 500+ Matches"}
      </button>
    </div>
  );
};

const FilterSelect: FC<{ title: string; options: string[] }> = ({
  title,
  options,
}) => {
  const dispatch = useDispatch();
  //   const {} = useSelector((state) => state.product);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (title) {
      case "Brand Model":
        dispatch(filterBrand(e.target.value));
        break;
      case "Location":
        console.log("location setting");
        dispatch(filterLocation(e.target.value));
        break;
      case "Milage":
        dispatch(filterMillage(e.target.value));
        break;

      default:
        break;
    }
  };

  return (
    <div className="relative">
      <label className="absolute top-2 text-sm left-4">{title}</label>
      <select
        onChange={handleChange}
        className="pb-2 pt-8 px-4 appearance-none w-full border md:border-r-2"
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
      <ChevronDownIcon className="h-5 absolute bottom-1.5 md:bottom-2 right-2 md:right-4" />
    </div>
  );
};
export default FilterBar;
