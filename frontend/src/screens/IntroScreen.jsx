import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory

const IntroSection = () => {
  const [showIntro, setShowIntro] = useState(true);
  const history = useHistory(); // Initialize useHistory

  const handleButtonClick = () => {
    setShowIntro(false);
    history.push('/home'); // Update this path according to your homepage route
  };

  return (
    <>
      {showIntro && (
        <section
          className="absolute inset-0 overflow-hidden bg-[url(https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-cover bg-top bg-no-repeat"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-black/50 p-8 md:p-12 lg:px-16 lg:py-24 h-full flex items-center justify-center">
            <div className="text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">Latest Mobiles</h2>
              <p className="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
              There's no more important consumer product today than a cell phone.
              </p>
              <div className="mt-4 sm:mt-8">
                <button
                  onClick={handleButtonClick}
                  className="inline-block rounded-full bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  Get Yours Today
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default IntroSection;
