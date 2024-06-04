import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../state/store";
import { useEffect, useState } from "react";
import { region } from "../../data/region";
import { registerUser, updateUser } from "../../state/auth/userSlice";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string | null;
  phoneNumber: string | null;
  region: string | null;
}
const Dealer = () => {
  const { user, error, loading, updateuserSuccess, regSuccess } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [logggedInUser, setLoggedInUser] = useState<any>();
  const [formUpload, setFormUpload] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    region: "",
  });
  useEffect(() => {
    if (user) {
      const name1 = user?.name.split(" ")[0];
      const name2 = user?.name.split(" ")[1];
      setLoggedInUser({
        firstName: name1,
        lastName: name2,
        email: user?.email,
      });
      setFormUpload({
        firstName: name1,
        lastName: name2,
        email: user?.email,
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        region: "",
      });
    }
    if (error) {
      toast.error(error, {
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
    if (updateuserSuccess) {
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
      navigate("/dashboard/dealer");
    }
    if (regSuccess) {
      toast.success("Registration Successful", {
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
      navigate("http://control.mangocars.co");
    }
  }, [user, error, updateuserSuccess, navigate, regSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormUpload({ ...formUpload, [name]: value });
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormUpload({ ...formUpload, [name]: value });
  };
  const handleUpdate = () => {
    dispatch(
      updateUser({
        phoneNumber: formUpload.phoneNumber || " ",
        region: formUpload.region || " ",
      })
    );
  };

  //register dealer
  const handleSubmit = () => {
    dispatch(registerUser(formUpload));
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-5 w-full">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="">First Name</label>
          <input
            type="text"
            name="firstName"
            value={
              logggedInUser ? logggedInUser?.firstName : formUpload.firstName
            }
            disabled={logggedInUser?.firstName ? true : false}
            className="py-2 px-4 w-full rounded border"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="py-2 px-4 w-full rounded border"
            disabled={logggedInUser?.lastName ? true : false}
            value={logggedInUser ? logggedInUser.lastName : formUpload.lastName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 w-full">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            className="py-2 px-4 w-full rounded border"
            onChange={handleChange}
            disabled={logggedInUser?.email ? true : false}
            value={logggedInUser ? logggedInUser.email : formUpload.email}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="">Phone</label>
          <input
            type="text"
            name="phoneNumber"
            className="py-2 px-4 w-full rounded border"
            onChange={handleChange}
            // value={formUpload?.phoneNumber || ""}
            value={formUpload.phoneNumber || ""}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="">Region</label>
        <select
          name="region"
          className="py-2 px-4 w-full rounded border"
          value={formUpload.region || ""}
          onChange={handleChangeSelect}
        >
          {" "}
          <option value="" disabled selected hidden>
            Select Region
          </option>
          {region.map((item) => (
            <option key={item} value={item}>
              {" "}
              {item}{" "}
            </option>
          ))}
        </select>
      </div>
      {!logggedInUser && (
        <>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              className="py-2 px-4 w-full rounded border"
              onChange={handleChange}
              value={formUpload.password}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="py-2 px-4 w-full rounded border"
              onChange={handleChange}
              value={formUpload.confirmPassword || ""}
            />
          </div>
        </>
      )}

      {logggedInUser ? (
        <div
          style={{ textAlign: "center", color: "white", cursor: "pointer" }}
          onClick={handleUpdate}
          className="w-full bg-secondary font-semibold text-lg rounded py-4"
        >
          {loading ? (
            <CircularProgress sx={{ color: "white" }} size={20} />
          ) : (
            "Submit"
          )}
        </div>
      ) : (
        <div
          style={{ textAlign: "center", color: "white", cursor: "pointer" }}
          onClick={handleSubmit}
          className="w-full bg-secondary font-semibold text-lg rounded py-4"
        >
          {loading ? (
            <CircularProgress sx={{ color: "white" }} size={20} />
          ) : (
            "Register"
          )}
        </div>
      )}

      <p className="w-max">
        Already have an account?{" "}
        <Link to={"/auth/login"} className="text-secondary">
          Login
        </Link>
      </p>
      <ToastContainer />
    </>
  );
};

export default Dealer;
