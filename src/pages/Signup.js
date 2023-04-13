import { Button, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Logo from "../assests/OpenaiLogoDark.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import bcrypt from "bcrypt";

const Signup = () => {
  const navigate = useNavigate();
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;

    setSignupDetails({ ...signupDetails, [name]: value });
  };
  function validEmail(e) {
    var filter =
      /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search(filter) != -1;
  }

  const handleSubmit = async () => {
    if (signupDetails.name && signupDetails.password && signupDetails.email) {
 
      if (validEmail(signupDetails.email)) {
        axios
          .post("https://project-chatgpt-backend.onrender.com/signup", { signupDetails })
          .then((data) => {
            // console.log(data.data);
             localStorage.setItem("id", data.data.user._id);
            if(data.data.status === "success"){
              setSignupDetails({
                name: "",
                email: "",
                password: "",
              })
              navigate("/login");
              setTimeout(() => {
                toast.success('Signed up successfully!', {
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
            
          
            }
          })
          .catch((err) => {
            toast.error(err.message, {draggable: false});
          });

      } else {
        toast.error("Please Enter a valid Email",  {draggable: false});
      }
    } else {
      toast.error("Please fill all Input",  {draggable: false});

    }
  };

  return (
    <div className="signup">
      <ToastContainer />
      <div className="signup-form-container">
        <Link to="/">
          <img src={Logo} alt="openai-logo" className="openai-logo" />
        </Link>
        <Text fontSize="4xl">Create your account</Text>
        <Input
          placeholder="Name"
          value={signupDetails.name}
          size="lg"
          name="name"
          type="text"
          required
          onChange={(e) => handleInput(e)}
        />
        <Input
          placeholder="Email address"
          value={signupDetails.email}
          size="lg"
          name="email"
          type="email"
          required
          onChange={(e) => handleInput(e)}
        />
        <Input
          placeholder="Password"
          value={signupDetails.password}
          size="lg"
          name="password"
          required
          type="password"
          onChange={(e) => handleInput(e)}
        />
        <Button
          colorScheme="teal"
          size="lg"
          className="full-size"
          onClick={handleSubmit}
        >
          Continue
        </Button>
        <Text fontSize="md">
          {" "}
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>{" "}
        </Text>
      </div>
    </div>
  );
};

export default Signup;
