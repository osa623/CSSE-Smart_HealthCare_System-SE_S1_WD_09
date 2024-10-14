import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Doctor1 from "../assets/doctor1.png";
import Doctor2 from "../assets/doctor2.png"; // Add more images if needed
import axios from "axios"; // Import axios for making API requests
import { useNavigate } from "react-router-dom"; // Import for navigation

const Login = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Hook for navigation

  const slides = [
    {
      image: Doctor1,
      title: "Your Health, Your Schedule",
      subtitle: "Book Your Appointment",
      description:
        "Schedule your doctor appointments quickly and conveniently through our easy-to-use interface.",
    },
    {
      image: Doctor2,
      title: "Join Us Today",
      subtitle: "Explore Our Amazing Features",
      description:
        "Experience a seamless way to manage your health. Our platform offers everything you need to book and manage your appointments with ease.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      // POST request to authenticate user
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // If login is successful, navigate based on userLevel
      if (response.status === 200) {
        const { user } = response.data;

        // Store the user email in session storage
        sessionStorage.setItem("userEmail", user.email);

        // Verify if the email is stored
        const storedEmail = sessionStorage.getItem("userEmail");
        if (storedEmail === user.email) {
          console.log(`Email stored successfully: ${storedEmail}`);
        } else {
          console.error("Failed to store email.");
        }

        // Store user data in local storage
        localStorage.setItem("user", JSON.stringify(user));

        // Check userLevel and redirect accordingly
        if (user.userLevel === 0) {
          navigate("/home"); // Redirect to customer dashboard
        } else if (user.userLevel === 1) {
          navigate("/addDoctor"); // Redirect to seller dashboard
        }
      }
    } catch (err) {
      // Set error message if login fails
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-baseextra4 to-baseprimary w-full min-h-screen flex justify-center items-center p-6">
      <div className="relative flex flex-col sms:w-[95vw] lgs:flex-row h-auto w-auto justify-center items-center bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Left Section: Image & Welcome Text */}
        <div className="flex flex-col sms:w-full sms:h-auto lgs:w-[30vw] lgs:h-[75vh] bg-baseprimary p-8 justify-center items-center rounded-l-3xl">
          {/* Slider */}
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="flex justify-center items-center w-full h-[60%] overflow-hidden relative">
              {/* Image Section */}
              <img
                src={slides[currentSlide].image}
                alt="Doctor"
                className="w-full object-cover transition-all duration-700 ease-in-out" // Animation transition
              />
            </div>

            {/* Description Section */}
            <div className="flex flex-col lgs:w-[30vw] lgs:h-[75vh] bg-baseprimary lgs:p-2 justify-center lgs:items-center lgs:rounded-l-3xl">
              {/* Topic Section */}
              <div className="flex flex-col h-auto lgs:w-[25vw] justify-center items-center">
                <h2 className="flex flex-col font-ibmplexsans lgs:text-md text-primary">
                  {slides[currentSlide].title}
                  <div className="bg-primary h-[0.15rem] w-auto" />
                </h2>
                <h2 className="font-russoone lgs:text-3xl text-primary font-normal">
                  {slides[currentSlide].subtitle}
                </h2>
              </div>

              {/* Paragraph Section */}
              <div className="flex flex-col h-auto lgs:w-[20vw] justify-center items-center lgs:pt-5">
                <p
                  className="font-ibmplexsans text-primary text-md text-center"
                  style={{
                    fontWeight: "200",
                  }}
                >
                  {slides[currentSlide].description}
                </p>
              </div>

              {/* Design Section */}
              <div className="flex h-auto lgs:w-[20vw] justify-center items-center lgs:pt-5 lgs:space-x-5">
                <div
                  className="bg-primary h-[0.2rem] rounded-full w-[5rem]"
                  data-aos="fade-right"
                />
                <div
                  className="bg-primary h-3 w-3 rounded-full"
                  data-aos="zoom-in"
                />
                <div
                  className="bg-primary h-3 w-3 rounded-full"
                  data-aos="zoom-in"
                />
                <div
                  className="bg-primary h-[0.2rem] rounded-full w-[5rem]"
                  data-aos="fade-left"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Login Form */}
        <div className="flex flex-col sms:w-full sms:h-auto lgs:w-[45vw] lgs:h-[75vh] bg-white justify-center items-center p-10 rounded-r-3xl">
          <form
            className="flex flex-col w-full max-w-sm space-y-6"
            onSubmit={handleSubmit}
          >
            {/* Email Input with Icon */}
            <div className="flex items-center space-x-3 border border-basesecondary rounded-full p-3 focus-within:ring-2 focus-within:ring-baseprimary transition-all duration-300">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-baseprimary h-6"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input with Icon */}
            <div className="flex items-center space-x-3 border border-basesecondary rounded-full p-3 focus-within:ring-2 focus-within:ring-baseprimary transition-all duration-300">
              <FontAwesomeIcon icon={faLock} className="text-baseprimary h-6" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-baseprimary text-white rounded-full hover:bg-basesecondary transition-all duration-300 shadow-md hover:shadow-lg"
              style={{ boxShadow: "inset 0 6px 6px rgba(65,105,225,0.5)" }}
            >
              Login
            </button>

            {/* Register Link */}
            <div className="text-center text-sm text-baseextra1">
              <p>
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-baseprimary underline hover:text-basesecondary transition-colors duration-300"
                >
                  Register here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
