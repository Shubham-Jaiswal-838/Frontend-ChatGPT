import { Button } from '@chakra-ui/react'
import React from 'react'
import Logo from "../assests/OpenaiLogo.png"
import {Link} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  return (
    <>
    <ToastContainer/>
    <div className='home'>
        <div className="auth-btns">
            <img  src={Logo} alt="Open AI logo" className='openai-logo'/>
            <p>Welcome to ChatGPT</p>
            <p>Log in with your OpenAi account to continue</p>
            
            <div className="btns">
           <Link to="/login"> <Button colorScheme='teal'>Log in</Button></Link>
           <Link to="/signup"><Button colorScheme='teal'>Sign up</Button></Link> 
            </div>
        
        </div>

    </div>
    </>

  )
}

export default Home