import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./css/Auth.css";

function LoginLayout() {
  const [credentials, setCrendentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [erroroccured, setErroroccured] = useState({
    status: "false",
    message: "",
  });

  let history = useNavigate();

  const onChange = (e) => {
    setCrendentials({ ...credentials, [e.target.name]: [e.target.value] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const host = "http://localhost:5000";
    const res = await fetch(`${host}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email[0],
        password: credentials.password[0],
      }),
    });
    const jsonData = await res.json();
    console.log('jsonData lol');
    console.log(jsonData);

    if (jsonData.errors) {
      if (jsonData.errors.email) {
        setErroroccured({ status: true, message: jsonData.errors.email });
      }
      if (jsonData.errors.password) {
        setErroroccured({ status: true, message: jsonData.errors.password });
      }
    }
    if (jsonData.jwt) {
      console.log("Welcome");
      localStorage.setItem('jwt', jsonData.jwt);
      history("/");
    }
  };

  return (
    <div className="authContent" style={{ backgroundImage: `url("http://localhost:5000/public/auth_bg.jpg")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="authDiv">
          <form onSubmit={onSubmit}>
            <div className="inputDiv">
              <span>Email</span>
              <br />
              <input type="email" id="email" name="email" onChange={onChange} />
            </div>

            <div className="inputDiv">
              <span>Password</span>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                onChange={onChange}
              />
            </div>

            <div className="btnDiv">
              <button>Login</button>
            </div>

            {erroroccured.status ? (
              <span> {erroroccured.message}</span>
            ) : (
              <span></span>
            )}
          </form>
          <hr width="80%" />
          <div className="optionDiv">
            <Link to="/register">Create an account !!</Link>
          </div>
        </div>
      </div>
  );
}

export default LoginLayout;
