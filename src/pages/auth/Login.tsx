import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../state/store";
import { useEffect, useState } from "react";
import { loginUser } from "../../state/auth/userSlice";
import { CircularProgress } from "@mui/material";
import { openModal } from "../../state/auth/errorSlice";

interface LoginFormData {
  email: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const { logSuccess, error, loading } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  useEffect(() => {
    if (error) {
      dispatch(openModal({ message: error, success: false, open: true }));
    }
  }, [error]);

  useEffect(() => {
    if (logSuccess) {
      dispatch(
        openModal({
          message: "Login Successful",
          success: true,
          open: true,
        })
      );
      navigate("/");
    }
  }, [logSuccess, dispatch, navigate]);

  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="">Email</label>
        <input
          type="text"
          className="py-2 px-4 w-full rounded border"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="">Password</label>
        <input
          type="password"
          className="py-2 px-4 w-full rounded border"
          name="password"
          onChange={handleChange}
          value={user.password}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white font-semibold text-lg rounded py-4"
      >
        {!loading ? (
          "Login"
        ) : (
          <CircularProgress sx={{ color: "white" }} size={20} />
        )}
      </button>
      <p className="w-max">
        Don't have an account?{" "}
        <Link to={"/auth/signup"} className="text-primary">
          Signup
        </Link>
      </p>
    </>
  );
};

export default Login;
