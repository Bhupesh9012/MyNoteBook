import { useState } from "react"
import React from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
      const Navigate = useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
         const {name,email,password,cpassword}=credentials;
         if (password !== cpassword) {
            props.showAlert("Passwords do not match", "danger");
            return;
        }
         const response = await fetch("http://localhost:5000/api/auth/createuser", {
          
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
         body:JSON.stringify({name,email,password})
      });
            const json=await response.json()
            console.log(json);
            if (json.success){
                //save the auth tocken and redirect
                localStorage.setItem('token',json.authtoken);
                Navigate("/");
                props.showAlert("Account Created Successfully", "success");
            }
            else{
                props.showAlert("Invalid credentials", "danger")
            }
    }
        const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className="container mt-2">
            <h2 className="my-2">Create an account to Login to MyNoteBook</h2>
      <form onSubmit={handleSubmit}>
  <div className="my-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email Address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5}required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="password" name="cpassword" onChange={onChange}  minLength={5}required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>
    </div>
    
  )
}

export default Signup