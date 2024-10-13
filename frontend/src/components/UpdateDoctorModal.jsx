import React, { useState } from 'react';

const UpdateDoctorModal = ({ doctor, onUpdate, onClose }) => {
    const [formData, setFormData] = useState({ ...doctor });
    const seatsTotal = 30; // Total number of seats
    const [selectedSeats, setSelectedSeats] = useState(doctor.seatCount || []); // Initialize with doctor's current seats

    // Handle input changes for other fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Toggle seat selection
    const toggleSeatSelection = (seatNumber) => {
        setSelectedSeats((prevSeats) =>
            prevSeats.includes(seatNumber)
                ? prevSeats.filter((seat) => seat !== seatNumber)
                : [...prevSeats, seatNumber]
        );
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        await onUpdate({ ...formData, seatCount: selectedSeats }); // Send updated seat count
        onClose(); // Close modal after updating
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Update Doctor</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Doctor Name</label>
                        <input
                            type="text"
                            name="doctorName"
                            value={formData.doctorName}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Specialization</label>
                        <input
                            type="text"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Time</label>
                        <input
                            type="text"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 w-full"
                            required
                        />
                    </div>

                    {/* Seat Selection Section */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Select Seats:</label>
                        <div className="grid grid-cols-6 gap-2 mt-2">
                            {Array.from({ length: seatsTotal }, (_, index) => {
                                const seatNumber = index + 1;
                                const isSelected = selectedSeats.includes(seatNumber);
                                return (
                                    <button
                                        type="button"
                                        key={seatNumber}
                                        onClick={() => toggleSeatSelection(seatNumber)}
                                        className={`p-2 border rounded-md ${
                                            isSelected ? 'bg-green-500' : 'bg-gray-200'
                                        }`}
                                    >
                                        {seatNumber}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateDoctorModal;
