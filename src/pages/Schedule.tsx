import React, { useState } from "react";
import { banner1, banner2, banner3 } from "../assets";
import { region, city } from "../data/region";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { url } from "../state/products/productSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const Schedule = () => {
  const [value, setValue] = useState<null>();

  const [data, setData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    state: "",
    city: "",
  });
  const [address, setAddress] = useState<string>(""); // Initialize address with an empty string
  const [date, setDate] = useState<any>(""); // Initialize address with an empty string
  console.log(data);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleChange2: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    // Your event handling logic here
    setAddress(e.target.value);
  };
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
    console.log(data);
  };
  const formUpload = async () => {
    try {
      const response = await axios.post(`${url}/schedule-inspection`, {
        ...data,
        address,
        scheduleDate: date,
      });
      console.log(response?.data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const handleSubmit = async () => {
    console.log("submitting");
    const status = await formUpload();
    if (status) {
      toast.success("success", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error("Invalid / Incomplete Credentials", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <section className="grid md:grid-cols-2 bg-yellow-50">
      <div className="md:h-screen py-20 md:py-0 md:sticky top-0 bg-gradient-to-br from-primary/50 to-secondary/50 flex flex-col justify-center items-center p-4">
        {/* <img src={bannerperson} alt="" /> */}
        <div className="md:mb-20 mb-10">
          <h1 className="md:text-5xl text-3xl max-w-2xl text-center font-semibold">
            The easiest and most reliable way to sell your car
          </h1>
        </div>
        <div className="grid grid-cols-3">
          <img src={banner1} alt="" />
          <img src={banner2} alt="" />
          <img src={banner3} alt="" />
        </div>
      </div>
      <div className="md:p-10 p-4 py-10">
        <h1 className="text-3xl font-semibold">Schedule An Inspection</h1>
        <p className="max-w-md text-zinc-500">
          Mango Cars-inspected vehicles sell notably faster than those without
          inspection.
        </p>

        <form className="flex flex-col gap-5 mt-10">
          <div className="py-8 px-10 bg-white rounded flex flex-col gap-5 ">
            <h3 className="text-xl font-semibold">Personal Info</h3>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={data.fullName}
                onChange={handleChange}
                className="py-2 px-4 w-full rounded border"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={handleChange}
                className="py-2 px-4 w-full rounded border"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Email</label>
              <input
                type="text"
                value={data.email}
                name="email"
                onChange={handleChange}
                className="py-2 px-4 w-full rounded border"
              />
            </div>
          </div>
          <div className="py-8 px-10 bg-white rounded flex flex-col gap-5 ">
            <h3 className="text-xl font-semibold">Pickup Location</h3>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="">State</label>

                <select
                  name="state"
                  className="py-2 px-4 w-full rounded border"
                  value={data.state}
                  onChange={handleChangeSelect}
                >
                  {" "}
                  <option value="" disabled selected hidden>
                    Select State
                  </option>
                  {region.map((item) => (
                    <option key={item} value={item}>
                      {" "}
                      {item}{" "}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="">City</label>
                <select
                  name="city"
                  className="py-2 px-4 w-full rounded border"
                  value={data.city}
                  onChange={handleChangeSelect}
                >
                  {" "}
                  <option value="" disabled selected hidden>
                    Select City
                  </option>
                  {city.map((item) => (
                    <option key={item} value={item}>
                      {" "}
                      {item}{" "}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Address</label>
              <textarea
                name="address"
                value={address}
                onChange={handleChange2}
                className="py-2 px-4 w-full rounded border"
              ></textarea>
            </div>
          </div>
          <div className="py-8 px-10 bg-white rounded flex flex-col gap-5 ">
            <h3 className="text-xl font-semibold">Date & Time</h3>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                {/* <label htmlFor="">Date</label> */}
                {/* <input
                  type="text"
                  className="py-2 px-4 w-full rounded border"
                /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    className="py-2 px-4 w-full rounded border"
                    name="scheduleDate"
                    value={null}
                    onChange={
                      (newValue) => {
                        const dateTimeString = newValue?.format(
                          "YYYY-MM-DD HH:mm:ss"
                        );
                        setDate(dateTimeString ? dateTimeString : "");
                      }

                      //   setData((prev) => ({ ...prev, scheduleDate: newValue }))
                    }
                  />
                </LocalizationProvider>
              </div>
              {/* <div className="flex flex-col gap-1">
                <label htmlFor="">Time</label>
                <input
                  type="text"
                  className="py-2 px-4 w-full rounded border"
                />
              </div> */}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={handleSubmit}
            className="w-full bg-primary text-white font-semibold text-lg rounded py-4"
          >
            Schedule Inspection
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Schedule;
