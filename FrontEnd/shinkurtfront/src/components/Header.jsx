import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../index.css";
import { BsMoonStarsFill } from "react-icons/bs";
import { CgSun } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Header() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState(document.body.dataset.bsTheme);
  const [navtheme, setNavtheme] = useState("navbar-dark bg-dark");

  useEffect(() => {
    document.body.dataset.bsTheme = theme;
  }, [theme]);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };
const handleLogout = async (e) => {
    console.log("logout");
    e.preventDefault();
    try {
      //its working
      const response = await axios.post('https://localhost:44372/Logout');
      console.log(response.status);
      // remove token and email from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    } catch (error) {
      // Handle error
      console.error(error);
    }
    window.location.reload(true)
    return <Navigate replace to="/"/>;
  };
  return (
    <nav
      className={
        navtheme +
        " navbar fixed-top navbar-expand-lg border-bottom p-3 shadow-lg mb-5"
      }
    >
      <div className="container">
        <Link to="/" className="navbar-brand mb-0 h1 give-space-mr">
          <img
            className="d-inline-block align-top"
            src="../../onion.png"
            alt="logo"
            width={30}
            height={30}
          ></img>
          ሽንኩርት
        </Link>
        <button
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          className="navbar-toggler"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link active">
                {t("Home")}
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("Catagory")}
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link to="/crypto" className="dropdown-item">
                    {" "}
                    {t("crypto")}
                  </Link>
                </li>
                <li>
                  <Link to="/commodity" className="dropdown-item">
                    {" "}
                    {t("commodity")}
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item active">
              <Link to="/about" className="nav-link">
                {t("About")}
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/contact" className="nav-link">
                {t("Contact")}
              </Link>
            </li>
          </ul>
          <div className="give-space-mr">
  {localStorage.getItem('token') && localStorage.getItem('email') ? (
    <div className="sign"> 
      <button className="btn btn-outline-primary active btn-space-giver" onClick={handleLogout}>
        {t("LogOut")}
      </button>
    </div>
   ) : (
    <div className="sign"> 
      <Link
        to="/signin"
        type="button"
        className="btn btn-outline-primary active btn-space-giver"
      >
        {t("LogIn")}
      </Link>
      <Link
        to="/signup"
        type="button"
        className="btn btn-outline-primary btn-space-giver"
      >
        {t("SignUp")}
      </Link>
    </div>
  )}
</div>
          <div>
            <label htmlFor="Language">{t("Language")}</label>
            <select
              id="Language"
              value={i18n.language}
              onChange={handleLanguageChange}
            >
              <option value="en-US">{t("English")}</option>
              <option value="am-ET">{t("Amharic")}</option>
            </select>
          </div>
          <div className="form-check form-switch mx-4">
            {theme === "dark" ? (
              <BsMoonStarsFill size={30} />
            ) : (
              <CgSun size={30} />
            )}
            <input
              className="form-check-input p-2"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
              onClick={() => {
                var elem = document.body;
                setTheme(elem.dataset.bsTheme === "dark" ? "white" : "dark");
                setNavtheme(
                  theme === "dark"
                    ? "navbar-light bg-light"
                    : "navbar-dark bg-dark"
                );
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Header;
