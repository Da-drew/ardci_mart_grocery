import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import TokenExpiryModal from "../Modal/TokenExpiryModal";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const adminName = localStorage.getItem("adminName");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/customer-user");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();

    const interval = setInterval(() => {
      fetchUsers();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/admin/users");
        setAdminUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch admin users:", error);
      }
    };
    fetchAdminUsers();
  }, []);

  const handleDeleteAdminUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/admin/users/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();

      if (expirationTime - currentTime <= 20 * 1000) {
        setShowModal(true);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDeleteCustomerUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/customer-user/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        console.warn("Token has already expired.");
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
        return;
      }

      try {
        await axios.post(
          "http://localhost:8081/admin/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        if (error.response && error.response.status === 403) {
          try {
            const expiredToken = localStorage.getItem("adminToken");
            const refreshResponse = await axios.post(
              "http://localhost:8081/admin/refresh-token",
              { expiredToken }
            );
            const newToken = refreshResponse.data.token;
            localStorage.setItem("adminToken", newToken);

            await axios.post(
              "http://localhost:8081/admin/logout",
              { adminId: refreshResponse.data.adminId }, // Send adminId directly
              { headers: { Authorization: `Bearer ${newToken}` } }
            );
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
          }
        } else {
          console.error("Logout failed:", error);
        }
      } finally {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminName");
        window.location.href = "/admin/login";
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showModal && <TokenExpiryModal onLogout={handleLogout} />}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Hello, {adminName || "Admin"}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Customer Users</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200">ID</th>
              <th className="px-4 py-2 bg-gray-200">Username</th>
              <th className="px-4 py-2 bg-gray-200">Password</th>
              <th className="px-4 py-2 bg-gray-200">Email</th>
              <th className="px-4 py-2 bg-gray-200">Status</th>
              <th className="px-4 py-2 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 border">{user.id}</td>
                <td className="px-4 py-2 border">{user.username}</td>
                <td className="px-4 py-2 border">{user.password}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  {user.is_online === 1 ? (
                    <span className="text-green-500">Online</span>
                  ) : (
                    <span className="text-red-500">Offline</span>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  <Link to={`/update-customer-user/${user.id}`}>
                    <button className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 mr-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteCustomerUser(user.id)}
                    className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Users</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200">ID</th>
              <th className="px-4 py-2 bg-gray-200">Username</th>
              <th className="px-4 py-2 bg-gray-200">Email</th>
              <th className="px-4 py-2 bg-gray-200">Last Login</th>
              <th className="px-4 py-2 bg-gray-200">Logout Time</th>
              <th className="px-4 py-2 bg-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((admin) => (
              <tr key={admin.admin_id}>
                <td className="px-4 py-2 border">{admin.admin_id}</td>
                <td className="px-4 py-2 border">{admin.username}</td>
                <td className="px-4 py-2 border">{admin.email}</td>
                <td className="px-4 py-2 border">
                  {admin.last_login ? (
                    new Date(admin.last_login).toLocaleString("en-US", {
                      timeZone: "Asia/Manila",
                    })
                  ) : (
                    <span className="text-red-500 italic text-sm">
                      No login time!
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {admin.logout_time ? (
                    new Date(admin.logout_time).toLocaleString("en-US", {
                      timeZone: "Asia/Manila",
                    })
                  ) : (
                    <span className="text-red-500 italic text-sm">
                      No logout time!
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  <Link to={`/update-admin-user/${admin.admin_id}`}>
                    <button className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 mr-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteAdminUser(admin.admin_id)}
                    className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminDashboard;
