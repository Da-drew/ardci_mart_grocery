import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCustomerUser = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userfullName, setUserFullName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userZipCode, setUserZipCode] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8081/create-customer-user", {
        userName,
        userPassword,
        userEmail,
        userfullName,
        userAddress,
        userZipCode,
        userPhoneNumber,
        userAvatar,
      })
      .then((res) => {
        console.log(res);
        navigate("/customer-user");
      })
      .catch((err) => {
        if (err.response) {
          console.error("Error while creating customer:", err.response.data); // Log the backend error message
        } else {
          console.error("Unknown error occurred:", err);
        }
      });
  }
  return (
    <div className="flex bg-gray-600 justify-center items-center p-10">
      <div className="w-1/2 bg-white rounded p-6">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl mb-4">Add Customer User</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Password
            </label>
            <input
              type="text"
              placeholder="Enter Password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter Fullname"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              onChange={(e) => setUserFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              onChange={(e) => setUserAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Zip Code
            </label>
            <input
              type="text"
              placeholder="Enter Zip Code"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              onChange={(e) => setUserZipCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Phonenumber
            </label>
            <input
              type="text"
              placeholder="Enter Phonenumber"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              onChange={(e) => setUserPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Avatar
            </label>
            <input
              type="text"
              placeholder="Enter Avatar URL"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              onChange={(e) => setUserAvatar(e.target.value)}
            />
          </div>

          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomerUser;
