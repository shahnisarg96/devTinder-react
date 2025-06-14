import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<div className="text-center mt-20 text-2xl">404 Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
