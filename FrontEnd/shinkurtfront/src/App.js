// App.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Crypto from "./components/Markets/Crypto";
import Commodity from "./components/Markets/Commodity";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import HandleClickHistory from "./components/Histories/HandleClickHistory";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "i18next";
import translationEN from "./localization/en-US.json";
import translationAM from "./localization/am-ET.json";
import UserDashboard from "./components/Dashbord/UserDashboard";
//to test dashboard
//import TempDashboard from "./components/Dashbord/TempDashboard";
i18n.init({
  resources: {
    "en-US": {
      translation: translationEN,
    },
    "am-ET": {
      translation: translationAM,
    },
  },
  lng: "en-US",
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/crypto" element={<Crypto />} />
          <Route path="/commodity" element={<Commodity />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<UserDashboardLayout />} />
          {/*<Route path="/tempdashboard" element={<TempDashboard />} />*/}
          <Route path="/history" element={<HandleClickHistory />} />
        </Routes>
      </div>
      <Footer />
    </I18nextProvider>
  );
}
function UserDashboardLayout() {
  return (
    <>
      <UserDashboard />
    </>
  );
}

export default App;
