import { Button, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Logo from "../assests/OpenaiLogoDark.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

   const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
      email: "",
      password: "",
       id: localStorage.getItem("id")
  })


  function validEmail(e) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search(filter) != -1;
  }
  
  const handleSubmit = () =>{
     if(loginDetails.password && loginDetails.email){
  
         if(validEmail(loginDetails.email)){
            // alert(loginDetails.email+" "+ loginDetails.password);
             
            axios.post("https://backend-chat-gpt-git-main-shubham-jaiswal-838.vercel.app/login", {loginDetails})
            .then((data) => {
              //  console.log(data.data.token);

              if(data.data.status === "success"){
                  localStorage.setItem("id", data.data.userId[0]._id);

                  const expiryDate = new Date();
                  // Set the expiry date to 90 days from the current date
                  expiryDate.setDate(expiryDate.getDate() + 90);
                  const token = data.data.token;
                  const cookieString = `token=${token};expires=${expiryDate.toUTCString()}`;
                  document.cookie = cookieString;

                  if(data.data.userId[0]._id === localStorage.getItem("id")){
                    setLoginDetails({
                      email: "",
                      password: ""
                     })

                     setTimeout(() => {
                      toast.success('Logged in successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                        });
                     }, 100);

                      navigate("/chat");
              
                     
                  }
              }else {
                toast.error(data.data.msg, {draggable: false});

              }
            }).catch((err) =>{
               toast.error(err.message, {draggable: false});

            })
              
         }else {
           toast.error("Please Enter a valid Email", {draggable: false});

         }
     }else {
       toast.error("Please fill all Input", {draggable: false});
     }
  }  
  const handleInput = (e) =>{
     const {name, value} = e.target;
      
     setLoginDetails({...loginDetails, [name]: value});
  }

  return (
    <div className="login">
      <ToastContainer />
      <div className="login-form-container">
      <Link to="/" ><img src={Logo} alt="openai-logo" className="openai-logo"/></Link> 
        <Text fontSize='4xl'>Welcome back</Text>
        <Input placeholder="Email address" value={loginDetails.email} type="email" size="lg" name="email" onChange={(e) => handleInput(e)}/>
        <Input placeholder="Password" size="lg" value={loginDetails.password} type="password" name="password" onChange={(e) => handleInput(e)}/>
        <Button colorScheme="teal" size="lg" className="full-size" onClick={handleSubmit}>
          Continue
        </Button>
        <Text fontSize="md"> Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link> </Text>
      </div>
    </div>
  );
};

export default Login;
