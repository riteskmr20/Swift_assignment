// components/UserProfileShimmer.tsx
import React from "react";

const UserProfileShimmer: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 mt-10 animate-pulse">
      {/* Back Button */}
      <div className="h-4 w-20 bg-gray-200 rounded mb-6"></div>

      {/* Welcome Title */}
      <div className="h-8 w-64 bg-gray-200 rounded"></div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8 border border-gray-100">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="bg-gray-200 w-20 h-20 rounded-full"></div>
          <div className="text-center sm:text-left space-y-2">
            <div className="h-5 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          {[...Array(5)].map((_, i) => (
            <div key={i}>
              <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
              <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfileShimmer;
