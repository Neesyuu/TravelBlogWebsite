import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./css/AboutMe.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeMessage, placeMessageType } from "../store/slices/alertSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <h2>{children}</h2>
          {/* <Typography>{children}</Typography> */}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function AboutMeLayout() {
  const jwt = localStorage.getItem("jwt");
  const history = useNavigate();
  const dispatch = useDispatch();
  const [passcredentials, setPasscrendentials] = useState({
    oldpassword: "",
    newpassword: "",
    confirmPassword: "",
  });
  const [usercredentials, setUsercrendentials] = useState({ name: "" });
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [value, setValue] = useState(0);
  const [approve, setApprove] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getUserInfo = async () => {
    const res = await fetch(`http://localhost:5000/api/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: jwt,
      },
    });

    const jsonData = await res.json();

    if (jsonData) {
      setUserData({ name: jsonData.name, email: jsonData.email });
    } else {
      console.log("Failed");
      dispatch(placeMessage("Failed to fetch Data"));
      dispatch(placeMessageType("error"));
    }
  };

  useEffect(() => {
    if (jwt) {
      getUserInfo();
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    // eslint-disable-next-line
  }, []);

  const onChangeUser = (e) => {
    setUsercrendentials({
      ...usercredentials,
      [e.target.name]: [e.target.value],
    });
  };

  const onChangePassword = (e) => {
    setPasscrendentials({
      ...passcredentials,
      [e.target.name]: [e.target.value],
    });
  };

  const checkPassword = (e) => {
    onChangePassword(e);
    if (passcredentials.newpassword[0] === e.target.value) {
      setApprove(true);
    } else {
      setApprove(false);
    }
  };

  const onSubmitUsername = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/api/cusername`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: jwt,
      },
      body: JSON.stringify({ name: usercredentials.name[0] }),
    });

    const jsonData = await res.json();

    if (jsonData) {
      dispatch(placeMessage("Username is changed"));
      dispatch(placeMessageType("success"));
      getUserInfo();
      history("/");
    } else {
      console.log("Failed");
      dispatch(placeMessage("Failed to change username"));
      dispatch(placeMessageType("error"));
    }
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/api/cpass`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: jwt,
      },
      body: JSON.stringify({
        oldpassword: passcredentials.oldpassword[0],
        newpassword: passcredentials.newpassword[0],
      }),
    });

    const jsonData = await res.json();

    if (jsonData) {
      dispatch(placeMessage("Password is changed"));
      dispatch(placeMessageType("success"));
      getUserInfo();
      history("/login");
    } else {
      console.log("Failed");
      dispatch(placeMessage("Failed to change password"));
      dispatch(placeMessageType("error"));
    }
  };

  return (
    <>
      <div className="aboutMe_content">
        {/* <div className="bg_aboutMe">
            <img src="http://localhost:5000/public/icons/auth_bg.jpg" alt="aboutMe"/>
        </div> */}
        {!loggedIn && (
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "#ABE7E9",
              display: "flex",
              height: 400,
              borderRadius: "20px",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab label="It's Me" {...a11yProps(0)} />
              <Tab label="About You" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <p>
                My Name is{" "}
                <h1 style={{ marginTop: "0px", marginBottom: "30px" }}>
                  Nischal Suwal
                </h1>
              </p>
              <p>
                You can contact me @{" "}
                <h1 style={{ marginTop: "0px", marginBottom: "30px" }}>
                  neesyuu@gmail.com
                </h1>
              </p>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <p>
                About You
                <h1 style={{ marginTop: "0px", marginBottom: "30px" }}>
                  You must loggin first :)
                </h1>
              </p>
            </TabPanel>
          </Box>
        )}
        {loggedIn && (
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "#ABE7E9",
              display: "flex",
              height: 400,
              borderRadius: "20px",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab label="It's Me" {...a11yProps(0)} />
              <Tab label="About You" {...a11yProps(1)} />
              <Tab label="Change Username" {...a11yProps(2)} />
              <Tab label="Change Password" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <p>
                My Name is{" "}
                <h1 style={{ marginTop: "0px", marginBottom: "30px" }}>
                  Nischal Suwal
                </h1>
              </p>
              <p>
                You can contact me @{" "}
                <h1 style={{ marginTop: "0px", marginBottom: "30px" }}>
                  neesyuu@gmail.com
                </h1>
              </p>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <p>
                Your Name is{" "}
                <h1 style={{ marginTop: "0px", marginBottom: "30px" }}>
                  {userData.name}
                </h1>
              </p>
              <p>
                Your Email Id is{" "}
                <h1 style={{ marginTop: "0px", marginBottom: "30px" }}>
                  {userData.email}
                </h1>
              </p>
              <p>
                Your Password is{" "}
                <h1 style={{ marginTop: "0px", marginBottom: "30px" }}>
                  ******
                </h1>
              </p>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <form onSubmit={onSubmitUsername}>
                <div className="inputDiv">
                  <span>Username</span>
                  <br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={userData.name}
                    onChange={onChangeUser}
                  />
                </div>
                <div className="btnDiv">
                  <button>Change UserName</button>
                </div>
              </form>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <form onSubmit={onSubmitPassword}>
                <div className="inputDiv">
                  <span>Old Password</span>
                  <br />
                  <input
                    type="password"
                    id="oldpassword"
                    name="oldpassword"
                    onChange={onChangePassword}
                  />
                </div>
                <div className="inputDiv">
                  <span>New Password</span>
                  <br />
                  <input
                    type="password"
                    id="newpassword"
                    name="newpassword"
                    onChange={onChangePassword}
                  />
                </div>

                <div className="inputDiv">
                  <span>Confirm Password</span>
                  <br />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={checkPassword}
                  />
                </div>
                <div className="btnDiv">
                  <button disabled={!approve}>Change Password</button>
                </div>
              </form>
            </TabPanel>
          </Box>
        )}
      </div>
    </>
  );
}

export default AboutMeLayout;
