import { Link } from "react-router-dom";

//images
import heroImage from '../assets/heroImage.png';
import heroBackground from '../assets/heroBackground.png';


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">

            {/* Hero Section for large and medium screens */}
            <section className="hidden lgs:flex mds:flex bg-primary py-12 lgs:mt-12">
              <div className="container mx-auto overflow-hidden flex flex-col bg-transparent lgs:h-[80vh] lgs:rounded-3xl lgs:w-[100vw] lgs:flex-row items-center justify-center">
              
                {/* Main 01 section */}
                  <div className= 'flex flex-col h-auto lgs:w-[50vw] overflow-hidden items-center justify-center bg-baseprimary lgs:h-[80vh]' style={{
                          boxShadow:'inset 0 5px 10px rgba(255,255,255,1), 0px 5px 10px rgba(0,0,0,0.4)',

                  }}>
                          {/* Background Section */}
                      <div className= 'flex flex-col h-auto lgs:w-[50vw] items-center justify-center bg-transparent lgs:h-[80vh]' style={{
                                              backgroundImage:`url(${heroBackground})`,
                                              backgroundSize:'cover',
                                              backgroundPosition:'center'
                      }}>

                              {/* Text and Button Section */}
                                <div className="text-white lgs:h-auto  bg-transparent lgs:space-y-6">

                                  <h1 className="flex flex-col text-5xl font-russoone lg:text-5xl font-semibold mb-6">
                                  Your Health, Our Priority{''}
                                  <div className="bg-primary h-[0.18rem] lgs:w-1/2 lgs:mt-2"/>
                                  </h1>
                                  <p className="text-lg mb-6 lgs:w-[35vw]" style={{ fontWeight:'400'}}>
                                  At MediLink, we are dedicated to providing personalized, compassionate healthcare tailored to your needs. Whether you’re looking for routine checkups, specialist consultations, or urgent care, our team of experienced doctors is here for you. Schedule your appointments effortlessly and start your journey toward better health today</p>


                                  <Link to='/Appointment' className="flex lgs:mt-12 bg-blue-600 lgs:w-[12rem] items-center justify-center lgs:h-[3rem] font-ibmplexsans rounded-full hover:scale-110 transition-transform duration-300 ease-in-out"
                                  style={{
                                  boxShadow:'inset 0 2px 5px rgba(255,255,255,0.5), 0px 5px 10px rgba(0,0,0,0.4)'
                                  }}>
                                  Book an Appointment
                                  </Link>
                                  </div>

                      </div>



                  </div>

                {/* Main 02 section */}
                  <div className="flex flex-col h-auto lgs:w-[50vw] items-center justify-center bg-primary lgs:h-[80vh]"
                  style={{
                    boxShadow:'inset 0 2px 10px rgba(0,0,0,0.5), 0px 5px 10px rgba(0,0,0,0.4)'
                  }}>
                      <div className=" flex lgs:w-auto mt-8 lg:mt-0 justify-center items-center bg-transparent lgs:h-[80vh]">
                      <img 
                      src={heroImage} alt="heroImage" className="object-cover lgs:w-[35vw]"
                      />
                      </div>
                  </div>

              </div>
            </section>

            {/* Hero Section mobile screens */}
            <section className="hidden sms:flex bg-transparent py-12">
               <div className="bg-baseprimary min-h-screen w-[100vw]">

                    <div className= 'flex items-center justify-center min-h-screen w-[100vw]' style={{
                        backgroundImage:`url(${heroBackground})`,
                        backgroundSize:'cover',
                                                                    
                    }}>
                       <div className="flex flex-col items-center rounded-2xl mt-2 justify-start w-[90vw] h-[100vh] bg-transparent"
                       style={{
                        boxShadow:'inset 0 5px 10px rgba(0,0,0,0.4), 0px 5px 10px rgba(0,0,0,0.4)',

                       }}>        
                                 
                                 <div className="flex flex-col h-auto  w-[80vw] items-center justify-center">
                                      <div className=" flex w-auto mt-8 justify-center items-center bg-transparent">
                                      <img 
                                      src={heroImage} alt="heroImage" className="object-cover w-[80vw]"
                                      />
                                      </div>
                                  </div>
                           
                                 <h1 className="flex flex-col text-5xl font-russoone text-primary lg:text-5xl font-semibold">
                                  MediLink{''}
                                  <div className="bg-primary h-[0.18rem] lgs:w-1/2 lgs:mt-2"/>
                                  </h1>
                                  <h1 className="flex flex-col text-md font-ibmplexsans text-primary lg:text-5xl mb-6">
                                  Your Health, Our Priority
                                  </h1>
                                  <p className="text-md mb-6 w-[80vw] text-primary text-center p-2" style={{ fontWeight:'300'}}>
                                  "At MediLink, we are dedicated to providing personalized, compassionate healthcare tailored to your needs. Whether you’re looking for routine checkups, specialist consultations, or urgent care, our team of experienced doctors is here for you. Schedule your appointments effortlessly and start your journey toward better health today"
                                  </p>

                                  <Link to='/Appointment' className="flex mt-2 bg-blue-500 w-[12rem] items-center justify-center h-[3rem] font-ibmplexsans rounded-full text-primary hover:scale-110 transition-transform duration-300 ease-in-out"
                                  style={{
                                  boxShadow:'inset 0 2px 5px rgba(255,255,255,0.5), 0px 5px 10px rgba(0,0,0,0.4)'
                                  }}>
                                  Book an Appointment
                                  </Link>

                           
                       </div>

                    </div>
               </div>
            </section>

      {/* Services Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl font-semibold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">General Checkup</h3>
              <p className="text-gray-600">Routine medical exams to ensure your well-being.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Pediatrics</h3>
              <p className="text-gray-600">Healthcare for your children with compassionate care.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Specialist Consultation</h3>
              <p className="text-gray-600">Consult with top specialists for more advanced medical care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-500 py-12">
        <div className="container mx-auto px-6 lg:px-20 text-center text-white">
          <h2 className="text-3xl font-semibold mb-4">Get Started with Your Health Journey</h2>
          <p className="text-lg mb-6">
            Book your appointment now and take the first step towards better health.
          </p>
          <a
            href="/appointments"
            className="bg-white text-green-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100"
          >
            Book Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
