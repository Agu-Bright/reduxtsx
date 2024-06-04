import { cars } from "../../assets";
import FilterBar from "../app/FilterBar";
export const HeaderSection = () => {
  return (
    <section className="relative mb-40 md:mb-0">
      <img
        src={cars}
        className="w-screen h-full md:h-[543px] absolute top-0 left-0 z-0"
        alt=""
      />
      <div className="h-full  md:h-[543px] w-full bg-gradient-to-br from-zinc-600/50 to-black/50 z-10 relative">
        <div className=" p-4 md:w-4/5 mx-auto text-white h-full flex flex-col justify-between md:pt-20">
          <div>
            <h1 className="md:text-5xl text-3xl text-center md:text-start font-bold whitespace-nowrap">
              Mango Cars Marketplace
            </h1>
            <p className="md:text-3xl text-lg text-center md:text-start font-semibold md:mt-10">
              We buy, sell and swap only quality cars
            </p>
          </div>
          <div className="bg-zinc-300 rounded md:rounded-none md:h-1/2 md:p-10 p-4 text-black  -mb-48 mt-10 md:m-0">
            <ul className="flex gap-5 justify-center md:justify-start text-xl font-semibold">
              <li className="border-b-2 border-b-primary pb-1">
                Shop cars for sale
              </li>
              <li className="pb-1 border-b-2 border-b-zinc-200 ">
                Sell your car
              </li>
            </ul>
            <FilterBar />
          </div>
        </div>
      </div>
    </section>
  );
};
