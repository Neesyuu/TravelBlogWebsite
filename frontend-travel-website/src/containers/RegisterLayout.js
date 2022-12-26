import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./css/Auth.css"


function RegisterLayout() {
    const [ credentials, setCrendentials ] = useState({name:"", email: "", password: "", confirmPassword: ""});
    const [ approve, setApprove ] = useState(false);
    const [ erroroccured, setErroroccured ] = useState({status: "false", message: ""});

    let history = useNavigate();

    const onChange = (e)=>{
        setCrendentials({...credentials, [e.target.name]: [e.target.value]});
    }

    const checkPassword = (e)=>{
        onChange(e);
        if(credentials.password == e.target.value){
            console.log('Correct Password');
            setApprove(true);
        }else{
            console.log('Incorrect Password');
            setApprove(false);
        }
    }

    const onSubmit = async (e)=>{
        e.preventDefault();
        const host = "http://localhost:5000";
        const res = await fetch(`${host}/api/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name[0] ,email: credentials.email[0], password: credentials.password[0], role: 'editor'})
        })
        const jsonData = await res.json();
        console.log(jsonData)

        if(jsonData.errors){
            if(jsonData.errors.email){
                setErroroccured({'status': true, 'message': jsonData.errors.email});
            }
            if(jsonData.errors.password){
                setErroroccured({'status': true, 'message': jsonData.errors.password});
            }
        }
        if(jsonData.user){
            console.log('Welcome');
            localStorage.setItem('jwt', jsonData.jwt);
            localStorage.setItem('UserName', jsonData.userName);
            history('/');
        }
    }

  return (
    <div className="authContent authOverflow" style={{ backgroundImage: `url("http://localhost:5000/public/auth_bg.jpg")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="authDiv">
            <form onSubmit={onSubmit}>
                <div className="inputDiv">
                    <span>Full Name</span>
                    <br/>
                    <input type='text' id="name" name="name" onChange={onChange}/>
                </div>

                <div className="inputDiv">
                    <span>Email</span>
                    <br/>
                    <input type='email' id="email" name="email" onChange={onChange}/>
                </div>

                <div className="inputDiv">
                    <span>Password</span>
                    <br/>
                    <input type="password" id="password" name="password" onChange={onChange}/>
                </div>

                <div className="inputDiv">
                    <span>Confirm Password</span>
                    <br/>
                    <input type="password" id="confirmPassword" name="confirmPassword" onChange={checkPassword}/>
                </div>

                <div className="btnDiv">
                <button disabled={!approve}>Register</button>
                </div>

                {erroroccured.status ? <h4> {erroroccured.message}</h4>:<h4></h4>}
            </form>
            <hr width="80%"/>
            <div className="optionDiv">
            <Link to="/login">Already have account ?</Link>
            </div>

        </div>
    </div>
  )
}

export default RegisterLayout
