// App.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/Home";
import About from './components/About';
import Contact from './components/Contact';
import Footer from "./components/Footer";
import Crypto from './components/Markets/Crypto';
import Commodity from './components/Markets/Commodity';
import Signin from './components/Signin';
import Signup from './components/Signup';
import UserDashboard from './components/Dashbord/UserDashboard';
import HandleClickHistory from './components/Histories/HandleClickHistory';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from 'i18next';
import translationEN from './localization/en-US.json';
import translationAM from './localization/am-ET.json';

i18n.init({
  resources: {
    'en-US': {
      translation: translationEN,
    },
    'am-ET': {
      translation: translationAM,
    },
  },
  lng: 'en-US',
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Header/>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/crypto' element={<Crypto />} />
          <Route path='/commodity' element={<Commodity />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/history' element={<HandleClickHistory />} />
          <Route path='/dashboard' element={<UserDashboard />} />
        </Routes>
      </div>
      <Footer />
    </I18nextProvider>
  );
}

export default App;
