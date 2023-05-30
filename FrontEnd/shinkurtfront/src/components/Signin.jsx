import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SIgn_img from "./SIgn_img";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const history = useNavigate();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  // const modifiedEmail = email.replace(/\@/g, "%40");
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    let data = { Email: email, Password: password };
    try {
      //its working
      const response = await axios.post("https://localhost:44372/Login", data);

      console.log(response.status);

      // Handle the response
      const { token } = response.data;
      console.log(token);

      // Store the authentication token in local storage or a state management solution
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      // Set loggedIn state to true to trigger the redirect
      setLoggedIn(true);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  if (loggedIn) {
    // Redirect to the user dashboard
    window.location.reload(true)
    return <Navigate replace to="/dashboard"/>;
  }

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className="text-center col-lg-6">Sin IN</h3>
            <h1 className="text-center col-lg-6"></h1>
            <h1 className="text-center col-lg-6"></h1>
            <h1 className="text-center col-lg-20"></h1>

            <h1 className="text-center col-lg-6">Sign In</h1>
            <Form>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 col-lg-6"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                variant="primary"
                className="col-lg-6"
                onClick={handleLogin}
                style={{ background: "rgb(67, 185, 127)" }}
                type="submit"
              >
                Log In
              </Button>
            </Form>

            <span>
              <NavLink to="/signup"></NavLink>
            </span>
            <p className="mt-3">
              <span>
                <NavLink to="/signup">Forgot Password? </NavLink>
              </span>{" "}
            </p>
          </div>
          <SIgn_img />
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
