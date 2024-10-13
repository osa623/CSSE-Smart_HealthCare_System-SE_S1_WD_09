import React from 'react';
import { Link } from 'react-router-dom';
import { FiUserPlus, FiList, FiFilePlus, FiFileText } from 'react-icons/fi';

const Sidebar = () => {
    return (
        <div className="bg-gradient-to-b from-blue-900 to-blue-700 text-white w-64 h-screen p-5 shadow-xl flex flex-col justify-between">
            <div>
                <h2 className="text-3xl font-bold mb-6 tracking-wider text-center">
                    Healthcare <br /> Management
                </h2>
                <ul className="space-y-4">
                    <li>
                        <Link
                            to="/addDoctor" // Updated to the correct path
                            className="flex items-center space-x-3 text-lg font-medium p-2 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                        >
                            <FiUserPlus className="text-xl" />
                            <span>Add Doctor</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/view-doctors"
                            className="flex items-center space-x-3 text-lg font-medium p-2 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                        >
                            <FiList className="text-xl" />
                            <span>View Doctors</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/add-report"
                            className="flex items-center space-x-3 text-lg font-medium p-2 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                        >
                            <FiFilePlus className="text-xl" />
                            <span>Add Patient Report</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/addedReports"
                            className="flex items-center space-x-3 text-lg font-medium p-2 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                        >
                            <FiFileText className="text-xl" />
                            <span>Manage Reports</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="text-center text-sm text-gray-300">
                © 2024 Healthcare Management
            </div>
        </div>
    );
};

export default Sidebar;
