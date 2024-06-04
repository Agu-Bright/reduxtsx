import React, { useState, MouseEventHandler } from "react";
import axios from "axios";
import { url } from "../state/products/productSlice";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
interface Detail {
  name: string;
  phoneNumber: string; // Changed to string to match the state type
}

const CallRequest = () => {
  const [data, setData] = useState<Detail>({
    // Set initial state with correct type
    name: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post(`${url}/call-request`, data);

      if (response.statusText === "OK") {
        toast.success("request sent", {
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
    } catch (error: any) {
      toast.error(error.response.data.message, {
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
    <>
      <hr className="-mt-6" />
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          className="py-2 px-4 w-full rounded"
          name="name"
          id="name"
          onChange={handleChange}
          value={data.name}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="phoneNumber">Your Phone Number</label>
        <input
          type="text"
          className="py-2 px-4 w-full rounded"
          name="phoneNumber"
          id="phoneNumber"
          onChange={handleChange}
          value={data.phoneNumber}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="py-4 w-full bg-primary text-white font-semibold rounded text-lg"
      >
        Request a call
      </button>
      <ToastContainer />
    </>
  );
};

export default CallRequest;
