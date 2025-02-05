import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCustomerUser = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data based on the user ID
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/customer-user/${id}`
        );
        setUserData(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setFullName(response.data.full_name);
        setAddress(response.data.address);
        setZipCode(response.data.zip_code);
        setPhoneNumber(response.data.phone_number);
        setPassword(response.data.password);
        setAvatar(response.data.avatar);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/update-customer-user/${id}`, {
        userName: username,
        userEmail: email,
        userfullName: fullName,
        userAddress: address,
        userZipCode: zipCode,
        userPhoneNumber: phoneNumber,
        userPassword: password,
        userAvatar: avatar,
      });
      alert("User updated successfully");
      navigate("/customer-user");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!userData) {
    return <div>Loading customer data...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-600 justify-center items-center">
      <div className="w-1/2 bg-white rounded p-6">
        <h2 className="text-xl mb-4">Update Customer User</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Zip Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Avatar</label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomerUser;
