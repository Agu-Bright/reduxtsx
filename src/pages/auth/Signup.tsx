import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, registerUser } from "../../state/auth/userSlice";
import { AppDispatch, RootState } from "../../state/store";
import { openModal } from "../../state/auth/errorSlice";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const { regSuccess, error, loading } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();

  interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
  }
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };

  useEffect(() => {
    if (error) {
      dispatch(openModal({ message: error, success: false, open: true }));
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (regSuccess) {
      dispatch(
        openModal({
          message: "Registration Successful",
          success: true,
          open: true,
        })
      );
      navigate("/");
    }
  }, [regSuccess, dispatch, navigate]);

  return (
    <>
      <div className="grid grid-cols-2 gap-5 w-full">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="">First Name</label>
          <input
            type="text"
            name="firstName"
            className="py-2 px-4 w-full rounded border"
            value={user.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="py-2 px-4 w-full rounded border"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 w-full">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="py-2 px-4 w-full rounded border"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="">Phone</label>
          <input
            type="number"
            className="py-2 px-4 w-full rounded border"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="">Password</label>
        <input
          className="py-2 px-4 w-full rounded border"
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="">Confirm Pasword</label>
        <input
          className="py-2 px-4 w-full rounded border"
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white font-semibold text-lg rounded py-4"
      >
        {!loading && "Sign Up"}
        {loading && <CircularProgress sx={{ color: "white" }} size={20} />}
      </button>
      <p className="w-max">
        Already have an account?{" "}
        <Link to={"/auth/login"} className="text-primary">
          Login
        </Link>
      </p>
    </>
  );
};

export default Signup;
