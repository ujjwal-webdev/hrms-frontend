import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/signin';
import SignInEmployee from './pages/SignInEmployee';
import Header from './components/Header';
import EmployeeHome from './pages/EmployeeHome';
import HRHome from './pages/HRHome';
import Welcome from './pages/Welcome';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-in-employee' element={<SignInEmployee />} />
        <Route path='/hr-home' element={<HRHome />} />
        <Route path='/employee-home' element={<EmployeeHome />} />
        {/* <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} /> */}
      </Routes>
    </BrowserRouter>
  )
}