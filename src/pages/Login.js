import { Button, Input, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "../assests/OpenaiLogoDark.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="login-form-container">
      <Link to="/" ><img src={Logo} alt="openai-logo" className="openai-logo"/></Link> 
        <Text fontSize='4xl'>Welcome back</Text>
        <Input placeholder="Email address" size="lg" />
        <Button colorScheme="teal" size="lg" className="full-size">
          Continue
        </Button>
        <Text fontSize="md"> Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link> </Text>
      </div>
    </div>
  );
};

export default Login;
