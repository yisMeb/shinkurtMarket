import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SIgn_img from "./SIgn_img";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Home = () => {
  const history = useNavigate();
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [inpval, setInpval] = useState({
    UserName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [data, setData] = useState([]);
  console.log(inpval);

  const getdata = (e) => {
    // console.log(e.target.value);

    const { value, name } = e.target;
    // console.log(value,name);

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addData = (e) => {
    e.preventDefault();

    const { name, email, password, confirmpassword } = inpval;

    if (name === "") {
      toast.error(" name field is requred!", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.error("email field is requred", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.error("plz enter valid email addres", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password field is requred", {
        position: "top-center",
      });
    } else if (password.length < 5) {
      toast.error("password length greater five", {
        position: "top-center",
      });
    } else if (password != confirmpassword) {
      toast.error("password don't match", {
        position: "top-center",
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(email, password);
    let user = {
      userName: name,
      email: email,
      password: password,
      confirmPassword: confirmpassword,
    };

    try {
      //its working
      const response = await axios.post("https://localhost:44372/SignUp", user);
      console.log(response.status);
    } catch (error) {
      // Handle error
      console.error(error);
    }
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

      // Set loggedIn state to true to trigger the redirect
      setLoggedIn(true);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
  if (loggedIn) {
    // Redirect to the user dashboard
    //return <NavLink to="/dashboard" />;
    console.log("login");
  }

  return (
    <>
      <div className="container mt-3 content-margin-overlap">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className="text-center col-lg-6">Sin Us</h3>
            <h1 className="text-center col-lg-6">Sign Up</h1>

            <Form>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="name"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Your Name"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
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
              <Form.Group
                className="mb-3 col-lg-6"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  name="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </Form.Group>
              <Button
                variant="primary"
                className="col-lg-6"
                onClick={handleSignup}
                style={{ background: "rgb(67, 185, 127)" }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <p className="mt-3">
              Already Have an Account{" "}
              <span>
                <NavLink to="/signin">SignIn</NavLink>
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

export default Home;
