

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 py-12">
        <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between">
          <div className="text-white lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Your Health, Our Priority
            </h1>
            <p className="text-lg mb-6">
              Schedule appointments with our expert doctors easily and get the best medical care. We are here for all your health needs.
            </p>
            <a
              href="/appointments"
              className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200"
            >
              Book an Appointment
            </a>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img
              src="https://via.placeholder.com/500" // Replace with your hero image URL
              alt="Medical center"
              className="w-full h-auto rounded-lg shadow-lg"
            />
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
