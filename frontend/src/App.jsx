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
//import SideItemBar from "./utils/sideItemBar";

// Pages
import Appointment from "./pages/Appointment";
import Home from "./pages/home";
import Login from "./pages/login"; // Importing the login page
import Register from "./pages/register"; // Importing the register page

// Loading component
import Loading from "./utils/loading";

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Paths where Navbar and Footer should not appear
  const excludeNavbarFooter = ["/login", "/register"];
  const excludeLoadingScreen = [];

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
          !excludeLoadingScreen.includes(location.pathname) && (
           
              <Loading />
            
          )
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Appointment" element={<Appointment />} />
            <Route path="/login" element={<Login />} /> {/* Login route */}
            <Route path="/register" element={<Register />} />{" "}
            {/* Register route */}
            {/* Fallback route for undefined paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>

      {/* SideItemBar Compo */}
{ /*     {!excludeNavbarFooter.includes(location.pathname) && (
        <div className="hidden lgs:flex mds:flex items-center justify-center">
          <SideItemBar />
        </div>
      )} */}

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
