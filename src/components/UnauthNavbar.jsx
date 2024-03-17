
import React from 'react' 
import { Link } from 'react-router-dom'; 
import ADMIN_EMAIL from '../utils/AdminDetails'
import { FaFileWaveform } from 'react-icons/fa6';
import { motion } from 'framer-motion'; 


function UnauthNavbar() { 

  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.clear('user');
    window.location.href = '/login'
  }

  return (

    <div className='sticky z-50 lora pb-2'>

      <header className="relative ">

        <nav aria-label="Top" className="text-white px-4 sm:px-6 lg:px-8 shadow-xl" >

          <div>
            <div className="flex h-12 items-center">
           

              <div className='flex flex-row'>
                <FaFileWaveform className="text-3xl ml-5" />
                <Link to={'/'} className='flex'>
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold mb-2 ml-8
                     text-gray-200 decoration-from-font"
                  >
                    DevAppendor
                  </motion.h1>
                </Link>

              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                  {user ? <div className="flow-root">
                    <Link to={'/form-generation'} className="text-sm font-medium text-white">
                      Create Form
                    </Link>
                  </div> : ""}

                  {user ? <div className="flow-root">
                    <Link to={'/my-forms'} className="text-sm font-medium text-white">
                      My Forms
                    </Link>
                  </div> : ""}

                  {!user && (<Link to={'/signup'} className="text-sm font-medium text-white">
                    Signup
                  </Link>)}

                  {user?.user?.email === ADMIN_EMAIL ?
                    <Link to={'/dashboard'} className="text-sm font-medium text-white">
                      Admin
                    </Link> : ""}

                  {user ? <a onClick={logout} className="text-sm font-medium cursor-pointer text-white">
                    Logout
                  </a> : ""}

                </div>
              </div>

            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default UnauthNavbar