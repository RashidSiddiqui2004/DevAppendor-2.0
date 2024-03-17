import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import MyState from './context/data/myState';
import { ToastContainer } from 'react-toastify';
import Login from './components/registration/Login';
import Signup from './components/registration/Signup';
import Home from './components/Home';
import NoPage from './components/nopage/NoPage';
import Append from './components/response/Append';
import FormResponses from './components/response/FormResponses';
import NewFormGeneration from './components/NewFormGeneration';
import UserDashboard from './components/user-forms/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <MyState>
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/appends/:id" element={
            <div className='bg-slate-700 min-h-screen pt-4'>
              <Append />
            </div>
          } />

          <Route path="/form-generation" element={
            <ProtectedRoute>
              <div className='bg-slate-700 min-h-screen pt-3'>
                <NewFormGeneration />
              </div>
            </ProtectedRoute>
          } />


          <Route path="/my-forms" element={
            <ProtectedRoute>
              <div className='bg-slate-700 min-h-screen pt-3'>
                <UserDashboard />
              </div>
            </ProtectedRoute>
          } />

          <Route path="/form-insights/:id" element={
            <ProtectedRoute>
              <div className='bg-slate-700 min-h-screen pt-4'>
                <FormResponses />
              </div>
            </ProtectedRoute>
          } />


          <Route path="/user-profile" element={
            <ProtectedRoute>
            </ProtectedRoute>
          } />


          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <AdminDashboard />
            </ProtectedRouteForAdmin>
          } />


          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path="/*" element={<NoPage />} />

        </Routes>

        <ToastContainer />

      </Router>
    </MyState>

  )
}

export default App

// user 
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  if (user) {
    return children
  } else {
    return <Navigate to={'/login'} />
  }
}

// admin 
const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'))

  if (admin.user.email === ADMIN_EMAIL) {
    return children
  }
  else {
    return <Navigate to={'/login'} />
  }

}
