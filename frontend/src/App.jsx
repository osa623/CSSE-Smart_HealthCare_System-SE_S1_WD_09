import  { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

// Navbar and Footer components

import Navbar from './utils/navbar';
import Footerm from './utils/Footerm';
import SideItemBar from './utils/sideItemBar';


// Pages

import Home from './pages/home';

// Loading component
import Loading from "./utils/loading"


const AppContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="relative flex-col min-h-screen overflow-hidden lgs:items-center">
      <Navbar />
      <div className="flex-grow">
        {isLoading ? (
          <Loading />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />

          </Routes>
        )}
        
      </div>
       
       {/* SideItemBar Compo */}
      <div className='hidden lgs:flex mds:flex items-center justify-center'>
      < SideItemBar/>
      </div>

       {/* Mobile Footer Compo */}
      <div className='hidden sms:flex'>
      <Footerm />
      </div>

    </div>
  );
};

const App = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;
