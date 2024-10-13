import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddMedicalReportForm = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const reportData = {
                ...data,
                reportDate: new Date().toISOString(), // Automatically set report date
                followUpDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString() // Set follow-up date to one week later
            };
            
            const response = await axios.post("http://localhost:3000/api/medicalReport", reportData);
            alert("Medical Report added successfully");
            reset(); // Reset form after submission
        } catch (error) {
            console.error("Error submitting form:", error);
            if (error.response) {
                console.error("Response Data:", error.response.data);
                alert(`Failed to add medical report: ${error.response.data.message || "Unknown error"}`);
            } else {
                alert("Failed to add medical report: " + error.message);
            }
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Create Medical Report</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Sugar Level (mg/dL)</label>
                            <input
                                type="number"
                                {...register("sugarLevel", { required: true })}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Heart Rate (bpm)</label>
                            <input
                                type="number"
                                {...register("heartRate", { required: true })}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Blood Pressure (mmHg)</label>
                            <input
                                type="number"
                                {...register("bloodPressure", { required: true })}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cholesterol Level (mg/dL)</label>
                        <input
                            type="number"
                            {...register("cholesterolLevel", { required: true })}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                            <input
                                type="number"
                                {...register("weight", { required: true })}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                            <input
                                type="number"
                                {...register("height", { required: true })}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Symptoms</label>
                        <textarea
                            {...register("symptoms", { required: true })}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            rows="3"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Diagnosis</label>
                        <textarea
                            {...register("diagnosis", { required: true })}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            rows="3"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Treatment</label>
                        <textarea
                            {...register("treatment", { required: true })}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            rows="3"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Prescription</label>
                        <textarea
                            {...register("prescription", { required: true })}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            rows="3"
                            required
                        />
                    </div>
                    {/* Removed the Follow-up Date input field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                            {...register("notes")}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            rows="3"
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:bg-blue-700"
                        >
                            Submit Report
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMedicalReportForm;
