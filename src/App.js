import React, { useState, useRef, useEffect, CSSProperties } from "react";
import axios from "axios";
import {v4} from "uuid";
import { Button, Input } from '@chakra-ui/react'
import {BsArrowDownCircleFill, BsSend} from "react-icons/bs"
import {BiPlus} from "react-icons/bi"
import PulseLoader from "react-spinners/PulseLoader";


const App = () => {
  let ref = useRef("");

  const [question, setQuestion] = useState();
  const [response, setResponse] = useState([]);
  const [hanldeScrollDown, setHanldeScrollDown] = useState(false);
  let [loading, setLoading] = useState(false);


  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [hanldeScrollDown]);


  const handleSubmit = (e) => {
    e.preventDefault();
     
    let prompt = ref.current.value;

    if(prompt){
    setQuestion(prompt);   
    setLoading(true);

      axios
      .post("http://localhost:8080/chat", { prompt })
      .then((res) => {
        setResponse(res.data);
        setQuestion("");
        setLoading(false);
       
      })
      .catch((err) => {
        console.log(err.message);
      });
    // console.log(prompt);
     ref.current.value = "";

    } 
   
     
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };


  return (
    <div className="chatgpt-container">

      <div className="history-container">
      <Button colorScheme='red' className="create-new-chat">
        <BiPlus />
         <h1>New chat</h1> 
      </Button>
      </div>
       
       <div className="question-answer-section">
      <div className="chat-container">
        {response &&
          response.map((chat) => {
            return (
              <div className="chat" key={v4()}>
                <h3 className="user">{chat.prompt}</h3>
                <h3 className="chatgpt">{chat.answer}</h3>
              </div>
            );
          })}

         {
           question &&  <h3 className="user">{question}</h3>
         }

      </div>

      <form onSubmit={handleSubmit} className="form">
        <Input placeholder='Send a message...' ref={ref} />
        {
          loading ? (
            <PulseLoader
          color={"rgb(52, 52, 65)"}
          size={7}
          aria-label="Loading Spinner"
          data-testid="loader"
          cssOverride={override}
          className="loading"
        />
          ): (
        <button className="send-icon" onClick={() => setHanldeScrollDown(!hanldeScrollDown)} ><BsSend /></button>


          )
        }
        

      </form>

      </div>

      <BsArrowDownCircleFill className="bottom-go-btn" onClick={() => setHanldeScrollDown(!hanldeScrollDown)}/>

    </div>
  );
};

export default App;
