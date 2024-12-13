import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/signin';
import SignInEmployee from './pages/SignInEmployee';
import Header from './components/Header';
import EmployeeHome from './pages/EmployeeHome';
import HRHome from './pages/HRHome';
import Welcome from './pages/Welcome';
import SignUpExternal from './pages/SignUpExternal';
import SignInExternal from './pages/SignInExternal';
import CandidateHome from './pages/CandidateHome';

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
        <Route path="/sign-up-external" element={<SignUpExternal />} />
        <Route path="/sign-in-external" element={<SignInExternal />} />
        <Route path="/candidate-home" element={<CandidateHome />} />
      </Routes>
    </BrowserRouter>
  )
}