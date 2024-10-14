import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUserPlus, FiList, FiFilePlus, FiFileText, FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Menu Icon (Visible on smaller screens) */}
            <div className="p-4 fixed top-0 left-0 z-50"> {/* Removed background classes */}
                <FiMenu
                    size={30}
                    onClick={toggleSidebar}
                    className="cursor-pointer text-blue-900" // Custom color added to the icon
                />
            </div>

            {/* Sidebar */}
            <div
                className={`bg-gradient-to-b from-blue-900 to-blue-700 text-white w-64 h-screen fixed top-0 left-0 p-5 shadow-xl transform transition-transform duration-300 z-40 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`} // Slide sidebar in/out based on the isOpen state
            >
                {/* Close Icon (Visible on mobile screens when sidebar is open) */}
                <div className="sms:block md:hidden text-right">
                    <AiOutlineClose size={30} onClick={toggleSidebar} className="cursor-pointer" />
                </div>

                {/* Flex container to ensure footer stays near the bottom */}
                <div className="flex flex-col h-full">
                    <div className="flex-grow">
                        <h2 className="text-3xl font-bold mb-6 tracking-wider text-center">
                            MEDILINK
                        </h2>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    to="/addDoctor"
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

                    {/* Footer (pushed up a bit) */}
                    <div className="text-center text-sm text-gray-300 mt-4 mb-8">
                        © 2024 Medilink 
                    </div>
                </div>
            </div>

            {/* Background Overlay (Visible on mobile screens when sidebar is open) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30"
                    onClick={toggleSidebar} // Clicking outside the sidebar will also close it
                ></div>
            )}
        </>
    );
};

export default Sidebar;
