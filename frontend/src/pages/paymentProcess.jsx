import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import axios from "axios";
import {
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaCreditCard,
  FaPaypal,
  FaShieldAlt,
} from "react-icons/fa"; // Updated imports
import jsPDF from "jspdf"; // Import jsPDF for PDF generation

const PaymentProcess = () => {
  const location = useLocation(); // Use useLocation to access passed state
  const { selectedAppointments, totalCharge } = location.state || {
    selectedAppointments: [],
    totalCharge: 0,
  }; // Destructure state

  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [tax, setTax] = useState(0);

  // Calculate tax (2.5%)
  const taxRate = 0.025;

  // Fetch user profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      const email = sessionStorage.getItem("userEmail");
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${email}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Calculate total charge with tax
  const totalWithTax = totalCharge + totalCharge * taxRate;

  // Handle PDF generation on payment confirmation
  const handleConfirmPayment = () => {
    const doc = new jsPDF();
    doc.text("Payment Confirmation", 20, 20);
    doc.text(`Name: ${profile.name}`, 20, 30);
    doc.text(`Email: ${profile.email}`, 20, 40);
    doc.text(`Total Amount: $${totalWithTax.toFixed(2)}`, 20, 50);
    doc.text(`Payment Method: ${paymentMethod}`, 20, 60);
    doc.save("payment_confirmation.pdf");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-primary min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Payment Process</h1>
        <div className="mb-4">
          <h2 className="text-xl mb-2">User Information</h2>
          <p>
            <FaUser /> Name: {profile.name}
          </p>
          <p>
            <FaCalendarAlt /> Appointments:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedAppointments.map((id) => (
              <div key={id} className="bg-gray-100 p-4 rounded shadow-md">
                <FaClock /> {/* You can add more information here */}
                <p>Appointment Scheduled</p>{" "}
                {/* Replace with any other info if needed */}
              </div>
            ))}
          </div>
          <p className="text-lg font-semibold">
            <FaDollarSign /> Total Charge:{" "}
            <span className="text-green-500">${totalCharge.toFixed(2)}</span>
          </p>
          <p className="text-lg font-semibold">
            Tax (2.5%):{" "}
            <span className="text-green-500">
              ${(totalCharge * taxRate).toFixed(2)}
            </span>
          </p>
          <p className="text-lg font-semibold">
            Total Amount:{" "}
            <span className="text-green-500">${totalWithTax.toFixed(2)}</span>
          </p>
        </div>

        <div className="flex flex-col mt-4">
          <label className="mb-2">Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="p-2 border rounded mb-4"
          >
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="insurance">Insurance</option>
          </select>

          {/* Payment Method Specific Fields */}
          {paymentMethod === "credit" && (
            <div>
              <FaCreditCard /> <label>Credit Card Number:</label>
              <input type="text" className="p-2 border rounded w-full mb-2" />
              <label>Expiry Date:</label>
              <input type="text" className="p-2 border rounded w-full mb-2" />
            </div>
          )}
          {paymentMethod === "debit" && (
            <div>
              <FaCreditCard /> <label>Debit Card Number:</label>
              <input type="text" className="p-2 border rounded w-full mb-2" />
              <label>Expiry Date:</label>
              <input type="text" className="p-2 border rounded w-full mb-2" />
            </div>
          )}
          {paymentMethod === "paypal" && (
            <div>
              <FaPaypal /> <label>PayPal Email:</label>
              <input type="email" className="p-2 border rounded w-full mb-2" />
            </div>
          )}
          {paymentMethod === "insurance" && (
            <div>
              <FaShieldAlt /> <label>Insurance Provider:</label>
              <input type="text" className="p-2 border rounded w-full mb-2" />
              <label>Policy Number:</label>
              <input type="text" className="p-2 border rounded w-full mb-2" />
            </div>
          )}
        </div>

        <button
          onClick={handleConfirmPayment}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default PaymentProcess;
