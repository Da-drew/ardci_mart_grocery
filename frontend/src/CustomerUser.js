import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa6";
import { TiUserAdd } from "react-icons/ti";

const CustomerUser = () => {
  const [customerUser, setCutsomerUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/customer-user")
      .then((res) => setCutsomerUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8081/customer-user/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-600 justify-center items-center">
      <div className="w-full mx-10 bg-white rounded p-6">
        <div className="w-10 h-10 flex items-center justify-center">
          <Link
            to="/create-customer-user"
            className="bg-[#1b8057] p-2 rounded-full w-full h-full flex items-center justify-center transition-all hover:scale-105"
          >
            <TiUserAdd size={30} className="text-white" />
          </Link>
        </div>

        <table className="table-auto w-full mt-4">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Password</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Zip Code</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Avatar</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {customerUser.map((data, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{data.full_name}</td>
                <td className="px-4 py-2">{data.email}</td>
                <td className="px-4 py-2">{data.username}</td>
                {/* Hide the password by replacing it with asterisks */}
                <td className="px-4 py-2">**********</td>
                <td className="px-4 py-2">{data.address}</td>
                <td className="px-4 py-2">{data.zip_code}</td>
                <td className="px-4 py-2">{data.phone_number}</td>
                <td className="px-4 py-2">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={data.avatar}
                    alt={data.full_name}
                  />
                </td>
                <td className="px-4 py-2">
                  <Link to={`/update-customer-user/${data.id}`} className="">
                    <div className="flex items-center justify-center text-blue-500 hover:text-blue-900 transition-all hover:underline">
                      <span>
                        <BsFillPencilFill size={20} />
                      </span>
                      <span className="ml-2">Edit</span>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <button onClick={(e) => handleDelete(data.id)}>
                    <div className="flex items-center text-red-400 hover:text-red-600 transition-all hover:underline">
                      <span>
                        <FaTrash size={20} />
                      </span>
                      <span className="ml-2">Delete</span>
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerUser;
