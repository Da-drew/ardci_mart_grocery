import React, { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { authenticateUser } from "./Auth";
import Cookies from "js-cookie";
import bbg from "../Assets/doodle.png";
import {
  AiOutlineCloseCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { login, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username && password) {
      try {
        // Await the authenticateUser function to get the user data
        const user = await authenticateUser(username, password);

        if (user) {
          await login(user);
          setUser(user);

          if (rememberMe) {
            Cookies.set("userSession", JSON.stringify(user), { expires: 1 });
          } else {
            Cookies.remove("userSession");
          }

          const slug = localStorage.getItem("pendingSlug");

          if (slug) {
            navigate(`/shop/${slug}`);
            localStorage.removeItem("pendingSlug");
          } else {
            const redirectTo = currentLocation.state?.from?.pathname || "/";
            navigate(redirectTo);
          }
        } else {
          setError(
            <div className="relative pl-5 text-left">
              <AiOutlineCloseCircle
                size={17}
                className="absolute top-1 -left-1"
              />{" "}
              Your account and/or password is incorrect, <br /> please try
              again.
            </div>
          );
          setPassword("");
          setIsTyping(false);
        }
      } catch (err) {
        console.error("Login error:", err);
        setError("An error occurred during login");
      }
    } else {
      setError("Please enter both username and password");
    }
  };

  return (
    <div className="flex h-screen bg-slate-400">
      {/* Left Section with Background Image & Overlay */}
      <div className="w-3/5 bg-[#1b8057] relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bbg})` }}
        ></div>
        {/* Content - Ensure it's above the overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-8">
          <h1 className="text-5xl mb-5 font-semibold">
            Welcome to ARDCI Mart Online
          </h1>
          <p className="text-lg text-center w-3/4">
            Discover the best shopping experience at ARDCI Mart! Fresh products,
            great deals, and seamless online shopping—all in one place.
          </p>
          <Link
            type="button"
            className="mt-9 text-base font-semibold border-2 border-[#f8bd19] bg-[#f8bd19] hover:bg-[#f8b119] hover:border-[#f8c519] focus:ring-1 focus:ring-yellow-300 rounded-lg px-8 py-2.5 transition-all duration-150 shadow-lg uppercase"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="login-right w-2/5 flex flex-col justify-center bg-[#fafafa] relative">
        <div className="right-log">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl uppercase mb-5 font-bold font-poppins tracking-wider opacity-80">
              User Login
            </h2>

            {/* Error Messsage  */}
            {error && (
              <p className="text-red-500 text-sm text-center mb-6 py-3 px-4 border border-red-500 rounded-sm">
                {error}
              </p>
            )}

            {/* Username Input */}
            <form
              onSubmit={handleLogin}
              className="w-full flex flex-col items-center justify-center"
            >
              <div className="mb-4 w-2/4 flex flex-col items-center justify-center">
                <input
                  type="text"
                  className="bg-[#c6ffe8] text-gray-900 text-sm  block w-full p-2.5 rounded-full px-7 focus:outline-none focus:drop-shadow"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="mb-2 w-2/4 flex flex-col items-center justify-center relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="bg-[#c6ffe8] text-gray-900 text-sm  block w-full p-2.5 rounded-full px-7 focus:outline-none focus:drop-shadow"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setIsTyping(e.target.value.length > 0);
                  }}
                  required
                />
                {isTyping && (
                  <span
                    className="absolute right-5 top-2.5 text-gray-600 cursor-pointer select-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </span>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="mb-8 mt-2 px-3 w-2/4 flex justify-between text-[13px] text-gray-600">
                {/* Remember Me Checkbox */}
                <label className="flex items-center hover:cursor-pointer select-none">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2 accent-green-600 hover:cursor-pointer"
                  />
                  Remember Me
                </label>

                {/* Forgot Password Link */}
                <Link className="text-green-600 hover:underline hover:cursor-pointer">
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="text-white bg-[#1b8057] hover:bg-[#1d704f] focus:ring-2 focus:ring-green-700 font-medium rounded-full text-sm px-5 py-2.5 transition-all w-1/4 drop-shadow"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        {/* footer */}
        <div className="absolute bottom-0 left-0">
          <footer className="py-3 px-5 text-gray-600">
            <div className="container mx-auto flex justify-between items-center">
              <p className="text-xs">ARDCI Mart</p>
              <p className="text-xs">
                <span className="ml-1">&copy;</span> {new Date().getFullYear()}{" "}
                All Rights Reserved
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
