import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Project from './components/pages/Project';
 

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Container customClass="min_height"><Home /></Container>} />
        <Route path='/Projects' element={<Container customClass="min_height"><Projects /></Container>} />
        <Route path='/company' element={<Container customClass="min_height"><Company /></Container>} />
        <Route path='/contact' element={<Container customClass="min_height"><Contact /></Container>} />
        <Route path='/newproject' element={<Container customClass="min_height"><NewProject /></Container>} />
        <Route path='/project/:id' element={<Container customClass="min_height"><Project /></Container>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
