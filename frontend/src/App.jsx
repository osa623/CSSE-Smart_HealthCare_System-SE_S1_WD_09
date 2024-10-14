import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

// Navbar and Footer components
import Navbar from "./utils/navbar";
import Footerm from "./utils/Footerm";
import SideItemBar from "./utils/sideItemBar";

// Pages
import Home from "./pages/home";
import Login from "./pages/login"; // Importing the login page
import Register from "./pages/register"; // Importing the register page
import Profile from "./pages/Profile"; // Importing the profile page
import DisplayAppointments from "./pages/displayAppointments";
import PaymentProcess from "./pages/paymentProcess";
import AddDoctor from "./pages/AddDoctor";
import DoctorList from "./pages/DoctorList";
import AddMedicalReportForm from "./pages/AddMedicalReportForm";
import AddedReports from "./pages/AddedReports";
import ReportDetails from "./pages/ReportDetails";
import MedicalReportsDisplay from "./pages/medicalReportsDisplay";

// Loading component
import Loading from "./utils/loading";

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Paths where Navbar and Footer should not appear
  const excludeNavbarFooter = [
    "/",
    "/register",
    "/addDoctor",
    "/view-doctors",
    "/add-report",
    "/addedReports",
    "/report/:id",
  ];
  // Paths where loading screen should not appear
  const noLoadingPaths = [
    "/addDoctor",
    "/view-doctors",
    "/add-report",
    "/addedReports",
    "/report/:id",
  ];

  useEffect(() => {
    // Show loading screen only if the current path is not in the noLoadingPaths array
    if (
      !noLoadingPaths.some((path) =>
        new RegExp(path.replace(":id", "\\d+")).test(location.pathname)
      )
    ) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false); // Ensure loading is false for the excluded paths
    }
  }, [location]);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="relative flex-col min-h-screen overflow-hidden lgs:items-center">
      {/* Conditionally render Navbar based on the current path */}
      {!excludeNavbarFooter.includes(location.pathname) && <Navbar />}

      <div className="flex-grow">
        {isLoading ? (
          <Loading />
        ) : (
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} /> {/* Login route */}
            <Route path="/register" element={<Register />} />{" "}
            {/* Register route */}
            <Route path="/profile" element={<Profile />} />{" "}
            <Route path="/payment" element={<DisplayAppointments />} />{" "}
            <Route path="/payment-process" element={<PaymentProcess />} />{" "}
            <Route path="/medical-report" element={<MedicalReportsDisplay />} />{" "}
            {/* Profile route */}
            <Route path="/addDoctor" element={<AddDoctor />} />
            <Route path="/view-doctors" element={<DoctorList />} />
            <Route path="/add-report" element={<AddMedicalReportForm />} />
            <Route path="/addedReports" element={<AddedReports />} />
            <Route path="/report/:id" element={<ReportDetails />} />
            {/* Fallback route for undefined paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>

      {/* SideItemBar Component */}
      {!excludeNavbarFooter.includes(location.pathname) && (
        <div className="hidden lgs:flex mds:flex items-center justify-center">
          <SideItemBar />
        </div>
      )}

      {/* Conditionally render Footer based on the current path */}
      {!excludeNavbarFooter.includes(location.pathname) && (
        <div className="hidden sms:flex">
          <Footerm />
        </div>
      )}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
