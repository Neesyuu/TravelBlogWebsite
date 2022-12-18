import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './css/Header.css';
import { placeUserID, placeUserName } from '../store/slices/authSlice'

function Header() {
  let history = useNavigate();

  const dispatch = useDispatch();
  const { userID, userName } = useSelector(state => state.authentication);
  
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt){
      const checkUser = async ()=>{
        try{
          const host = "http://localhost:5000";
          const res = await fetch(`${host}/api/getUser`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "token": localStorage.getItem('jwt'),
            },
          });
          const jsonData = await res.json();
          dispatch(placeUserID(jsonData._id));
          dispatch(placeUserName(jsonData.name));

        }catch(error){
          console.log(error);
        }      
      }
      checkUser();
    }
  }, [])

  const handleLogout = ()=>{
    localStorage.removeItem('jwt');
    history('/');
  }
 

  return (
    <div className="navBar">
        <div className="col1">
            <Link to="/myStory">My Story</Link>
        </div>
        <div className="col2">
            <Link to="/">Traveler's Story</Link>
        </div>
        <div className="col3">
          {localStorage.getItem('jwt') ? <Link to="/login">{userName}</Link> : <></>}
          {localStorage.getItem('jwt') ? <button onClick={handleLogout}>Logout</button> : <Link to="/login">Login</Link>}
        </div>
    </div>
  )
}

export default Header
