import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../App";

const Login = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setLoginInfo({ ...loginInfo, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      alert("All fields are mandatory.");
      return false;
    }
    const res = await fetch(`${process.env.REACT_APP_SERVICE_URL}login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const response = await res.json();
    if (res.status === 201) {
      dispatch({ type: "CHECK_LOGIN", payload: true });
      setLoginInfo({ email: "", password: "" });
      document.getElementById("login-form").reset();
      document.getElementById("login-btn").classList.add("d-none");
      document.getElementById("login-success-btn").classList.remove("d-none");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      alert(`${response.error}. Try again`);
    }
  };

  return (
    <div class="container signup mt-4 p-5 col-md-5 col-sm-8 col-xs-12">
      <form id="login-form">
        <div className="form-group text-center title mb-3 text-secondary">
          Login to your account
        </div>

        <div class="form-group mt-1">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="email"
            placeholder="Registered Email ID"
            onChange={handleInput}
          />
        </div>

        <div class="form-group mt-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            class="form-control"
            id="password"
            placeholder="******"
            required
            onChange={handleInput}
          />
        </div>
        <div className="mt-3">
          <small>
            Don't have an account?&nbsp;
            <Link to="/signup">Register here</Link>
          </small>
        </div>
        <div>
          <button
            class="btn btn-primary mt-3 w-100"
            id="login-btn"
            onClick={handleSubmit}
          >
            Login
          </button>
          <button
            className="btn btn-success w-100 d-none"
            id="login-success-btn"
          >
            Login Successful
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
