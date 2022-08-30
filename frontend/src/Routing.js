import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Main from './pages/Main'
import Gallery from './pages/Gallery'

function Routing () {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  )
}

export default Routing;