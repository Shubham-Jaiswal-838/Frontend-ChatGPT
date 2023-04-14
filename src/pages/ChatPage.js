import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { v4 } from "uuid";
import { Button, Flex, Input } from "@chakra-ui/react";
import { BsArrowDownCircleFill, BsSend } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import PulseLoader from "react-spinners/PulseLoader";
import AnimatedTyping from "../AnimatedTyping";
import ToggleDarkLight from "../ToggleDarkLight";
import { useNavigate } from "react-router-dom";
import DeleteBtn from "./DeleteBtn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie"; // Import the js-cookie library


const ChatPage = () => {
  let ref = useRef("");
  const navigate = useNavigate();

  const [question, setQuestion] = useState();
  const [response, setResponse] = useState([]);
  const [hanldeScrollDown, setHanldeScrollDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [hanldeScrollDown]);

  function chatQueryRequest() {

    const userId = localStorage.getItem("id");
    if(userId){
      axios
      .post("https://backend-chat-gpt-git-main-shubham-jaiswal-838.vercel.app/", { userId })
      .then((res) => {
        setResponse(res.data.user.userHistory);
        setHanldeScrollDown(!hanldeScrollDown);
      })
      .catch((err) => {
        toast.error(err.message, { draggable: false });
      });

    }
   
  }

  useEffect(() => {
    chatQueryRequest();
  }, [rerender]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const promptWithId = {
      prompt: ref.current.value,
      userId: localStorage.getItem("id"),
      id: v4(),
    };

    if (promptWithId.prompt) {
      setQuestion(promptWithId.prompt);
      setLoading(true);

      axios
        .post("https://backend-chat-gpt-git-main-shubham-jaiswal-838.vercel.app/chat", { promptWithId })
        .then((res) => {
          setResponse(res.data.userHistory);
          setQuestion("");
          setHanldeScrollDown(!hanldeScrollDown);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.message, { draggable: false });
          setLoading(false);
        });
      ref.current.value = "";
    }
  };

  const handleNavigate = () => {
    localStorage.removeItem("id");
    setTimeout(() => {
      toast.success("Logged out successfully!", {
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

    navigate("/");
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const handleDelete = (id) => {
    const userId = localStorage.getItem("id");
    const token = Cookies.get("token"); // Get the JWT token from the 'token' cookie

    axios
      .delete(`https://backend-chat-gpt-git-main-shubham-jaiswal-838.vercel.app/delete/${userId}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header with the JWT token
        },
      })
      .then((data) => {
        toast.success("Successfully deleted", { draggable: false });
        setRerender(!rerender);
      })
      .catch((error) => {
        toast.error(error.message, { draggable: false });
      });
  };

  const handleMenuOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="mobile-nav-menu">
        <RxHamburgerMenu className="open-menu" onClick={handleMenuOpen} />
        <BiPlus className="add-icon"/>
      </div>
      <div className="chatgpt-container">
        <div className={`history-container ${open ? "open-menu" : ""}`}>
          {open && <RxCross2 className="cross-btn" onClick={handleClose} style={{ width: "30px", height: "30px" }} />}

          <Button className="create-new-chat">
            <BiPlus />
            <h1>New chat</h1>
          </Button>
          <div className="functionalities">
            <ToggleDarkLight />
            <Flex className="logout--btn" onClick={handleNavigate}>
              {" "}
              <FiLogOut /> <p>Log out</p>{" "}
            </Flex>
          </div>
        </div>

        <div className="question-answer-section">
          <div className="chat-container">
            {response &&
              response.map((chat) => {
                return (
                  <div className="chat" key={v4()}>
                    <h3 className="user">
                      {chat.prompt}{" "}
                      <DeleteBtn id={chat.id} handleDelete={handleDelete} />
                    </h3>
                    <div className="chatgpt">
                      {" "}
                      <h3 className="chatgpt-response"> {chat.answer} </h3>{" "}
                    </div>
                  </div>
                );
              })}

            {question && <h3 className="user">{question}</h3>}
          </div>

          <form onSubmit={handleSubmit} className="form">
            <Input placeholder="Send a message..." ref={ref} />
            {loading ? (
              <PulseLoader
                color={"rgb(142, 142, 160)"}
                size={7}
                aria-label="Loading Spinner"
                data-testid="loader"
                cssOverride={override}
                className="loading"
              />
            ) : (
              <button className="send-icon">
                <BsSend />
              </button>
            )}
          </form>
        </div>

        <BsArrowDownCircleFill
          className="bottom-go-btn"
          onClick={() => setHanldeScrollDown(!hanldeScrollDown)}
        />
      </div>
    </>
  );
};

export default ChatPage;
