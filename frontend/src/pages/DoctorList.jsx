import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateDoctorModal from '../components/UpdateDoctorModal'; // Import the modal

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/doctors');
                setDoctors(response.data);
            } catch (err) {
                setError("Failed to fetch doctors");
                console.error("Error fetching doctors:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    // Function to delete a doctor by ID
    const deleteDoctor = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:3000/api/doctors/${id}`);
            setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor._id !== id));
            alert("Doctor deleted successfully");
        } catch (err) {
            console.error("Error deleting doctor:", err);
            alert("Failed to delete doctor: " + err.message);
        }
    };

    // Function to delete all doctors
    const deleteAllDoctors = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete all doctors?");
        if (!confirmDelete) return;

        try {
            await axios.delete('http://localhost:3000/api/doctors');
            setDoctors([]);
            alert("All doctors deleted successfully");
        } catch (err) {
            console.error("Error deleting doctors:", err);
            alert("Failed to delete doctors: " + err.message);
        }
    };

    // Function to open the update modal
    const handleUpdateClick = (doctor) => {
        setSelectedDoctor(doctor);
        setShowModal(true);
    };

    // Function to update a doctor
    const updateDoctor = async (updatedDoctor) => {
        try {
            await axios.put(`http://localhost:3000/api/doctors/${updatedDoctor._id}`, updatedDoctor);
            setDoctors((prevDoctors) =>
                prevDoctors.map((doc) => (doc._id === updatedDoctor._id ? updatedDoctor : doc))
            );
            alert("Doctor updated successfully");
        } catch (err) {
            console.error("Error updating doctor:", err);
            alert("Failed to update doctor: " + err.message);
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">List of Doctors</h2>
            <button
                onClick={deleteAllDoctors}
                className="mb-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-200"
            >
                Delete All Doctors
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.map((doctor) => (
                    <div key={doctor._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-200">
                        <h3 className="font-bold text-lg">Dr.{doctor.doctorName}</h3>
                        <p className="text-sm">Doctor ID: {doctor.doctorId}</p>
                        <p className="text-sm">Specialization: {doctor.specialization}</p>
                        <p className="text-sm">Time: {doctor.time}</p>
                        <p className="text-sm">Seat Count: {doctor.seatCount.join(', ')}</p>
                        <button
                            onClick={() => handleUpdateClick(doctor)}
                            className="mt-2 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-500"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => deleteDoctor(doctor._id)}
                            className="mt-2 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-500"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            {showModal && (
                <UpdateDoctorModal
                    doctor={selectedDoctor}
                    onUpdate={updateDoctor}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default DoctorList;
