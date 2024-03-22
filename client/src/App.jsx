import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//--- Views Imports
import LandingPage from './views/LandingPage';
import SignUp from './views/SignUp';

//-- Admin Views
import Dashboard from './views/AdminViews/Dashboard';
import Catalog from './views/AdminViews/Catalog';
import AddItem from './views/AdminViews/AddItem';
import Authors from './views/AdminViews/Authors';
import Publishers from './views/AdminViews/Publishers';
import Tags from './views/AdminViews/Tags';

import Member from './views/AdminViews/Member';
import Circulation from './views/AdminViews/Circulation';
import FeesAndPayments from './views/AdminViews/FeesAndPayments';

//-- Member Views
import Home from './views/MemberViews/Home';
import MemberCatalog from './views/MemberViews/MemberCatalog';
import SearchCatalog from './views/MemberViews/SearchCatalog';
import Database from './views/MemberViews/Database';
import MyAccount from './views/MemberViews/MyAccount';
import Contact from './views/MemberViews/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
            
        {/* Admin Routes */}

        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignUp />} />

        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/add-item' element={<AddItem />} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/publishers' element={<Publishers />} />
        <Route path='/tags' element={<Tags />} />

        <Route path='/member' element={<Member />} />
        <Route path='/circulation' element={<Circulation />} />
        <Route path='/fees-and-payments' element={<FeesAndPayments />} />

        {/* Member Routes */}

        <Route path='/home' element={<Home />} />
        <Route path='/member_catalog' element={<MemberCatalog />} />
        <Route path='/search' element={<SearchCatalog />} />
        <Route path='/database' element={<Database />} />
        <Route path='/my_account' element={<MyAccount />} />
        <Route path='/contact' element={<Contact />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
