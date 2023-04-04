import { Button, Input, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "../assests/OpenaiLogoDark.png";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="signup">
      <div className="signup-form-container">
      <Link to="/" ><img src={Logo} alt="openai-logo" className="openai-logo"/></Link> 
        <Text fontSize='4xl'>Create your account</Text>
        <Input placeholder="Email address" size="lg" type="email" required/>
        <Button colorScheme="teal" size="lg" className="full-size">
          Continue
        </Button>
        <Text fontSize="md"> Already have an account? <Link to="/login" className="login-link">Login</Link> </Text>
      </div>
    </div>
  );
};

export default Signup;
