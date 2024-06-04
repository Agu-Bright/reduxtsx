import {
  Bars2Icon,
  MagnifyingGlassIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logo } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { logoutUser } from "../../state/auth/userSlice";
import { openModal } from "../../state/auth/errorSlice";
import { Avatar } from "@mui/material";
import { useState } from "react";

export const NavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const links = [
    { title: "Home", to: "/" },
    { title: "Buy Car", to: "/cars" },
    { title: "Sell Car", to: "/schedule" },
    { title: "Become an Agent", to: "/agent" },
    { title: "+234-777-444-2200", to: "/" },
  ];
  return (
    <header>
      <nav>
        <ul className="md:py-4 md:px-0 px-4 py-2 mw flex md:gap-10 gap-4 text-sm justify-end w-full bg-zinc-200 md:bg-transparent">
          <li>About Us</li>
          {user?.role === "seller" ? (
            <div
              onClick={() => navigate("/dashboard/dealer")}
              style={{
                cursor: "pointer",
                border: "1px solid green",
                paddingRight: "5px",
                paddingLeft: "5px",
                borderRadius: "2px  ",
              }}
            >
              dashboard
            </div>
          ) : (
            <li>
              <Link to={"/dealer"}>Register as a dealer </Link>
            </li>
          )}
        </ul>
        <div className="px-4 py-2 mw flex justify-between text-sm items-center w-full md:hidden relative z-20">
          <Link to="/">
            <img src={logo} className="h-10" alt="" />
          </Link>

          <button
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? (
              <XMarkIcon className="h-6" />
            ) : (
              <Bars2Icon className="h-6" />
            )}
          </button>
          <ul
            className={`absolute top-14 left-0 bg-white w-full border-b overflow-hidden ${
              open ? "h-auto" : "h-0"
            }`}
          >
            {links.map(({ title, to }) => (
              <li className="">
                <Link
                  onClick={() => setOpen(false)}
                  to={to}
                  className="p-4 active:bg-zinc-200/50 border-b block w-full"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className=" bg-black text-white">
          <ul className="md:h-16 p-4 md:p-0 relative flex gap-2 md:gap-10 items-center justify-end w-full mw">
            <li className="md:absolute h-full w-full left-0 top-0 flex justify-center items-center">
              <div className="relative w-full md:w-1/3">
                <MagnifyingGlassIcon className="h-6 absolute left-4 top-2 text-black" />
                <input
                  placeholder="Let's find..."
                  type="text"
                  name="search"
                  // value={}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onChange={() => pathname != "/cars" && navigate("/cars")}
                  className="rounded-full py-2 pl-14 pr-4 w-full text-black"
                />
              </div>
            </li>

            {!focused && (
              <>
                <li className="z-10">
                  <Link
                    to={"/schedule"}
                    className="bg-primary rounded py-2 px-4 whitespace-nowrap"
                  >
                    Sell your car
                  </Link>
                </li>

                <li className="z-10 ">
                  {isAuthenticated ? (
                    <div
                      onClick={() => {
                        dispatch(logoutUser());
                        dispatch(
                          openModal({
                            open: true,
                            message: "logout successful",
                            success: true,
                          })
                        );
                        // dispatch(loadUser());
                      }}
                      className="flex gap-2 items-center"
                    >
                      {/* <UserIcon className="h-5" /> */}
                      <Avatar
                        sx={{
                          width: "30px",
                          height: "30px",
                          background: "#223822",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {user?.name[0]}
                      </Avatar>
                      <span style={{ color: "red", cursor: "pointer" }}>
                        logout
                      </span>
                    </div>
                  ) : (
                    <Link
                      to={"/auth/signup"}
                      className="flex items-center whitespace-nowrap"
                    >
                      Sign Up
                    </Link>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="hidden md:block bg-zinc-100">
          <ul className="mw h-24 relative flex gap-10 items-center justify-between w-full">
            <li>
              <Link to="/">
                <img src={logo} className="h-20" alt="" />
              </Link>
            </li>
            {links.map(({ title, to }) => (
              <li>
                <Link to={to}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
