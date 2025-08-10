import React, { useEffect, useState } from "react";
import UserProfileShimmer from "./UserProfileShimmer";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface APIUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
  };
  phone: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<APIUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { setUserName } = useUser();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data: APIUser[]) => {
        if (data.length > 0) {
          setUser(data[0]);
          setUserName(data[0].name); 
        }
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <UserProfileShimmer/>;
  }

  if (!user) {
    return <div className="p-4 text-center text-red-500">Failed to load user.</div>;
  }

  const { name, email, id, phone, address } = user;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const fullAddress = `${address.street}, ${address.suite}, ${address.city}`;

  return (
    <div className="max-w-4xl mx-auto px-4 mt-10">
      <button className="text-sm text-gray-600 hover:text-gray-800 mb-6 flex items-center gap-1">
           <Link to="/dashboard/comments"><span className="">&larr;</span> Back</Link>
        </button>
                <h1 className="text-3xl font-bold text-gray-800">
          Welcome, <span className="text-indigo-600">{name}</span>
        </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 mt-8 border border-gray-100">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xl shadow">
            {initials}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <div>
            <label className="block text-sm text-gray-500">User ID</label>
            <input
              type="text"
              value={id}
              readOnly
              className="w-full border border-gray-200 rounded px-3 py-2 bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500">Name</label>
            <input
              type="text"
              value={name}
              readOnly
              className="w-full border border-gray-200 rounded px-3 py-2 bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500">Email ID</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full border border-gray-200 rounded px-3 py-2 bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500">Address</label>
            <input
              type="text"
              value={fullAddress}
              readOnly
              className="w-full border border-gray-200 rounded px-3 py-2 bg-gray-50 truncate"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500">Phone</label>
            <input
              type="text"
              value={phone}
              readOnly
              className="w-full border border-gray-200 rounded px-3 py-2 bg-gray-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
