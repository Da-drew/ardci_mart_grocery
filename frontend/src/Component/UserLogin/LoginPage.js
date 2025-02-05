// import React, { useState, useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { UserContext } from "../UserContext/UserContext";
// import { authenticateUser } from "./Auth";
// import Cookies from "js-cookie";

// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const { login, setUser } = useContext(UserContext);
//   const navigate = useNavigate();
//   const currentLocation = useLocation(); // Rename 'location' to 'currentLocation'

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (username && password) {
//       try {
//         const user = authenticateUser(username, password);

//         if (user) {
//           await login(user);
//           setUser(user);

//           if (rememberMe) {
//             Cookies.set("userSession", JSON.stringify(user), { expires: 1 });
//           } else {
//             Cookies.remove("userSession");
//           }

//           const slug = localStorage.getItem("pendingSlug"); // No need to parse

//           if (slug) {
//             navigate(`/shop/${slug}`);
//             localStorage.removeItem("pendingSlug"); // Remove slug after navigating
//           } else {
//             const redirectTo = currentLocation.state?.from?.pathname || "/";
//             navigate(redirectTo);
//           }
//         } else {
//           setError("Invalid username or password");
//           setPassword("");
//         }
//       } catch (err) {
//         console.error("Login error:", err);
//         setError("An error occurred during login");
//       }
//     } else {
//       setError("Please enter both username and password");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Username"
//             className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <div className="flex items-center mb-4">
//             <input
//               type="checkbox"
//               id="rememberMe"
//               checked={rememberMe}
//               onChange={() => setRememberMe(!rememberMe)}
//               className="mr-2"
//             />
//             <label htmlFor="rememberMe" className="text-sm">
//               Remember Me
//             </label>
//           </div>
//           {error && (
//             <p className="text-red-500 text-sm text-center mb-4">{error}</p>
//           )}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";
import { authenticateUser } from "./Auth";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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
          setError("Invalid username or password");
          setPassword("");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm">
              Remember Me
            </label>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
