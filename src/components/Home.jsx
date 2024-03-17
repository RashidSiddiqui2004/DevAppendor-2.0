import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className='bg-slate-700 min-h-screen pt-4 lora'>
      <Navbar />

      <div className='container mx-auto mt-10'>
        <h1 className='text-4xl font-bold text-white mb-4'>Welcome to DevAppendor</h1>

        <p className='text-lg text-gray-300 mb-8'>
          We are dedicated to providing solutions for developers around the world. Our aim is to simplify
          your development process and enhance your coding experience.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-[10vw] sm:mx-0'>

          <div className='bg-slate-800 p-6 rounded-md shadow-lg shadow-gray-400'>
            <h2 className='text-xl font-semibold text-white mb-4'>Forms Created</h2>
            <p className='text-3xl font-bold text-slate-200'>30+</p>
          </div>

          <div className='bg-slate-800 p-6 rounded-md shadow-lg shadow-gray-400'>
            <h2 className='text-xl font-semibold text-white mb-4'>Happy Clients</h2>
            <p className='text-3xl font-bold text-slate-200'>50+</p>
          </div>

          <div className='bg-slate-800 p-6 rounded-md shadow-lg shadow-gray-400'>
            <h2 className='text-xl font-semibold text-white mb-4'>Great Responses</h2>
            <p className='text-3xl font-bold text-slate-200'>200+</p>
          </div>

        </div>
      </div>

      <div className='text-center mx-[20%] rounded-lg shadow-md shadow-slate-300
       bg-slate-600 text-red-300 px-2 py-3 mt-8'>
        Developer: Rashid Siddiqui
      </div>

    </div>
  );
};

export default Home;
