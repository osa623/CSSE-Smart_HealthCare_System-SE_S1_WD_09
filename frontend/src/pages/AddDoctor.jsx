import React, { useState } from 'react';
import axios from 'axios';

const AddDoctor = () => {
    const [doctor, setDoctor] = useState({
        doctorName: '',
        specialization: '',
        time: '',
        seatCount: [],
    });

    const seatsTotal = 30; // Total number of seats
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Handle input changes for other fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor({
            ...doctor,
            [name]: value,
        });
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
        try {
            const response = await axios.post('http://localhost:3000/api/doctors', {
                ...doctor,
                seatCount: selectedSeats,
            });
            alert(response.data.msg);
            setDoctor({ doctorName: '', specialization: '', time: '', seatCount: [] });
            setSelectedSeats([]); // Clear selected seats after submission
        } catch (error) {
            console.error('Error adding doctor:', error);
            alert('Failed to add doctor');
        }
    };

    return (
        <div className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-md md:max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Doctor Name:</label>
                    <input
                        type="text"
                        name="doctorName"
                        value={doctor.doctorName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Specialization:</label>
                    <select
                        name="specialization"
                        value={doctor.specialization}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="">Select Specialization</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Neurology">Neurology</option>
                        {/* Add more specializations as needed */}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Time:</label>
                    <input
                        type="time"
                        name="time"
                        value={doctor.time}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Seat Selection Section */}
                <div className="mb-4">
                    <label className="block text-gray-700">Select Seats:</label>
                    <div className="grid grid-cols-5 gap-2 mt-2 sm:grid-cols-6 md:grid-cols-6">
                        {Array.from({ length: seatsTotal }, (_, index) => {
                            const seatNumber = index + 1;
                            const isSelected = selectedSeats.includes(seatNumber);
                            return (
                                <button
                                    type="button"
                                    key={seatNumber}
                                    onClick={() => toggleSeatSelection(seatNumber)}
                                    className={`p-2 border rounded-md text-center ${
                                        isSelected
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200'
                                    } transition-colors duration-200`}
                                >
                                    {seatNumber}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-200"
                >
                    Add Doctor
                </button>
            </form>
        </div>
    );
};

export default AddDoctor;
