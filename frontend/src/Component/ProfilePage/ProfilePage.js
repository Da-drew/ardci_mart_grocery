import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import { Eye, EyeOff } from "react-feather";
import axios from "axios";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const { user, updateUser, setUser } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    password: user.password,
    full_name: user.full_name,
    email: user.email,
    address: user.address,
    phone_number: user.phone_number,
    avatar: `${process.env.PUBLIC_URL}${user.avatar}`,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setEditMode(false);
  };

  const handleLogout = async () => {
    try {
      // Update online status to 0 (offline)
      await axios.post(
        `http://localhost:8081/customer-user/${user.id}/online`,
        {
          is_online: 0,
        }
      );
      // Clear the user session
      setUser(null); // Clear user context
      // Optionally, clear the cookie
      Cookies.remove("userSession");
      // Redirect to login page or any other action
      window.location.href = "/login"; // Adjust the path as needed
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="profile-page p-6 bg-white shadow-md rounded-md max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      {!editMode ? (
        <div>
          <div className="profile-avatar mb-4">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div className="profile-details">
            <p className="mb-2">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="mb-2">
              <strong>Name:</strong> {user.full_name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="mb-2">
              <strong>Address:</strong> {user.address}
            </p>
            <p className="mb-2">
              <strong>Phone Number:</strong> {user.phone_number}
            </p>
          </div>
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit Profile
          </button>
          {/* Add the Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-4 ml-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Form fields for editing profile */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-0 transform -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-85 transition-all"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avatar URL
            </label>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setEditMode(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
