import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//--- Views Imports
import LandingPage from './views/LandingPage';
import SignUp from './views/SignUp';

//-- Admin Views
import Dashboard from './views/AdminViews/Dashboard';
import Catalog from './views/AdminViews/Catalog';
import Authors from './views/AdminViews/Authors';

import Member from './views/AdminViews/Member';
import Circulation from './views/AdminViews/Circulation';

//-- Member Views
import Home from './views/MemberViews/Home';
import SearchCatalog from './views/MemberViews/SearchCatalog';
import MyAccount from './views/MemberViews/MyAccount';
import Contact from './views/MemberViews/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
            
        {/* Admin Routes */}

        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<SignUp />} />

        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/catalog' element={<Catalog />} />

        <Route path='/member' element={<Member />} />
        <Route path='/circulation' element={<Circulation />} />

        {/* Member Routes */}

        <Route path='/home' element={<Home />} />
        <Route path='/search' element={<SearchCatalog />} />
        <Route path='/my_account' element={<MyAccount />} />
        <Route path='/contact' element={<Contact />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
