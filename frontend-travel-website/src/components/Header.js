import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './css/Header.css';
import { placeUserID, placeUserName } from '../store/slices/authSlice'
import IconPack from './IconPack';
import { placeMessage, placeMessageType } from '../store/slices/alertSlice';

function Header() {
  const history = useNavigate();

  const dispatch = useDispatch();
  const { userID, userName } = useSelector(state => state.authentication);

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

  const handleLogout = ()=>{
    localStorage.removeItem('jwt');
    history.push("/");
    dispatch(placeMessage("See Ya"));
    dispatch(placeMessageType('loading'));
  }
 

  return (
    <div className="navBar">
        <div className="col1">
              <IconPack image='public/myStory.png' title='My Story' link='/myStory'/>
        </div>
        <div className="col2">
            <Link to="/" style={{ textDecoration: 'none' }}><span className='titleName'>Traveler's Story</span></Link>
        </div>
        <div className="col3">
          {/* {localStorage.getItem('jwt') ? <Link to="/login" style={{ textDecoration: 'none' }}>{userName}</Link> : <></>} */}
          {localStorage.getItem('jwt') ? <IconPack image='public/logout.png' title='Logout' onClick={handleLogout}/> : <IconPack image='public/acc.png' title='Login' link='/login'/>}
        </div>
    </div>
  )
}

export default Header
