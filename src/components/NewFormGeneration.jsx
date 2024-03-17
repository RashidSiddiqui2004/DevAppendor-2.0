
import React from 'react'
import AddEvent from './AddEvent'
import Developer from './Developer'
import Navbar from './Navbar'
import Info from './utilityClasses/Info'

const NewFormGeneration = () => {
  return (

    <div className='pb-8'>
      <Navbar />
      <AddEvent />
      <div className='bg-slate-600 w-fit px-3 py-2 my-5
     mx-[22%] md:ml-[39%] shadow-md shadow-purple-500 mt-7'>
        <h2 className='flex justify-center'>Developed with ❤️ by Rashid Siddiqui</h2>
      </div>
      <div className='fixed bottom-4 left-4'>
        <Info />
      </div>
    </div>
  )
}

export default NewFormGeneration

