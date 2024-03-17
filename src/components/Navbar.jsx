
import React, { Fragment, useContext, useEffect, useState } from 'react'
import myContext from '../context/data/myContext';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { RxCross2 } from 'react-icons/rx'
import ADMIN_EMAIL from '../utils/AdminDetails'
import { FaFileWaveform } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { auth } from '../firebase/FirebaseConfig';
import getUsernameByUID from '../utils/GetUser';
import Button from './Buttons/Button';
import { GiHamburgerMenu } from "react-icons/gi";


function Navbar() {

  const context = useContext(myContext);

  const { mode } = context;

  const [open, setOpen] = useState(false)

  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.clear('user');
    window.location.href = '/login'
  }

  const uid = JSON.parse(localStorage.getItem('user'))?.user?.uid;

  const [u_name, setUser] = useState('');

  getUsernameByUID(uid).then((username) => {
    if (username) {
      setUser(username);
    } else {
      return;
    }
  });


  return (

    <div className='sticky z-50 lora pb-2'>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex flex-col w-[100vw] overflow-y-auto text-white
               bg-slate-700 pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-28 ml-[38vw]">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center font-bold
                    justify-center rounded-md p-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 className='text-4xl font-bold bg-slate-800 rounded-3xl p-1' />
                  </button>
                </div>

                <div className="flex flex-col text-left px-4 py-6 gap-y-5 text-gray-100 text-2xl mx-28">

                  {user ? <div className="flow-root mb-2">
                    <Link to={'/form-generation'} className="font-medium"
                      style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Create Form
                    </Link>
                  </div> : ""}

                  {user ? <div className="flow-root mb-2">
                    <Link to={'/my-forms'} className="font-medium">
                      My Forms
                    </Link>
                  </div> : ""}


                  {user?.user?.email === ADMIN_EMAIL ? <div className="flow-root">
                    <Link to={'/dashboard'} className="mt-[1px] -ml-2 block p-2 font-medium">
                      Admin
                    </Link>
                  </div> : ""}

                  {user ? <div className="flow-root">
                    <a onClick={logout} className="-m-2 block p-2 font-medium cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Logout
                    </a>

                  </div> : <div className="flow-root">
                    <Link to={'/signup'} className="-m-2 block p-2 font-medium cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Signup
                    </Link>
                  </div>}

                  <div className="flow-root">
                    <Link to={'/user-profile'} className="-m-2 block p-2 font-medium
                     text-gray-900 cursor-pointer mx-4 my-6">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg"
                        alt="user" />
                    </Link> {u_name}
                  </div>
                </div>


              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative ">

        <nav aria-label="Top" className="text-white px-4 sm:px-6 lg:px-8 shadow-xl" >

          <div>
            <div className="flex h-12 items-center">
              <button
                type="button"
                className="rounded-md p-1 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <GiHamburgerMenu className='text-slate-100 text-3xl' />
              </button>

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

                  {!user && (<Link to={'/signup'}
                    className="text-sm font-medium text-white bg-slate-900 px-2 py-2 rounded-md">
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


                {/* <Link to={'/user-profile'}> */}
                {
                  user && <Button message={u_name} />
                }

                {/* </Link> */}

              </div>

            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar