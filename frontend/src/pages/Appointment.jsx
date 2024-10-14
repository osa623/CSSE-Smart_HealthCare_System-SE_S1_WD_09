import { useState, useEffect } from 'react';
import axios from 'axios';

//images
import Doctor1 from '../assets/doctor1.png';
import AppoView from '../assets/doctorAppView.png';

//others
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBookMedical, faFileCircleCheck, faMedkit, faTableCells, faUndo } from '@fortawesome/free-solid-svg-icons';



const Appointment = () => {

  const [showAppo, setShowAppo] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [seatCount, setSeatCount] = useState([]);
  const [options1, setOptions1] = useState([
    { id: 'Cardiology', name: 'Cardiology' },
    { id: 'Neurology', name: 'Neurology' },
    { id: 'Dermatology', name: 'Dermatology' },
    { id: 'Pediatrics', name: 'Pediatrics' },
    { id: 'Allergist', name: 'Allergist' },
    // Add more specializations as needed
  ]);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [options2, setOptions2] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [fetchAppos, setFetchAppos] = useState([]);
  const [seatNumber, setSeatNumber] = useState(null);
  const [pricePerCharge, setPricePerCharge] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    selectedDoctor: '',
    selectedSpecialization: '', // Added specialization to form data
    email: '',
    description: '',
    date: '',
    time: '',
    seatNumber: '',
    pricePerCharge: '',
  });

  // Handle input changes for any form field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Allocate the next available seat
  const allocateSeat = () => {
    const totalSeats = 40; // Assuming a total of 40 seats
    for (let i = 1; i <= totalSeats; i++) {
      if (!occupiedSeats.includes(i)) {
        setSeatNumber(i);
        setOccupiedSeats((prev) => [...prev, i]); // Mark the seat as occupied
        setFormData((prev) => ({
          ...prev,
          seatNumber: i // Update the seat number in form data
        }));
        break;
      }
    }
  };

  // Handle time selection
  const handleTimeChange = (e) => {
    // Only allocate a seat if one hasn't been assigned yet
    if (seatNumber === null) {
      allocateSeat(); // Allocate a seat only once
    }
    handleInputChange(e); // Update time in form data
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    // Extract values from the form elements using e.target
    const form = e.target; // Get the form element
    
  
    const appointmentData = {
      doctorName: form.selectedDoctor.value, // Get selected doctor ID
      specialization: form.selectedSpecialization.value, // Get selected specialization
      note: form.description.value, // Get description
      charge: form.pricePerCharge.value, // Get medical charge
      date: form.date.value, // Get selected date
      scheduledTime: form.time.value, // Get selected time
      seatNo: form.seatNumber.value, // Get seat number
      userEmail: form.email.value, // Get user email
    };
  
    try {
      const response = await axios.post('http://localhost:3000/api/appointments', appointmentData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Appointment created successfully', response.data);
      window.alert("Appointment created successfully!");
      // Handle successful creation (e.g., show a success message, reset form, etc.)
      form.reset(); // Optional: reset the form after submission
    } catch (error) {
      console.error('Failed to create appointment', error.response?.data || error.message);
      // Handle errors (e.g., show an error message)
    }
  };

  //fetching Appos
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/appointments/");
        setFetchAppos(response.data);
      } catch (error) {
        console.error("Error fetching appointments", error);
      } 
    };

    fetchAppointments();
  }, []);

  // Function to fetch doctors based on specialization
  const fetchDoctorsBySpecialization = async (specialization) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/doctors/specialization/${specialization}`);
      setOptions2(response.data); // Set doctors to dropdown
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // Function to handle doctor selection and fetch seat count
  const handleDoctorChange = async (doctorId) => {
    setSelectedDoctor(doctorId);
    try {
      const response = await axios.get(`http://localhost:3000/api/doctors/${doctorId}`);
      setPricePerCharge(response.data.pricePerSchedule);
      setFormData((prev) => ({ ...prev, selectedDoctor: doctorId, pricePerCharge: response.data.pricePerSchedule }));
      if (response.data && response.data.seatCount) {
        setSeatCount(response.data.seatCount);
        setOccupiedSeats(response.data.seatCount || []); // Assume `seatCount` is in the response
      } else {
        setSeatCount([]);  // Set empty array if no seatCount is found
        setOccupiedSeats([]);
      }
    } catch (error) {
      console.error("Error fetching doctor details", error);
      setSeatCount([]);  // In case of error, reset seatCount to empty array
      setOccupiedSeats([]);
    }
  };

  // Effect to fetch doctors when specialization is selected
  useEffect(() => {
    if (selectedSpecialization) {
      fetchDoctorsBySpecialization(selectedSpecialization);
    }
  }, [selectedSpecialization]);


  return (
    <div className='bg-primary w-full min-h-screen justify-center items-center'>



      {/*<div className= 'hidden lgs:flex mds:flex bg-transparent lgs:w-[100vw] lgs:h-[4rem]'/>*/}

                  {/* Booking Appointment Interface */}

                      <div className= 'relative flex min-h-screen w-auto lgs:justify-evenly items-center lgs:mt-5'>

                        {/* Sidebar Compo */}

                          <div className= 'flex lgs:w-[10vw] lgs:h-[85vh] overflow-hidden bg-primary  items-center justify-center lgs:rounded-3xl' style={{     
                          }}>

                            <div className='flex flex-col lgs:h-[60vh] bg-baseprimary lgs:w-[8rem] rounded-full items-center lgs:justify-evenly'
                            style={{
                            boxShadow:'inset 0 2px 10px rgba(0,255,255,0.8), 0px 2px 10px rgba(0,0,0,0.9)'

                            }}>
                                {/* Add Appointment Button */}
                                <div onClick={()=> setShowAppo(true)} className='flex bg-primary lgs:w-[5rem] lgs:h-[5rem] cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out items-center justify-center rounded-full' style={{
                                  boxShadow:'inset 0 2px 5px rgba(0,0,0,0.6), 0px 2px 8px rgba(0,0,0,0.8)'
                                }}>
                                  <FontAwesomeIcon icon={faBookMedical} className='lgs:h-8 text-baseprimary'/>
                                </div>

                                
                                {/* View Your Appoinments Button */}
                                <div onClick={()=> setShowAppo(false)} className='flex bg-primary lgs:w-[5rem] lgs:h-[5rem] cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out items-center justify-center  rounded-full' style={{
                                   boxShadow:'inset 0 2px 5px rgba(0,0,0,0.6), 0px 2px 8px rgba(0,0,0,0.8)'
                                }}>
                                 <FontAwesomeIcon icon={faFileCircleCheck} className='lgs:h-8 text-baseprimary'/>

                                </div>

                                {/* View Appointments Button */}
                                <div onClick={()=> setShowAppo(false)} className='flex bg-primary lgs:w-[5rem] lgs:h-[5rem] cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out items-center justify-center  rounded-full' style={{
                                   boxShadow:'inset 0 2px 5px rgba(0,0,0,0.6), 0px 2px 8px rgba(0,0,0,0.8)'
                                }}>
                                 <FontAwesomeIcon icon={faTableCells} className='lgs:h-8 text-baseprimary'/>

                                </div>

                                {/* back Button */}
                                <div className='flex bg-primary lgs:w-[5rem] lgs:h-[5rem] cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out items-center justify-center  rounded-full' style={{
                                   boxShadow:'inset 0 2px 5px rgba(0,0,0,0.6), 0px 2px 8px rgba(0,0,0,0.8)'
                                }}>
                                  <FontAwesomeIcon icon={faUndo} className='lgs:h-8 text-baseprimary'/>
                                </div>

                            </div>






                            
                          </div>  

                        {/* Booking Appointements Compo */}

                        { showAppo ? (

                          
                        <div className= 'flex lgs:w-[75vw] lgs:h-[85vh] overflow-hidden bg-primary drop-shadow-lg items-center justify-center lgs:rounded-3xl' style={{
                          boxShadow:'inset 0 2px 10px rgba(0,0,0,0.5), 0px 5px 20px rgba(0,0,0,0.5)'
                        }}>



                                              {/* Booking 1st Interface */}

                                              <div className= 'flex flex-col lgs:w-[30vw] lgs:h-[85vh] bg-baseprimary lgs:p-2 drop-shadow-lg justify-center lgs:space-y-4 lgs:items-center lgs:rounded-l-3xl'>
                                                
                                                {/* Topic Section */}
                                                  <div className= 'flex flex-col h-auto lgs:w-[25vw] justify-center items-center'>
                                                      <h2 className= 'flex flex-col font-ibmplexsans lgs:text-md text-primary'>
                                                        Your Health, Your Schedule{''}<div className='bg-primary h-[0.15rem] w-auto'/>
                                                      </h2>
                                                      <h2 className= 'font-russoone lgs:text-3xl text-primary font-normal'>
                                                      Book Your Appointment
                                                      </h2>
                                                  </div>

                                              {/* Image Section */}
                                                  <div className= 'flex flex-col h-auto lgs:w-[30vw] justify-center items-center lgs:pt-5'>
                                                      <img src= {Doctor1} alt='' className='lgs:w-[20vw]'/>
                                                  </div>

                                              {/* Paragraph Section */}
                                                  <div className= 'flex flex-col h-auto lgs:w-[20vw] justify-center items-center lgs:pt-5'>
                                                    <p className='font-ibmplexsans text-primary text-md text-center' style={{
                                                      fontWeight:'200'
                                                    }}>
                                                    Schedule your doctor appointments quickly and conveniently through our easy-to-use interface. Select your preferred doctor, choose a suitable date and time, and provide any necessary details—all in just a few steps. Get reminders and manage your bookings effortlessly from anywhere!
                                                    </p>
                                                  </div>

                                              {/* design  Section */}
                                                <div className= 'flex h-auto lgs:w-[20vw] justify-center items-center lgs:pt-5 lgs:space-x-5'>
                                                  <div className='bg-primary h-[0.1rem] rounded-full w-[5rem]' data-aos='fade-right'/>
                                                  <div className='bg-primary h-2 w-2 rounded-full' data-aos='zoom-in'/>    
                                                  <div className='bg-primary h-2 w-2 rounded-full' data-aos='zoom-in'/>             
                                                  <div className='bg-primary h-[0.1rem] rounded-full w-[5rem]' data-aos='fade-left'/>
                                                    
                                                  </div>



                                              </div>


                                              {/* Booking 2nd Interface */}

                                              <div className='flex flex-col lgs:w-[45vw] lgs:h-[85vh] bg-primary lgs:p-2 drop-shadow-lg justify-center items-center lgs:rounded-r-3xl'>
                                                          
                                                          <form className="flex flex-col space-y-6 w-full h-auto px-8 lgs:mt-5" onSubmit={handleSubmit}>
                                                            
                                                              {/* First Dropdown */}
                                                              <div>
                                                                  <label htmlFor="firstDropdown" className="block lgs:text-xl font-ibmplexsans text-baseprimary">Select Specialization</label>
                                                                  <select id="Specialization"
                                                                          name="selectedSpecialization"
                                                                          className="lgs:mt-1 lgs:p-2 lgs:h-[3rem] block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-baseprimary sm:text-sm"
                                                                          onChange={(e) => {
                                                                            setSelectedSpecialization(e.target.value);
                                                                            handleInputChange(e); // Update form data on change
                                                                        }}>
                                                                      <option value="" className='font-ibmplexsans lgs:text-lg'>Pick an Specialization</option>
                                                                      {options1.map(option => (
                                                                        <option key={option.id} value={option.id}>
                                                                          {option.name}
                                                                        </option>
                                                                      ))}
                                                                  </select>
                                                              </div>

                                                              {/* Second Dropdown */}
                                                              <div>
                                                              <label htmlFor="firstDropdown" className="block lgs:text-xl font-ibmplexsans text-baseprimary">Select a Doctor</label>
                                                              <select id="Doctor"
                                                                    name="selectedDoctor" 
                                                                    className="lgs:mt-1 lgs:p-2 lgs:h-[3rem] lgs:w-[20vw] block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-baseprimary sm:text-sm"
                                                                    onChange={(e) => {
                                                                      handleDoctorChange(e.target.value);
                                                                      handleInputChange(e); // Update form data on change
                                                                  }}>
                                                                <option value="" className='font-ibmplexsans lgs:text-lg'>Pick a Doctor</option>
                                                                {options2.map(option => (
                                                                  <option key={option._id} value={option._id}>  {/* Make sure you pass the _id here */}
                                                                    <h2 className='flex font-ibmplexsans' style={{ fontWeight:'300' }}>
                                                                      <FontAwesomeIcon icon={faMedkit} className='mx-2'/>
                                                                      {option.doctorName}
                                                                    </h2>
                                                                  </option>
                                                                ))}
                                                            </select>

                                                              </div>

                                                              {/* Email TextArea */}
                                                              <div>
                                                                    <label htmlFor="descriptionField" className="block lgs:text-xl font-ibmplexsans text-baseprimary">
                                                                      Your Email
                                                                    </label>
                                                                    <input
                                                                      id="emailField"
                                                                      name="email"
                                                                      onChange={handleInputChange}
                                                                      className="mt-1 block w-full lgs:p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                                                      placeholder="Provide Your Email Here..."
                                                                    ></input>
                                                                  </div>

                                                              {/* Description TextArea */}
                                                                <div>
                                                                    <label htmlFor="descriptionField" className="block lgs:text-xl font-ibmplexsans text-baseprimary">
                                                                      Add a Description
                                                                    </label>
                                                                    <textarea
                                                                      id="descriptionField"
                                                                      name="description"
                                                                      onChange={handleInputChange}
                                                                      rows="4"
                                                                      className="mt-1 block w-full lgs:p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                                                      placeholder="Provide any additional details or notes for your appointment..."
                                                                    ></textarea>
                                                                  </div>


                                                                  <div className='flex lgs:w-auto lgs:justify-between lgs:items-center'>

                                                                          {/* Text Field */}
                                                                          <div>
                                                                          <label htmlFor="dateField" className="block lgs:text-lg font-ibmplexsans text-baseprimary">Pick a Date</label>                                                      <input
                                                                              type="date"
                                                                              id="dateField"
                                                                              onChange={handleInputChange}
                                                                              name="date"
                                                                              className="mt-1 block w-full lgs:h-[3rem] lgs:p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                                                            />
                                                                          </div>

                                                                        {/* Time Field */}
                                                                        <div>
                                                                          <label htmlFor="timeField" className="block lgs:text-lg font-ibmplexsans text-baseprimary">Scheduled Time</label>
                                                                          <input
                                                                              type="time"
                                                                              id="timeField"
                                                                              name="time"
                                                                              className="block w-full lgs:h-[3rem] lgs:p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                                                              onChange={handleTimeChange} // Call to handle seat allocation
                                                                          />
                                                                      </div>

                                                                        {/* Seat Number Field */}
                                                                        <div>
                                                                            <label htmlFor="seatNumberField" className="block lgs:text-lg font-ibmplexsans text-baseprimary">Seat Number</label>
                                                                            <input
                                                                                type="number"
                                                                                id="seatNumberField"
                                                                                name="seatNumber"
                                                                                className="mt-1 block w-full lgs:h-[3rem] lgs:p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                                                                value={seatNumber || ''} // Display the allocated seat number
                                                                                disabled
                                                                            />
                                                                        </div>

                                                                          {/* Extra Field */}
                                                                          <div>
                                                                            <label htmlFor="priceField" className="block lgs:text-lg font-ibmplexsans text-baseprimary">
                                                                            Medical Charge
                                                                            </label>
                                                                            <input
                                                                              type="number"
                                                                              id="priceField"
                                                                              name="pricePerCharge"
                                                                              value={pricePerCharge || ''} 
                                                                              className="mt-1 block w-full lgs:h-[3rem] lgs:p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                                                              placeholder="Enter the Amount"
                                                                              disabled
                                                                            />
                                                                          </div>




                                                                  </div>



                                                              {/* confirm Button */}
                                                                <div className='flex w-auto h-auto justify-end lgs:space-x-5'>
                                                                  <button
                                                                        type="submit" // Set to submit to trigger form submission
                                                                        className="lgs:w-[10rem] bg-green-600 text-white py-2 px-4 rounded-full hover:bg-secondary-dark hover:scale-110 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                                                        style={{
                                                                          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5), 0px 5px 20px rgba(0,0,0,0.5)'
                                                                        }}
                                                                      >
                                                                        Confirm
                                                                      </button>

                                                                  <button type="submit" className="lgs:w-[10rem] bg-baseprimary text-white py-2 px-4 rounded-full hover:bg-secondary-dark hover:scale-110 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" style={{
                                                                    boxShadow:'inset 0 2px 10px rgba(0,0,0,0.5), 0px 5px 20px rgba(0,0,0,0.5)'
                                                                  }}>
                                                                      Cancel
                                                                  </button>
                                                              </div>
                                                          </form>
                                              </div>

                          
                        </div>  


                        ) : !showAppo ? (

                        //Booking Appointements Compo 

                         <div className= 'flex lgs:w-[75vw] lgs:h-[85vh] overflow-hidden bg-baseprimary drop-shadow-lg items-center justify-center lgs:rounded-3xl' style={{
                          boxShadow:'inset 0 2px 10px rgba(0,0,0,0.5), 0px 5px 20px rgba(0,0,0,0.5)'
                        }}>


                                             {/* Booking 1st Interface */}

                                              <div className= 'flex flex-col lgs:w-[25vw] lgs:h-[85vh] bg-baseprimary lgs:p-2 drop-shadow-lg justify-center lgs:space-y-4 lgs:items-center lgs:rounded-l-3xl'>
                                                
                                                {/* Topic Section */}
                                                  <div className= 'flex flex-col h-auto lgs:w-[20vw] justify-center items-center'>
                                                      <h2 className= 'flex flex-col font-ibmplexsans lgs:text-md text-primary'>
                                                        Your Health, Your Schedule{''}<div className='bg-primary h-[0.15rem] w-auto'/>
                                                      </h2>
                                                      <h2 className= 'font-russoone lgs:text-2xl text-primary font-normal'>
                                                      Ongoing Appointments
                                                      </h2>
                                                  </div>

                                              {/* Image Section */}
                                                  <div className= 'flex flex-col h-auto lgs:w-[20vw] justify-center items-center lgs:pt-2'>
                                                      <img src= {AppoView} alt='' className='lgs:w-[20vw]'/>
                                                  </div>

                                              {/* Paragraph Section */}
                                                  <div className= 'flex flex-col h-auto lgs:w-[20vw] justify-center items-center lgs:pt-5'>
                                                    <p className='font-ibmplexsans text-primary text-md text-center' style={{
                                                      fontWeight:'200'
                                                    }}>
                                                    Select a specialization and choose a doctor to view their ongoing appointments. Easily find a suitable time slot and manage your bookings efficiently in just a few steps!                                                    </p>
                                                  </div>

                                                 {/* Filtering Option */}

                                                 <div className='flex flex-col h-auto lgs:w-[20vw] justify-center items-center lgs:pt-2 lgs:space-y-2'>
                                                 <div>
                                                                  <label htmlFor="firstDropdown" className="flex lgs:text-lg font-ibmplexsans text-primary" style={{fontWeight:'300'}}>Select Specialization</label>
                                                                  <select id="firstDropdown"
                                                                          name="firstDropdown"
                                                                          className="lgs:mt-1 lgs:p-2 lgs:h-[3rem] block lgs:w-[20vw] bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-baseprimary sm:text-sm"
                                                                          onChange={(e) => setSelectedSpecialization(e.target.value)}>
                                                                      <option value="" className='font-ibmplexsans lgs:text-lg'>Pick an Specialization</option>
                                                                      {options1.map(option => (
                                                                        <option key={option.id} value={option.id}>
                                                                          {option.name}
                                                                        </option>
                                                                      ))}
                                                                  </select>
                                                              </div>

                                                              {/* Second Dropdown */}
                                                              <div>
                                                              <label htmlFor="firstDropdown" className="flex lgs:text-lg font-ibmplexsans text-primary" style={{fontWeight:'300'}}>Select a Doctor</label>
                                                              <select id="secondDropDown"
                                                                    name="secondDropDown" 
                                                                    className="lgs:mt-1 lgs:p-2 lgs:h-[3rem] lgs:w-[20vw] block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-baseprimary sm:text-sm"
                                                                    onChange={(e) => handleDoctorChange(e.target.value)}>
                                                                <option value="" className='font-ibmplexsans lgs:text-lg'>Pick a Doctor</option>
                                                                {options2.map(option => (
                                                                  <option key={option._id} value={option._id}>  {/* Make sure you pass the _id here */}
                                                                    <h2 className='flex font-ibmplexsans' style={{ fontWeight:'300' }}>
                                                                      <FontAwesomeIcon icon={faMedkit} className='mx-2'/>
                                                                      {option.doctorName}
                                                                    </h2>
                                                                  </option>
                                                                ))}
                                                            </select>

                                                              </div>
                                                  </div>

                                                {/* design  Section */}
                                                 <div className= 'flex h-auto lgs:w-[20vw] justify-center items-center lgs:pt-5 lgs:space-x-5'>
                                                  <div className='bg-primary h-[0.1rem] rounded-full w-[5rem]' data-aos='fade-right'/>
                                                  <div className='bg-primary h-2 w-2 rounded-full' data-aos='zoom-in'/>    
                                                  <div className='bg-primary h-2 w-2 rounded-full' data-aos='zoom-in'/>             
                                                  <div className='bg-primary h-[0.1rem] rounded-full w-[5rem]' data-aos='fade-left'/>
                                                    
                                                  </div>



                                              </div>


                                              {/* Booking 2nd Interface */}

                                              <div className='flex flex-col lgs:w-[50vw] lgs:h-[85vh] bg-primary lgs:p-2 drop-shadow-lg justify-center items-center lgs:rounded-r-3xl'>
                                                          
                                              {fetchAppos.length === 0 ? (
                                                  <p>No appointments found.</p>
                                                ) : (
                                                  <ul>
                                                    {fetchAppos.map((appointment) => (
                                                      <li key={appointment._id}>
                                                        <strong>Appointment No:</strong> {appointment.appointmentNo} <br />
                                                        <strong>Doctor Name:</strong> {appointment.doctorName} <br />
                                                        <strong>Specialization:</strong> {appointment.specialization} <br />
                                                        <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()} <br />
                                                        <strong>Time:</strong> {appointment.scheduledTime} <br />
                                                        <strong>Charge:</strong> ${appointment.charge} <br />
                                                        <strong>Note:</strong> {appointment.note} <br />
                                                        <strong>Seat No:</strong> {appointment.seatNo} <br />
                                                        <strong>User Email:</strong> {appointment.userEmail} <br />
                                                        <hr />
                                                      </li>
                                                    ))}
                                                  </ul>
                                                )}

                                              </div>
                                            



                          
                        </div>      

                      ) : null}
  
 

                      </div>

      
      
    </div>
  )
}

export default Appointment
