

const home = () => {
  return (
    <div className='bg-primary w-full min-h-screen justify-center items-center'>



      <div className= 'hidden lgs:flex mds:flex bg-transparent lgs:w-[100vw] lgs:h-[4rem]'/>

      {/* Booking Appointment Interface */}

          <div className= 'relative flex h-auto w-auto justify-center items-center'>

             {/* Booking Appointements */}

              <div className= 'flex lgs:w-[75vw] lgs:h-[75vh] bg-primary drop-shadow-lg items-center justify-center lgs:mt-5 lgs:rounded-3xl' style={{
                boxShadow:'inset 0 2px 10px rgba(0,0,0,0.5)'
              }}>



                                    {/* Booking 1st Interface */}

                                    <div className= 'flex lgs:w-[25vw] lgs:h-[75vh] bg-primary drop-shadow-lg  lgs:rounded-l-3xl'>


                                    </div>


                                    {/* Booking 2st Interface */}

                                    <div className= 'flex lgs:w-[50vw] lgs:h-[75vh] bg-primary drop-shadow-lg  lgs:rounded-r-3xl'>


                                  </div>
                
              </div>            
          </div>

      
      
    </div>
  )
}

export default home
