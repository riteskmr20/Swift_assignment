// components/Dashboard.tsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";




const DashboardLayout: React.FC = () => {
    const { userName } = useUser();

    return (
        <div className="min-h-screen bg-gray-50 ">
            {/* Top Bar - Static */}
            <div className="bg-[#1E244D] text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="bg-green-600 text-white font-bold px-2 py-1 rounded">
                        S
                    </div>
                    <span className="font-semibold text-lg">WIFT</span>
                </div>

                {/* User Avatar + Name */}
                <Link to="/dashboard/profile" >
                    <div className="flex items-center gap-2">
                        {userName ?
                            <>
                                <div className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                                    {userName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                </div>
                                <span>{userName}</span>
                            </> : <>
                                <div className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                                    {"P"}
                                </div>
                                <span>{"Profile"}</span>
                            </>
                        }

                    </div>
                </Link>
            </div>

            {/* Scrollable section */}
            <div className="mt-6 mb-6 scrollbar-thin max-h-[calc(100vh-64px)] px-6">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
