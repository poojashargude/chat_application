import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MessagesContext from "../context/messagesContext/messagesContext";

function UserChat() {
  const {
    message_send_success,
    message_send_error,
    get_user_messages_success,
    get_admin_messages_success,
    clearError,
    clearInfo,
    sendMessage,
    getAdminMessages,
    getUserMessages,
  } = useContext(MessagesContext);

  const [message, setMessage] = useState({ phone_number: "", messages: "" });
  const { phone_number, messages } = message;
  const [user, setUser] = useState();
  //const { phone_number, password } = this.state;
  const [open, setOpen] = React.useState(true);

  const data = localStorage.getItem("phone_number");
  const handleChange = (e) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
      phone_number: data,
    });

    //setMessage({ phone_number: data });
    console.log("33", data);
    clearError();
    clearInfo();
  };
  const submit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage({
      messages: "",
    });
  };

  useEffect(() => {
    getAdminMessages();
  }, []);

  // useEffect(() => {
  //   getUserMessages();
  //   console.log("44", get_user_messages_success);
  // }, [get_user_messages_success]);

  return (
    <div className="w-full h-screen overflow-y-hidden bg-gray-400">
      <nav className="bg-gray-800 w-full h-20 ">
        <div className="flex flex-row ">
          <img className=" h-16 w-15 p-2 ml-6 pt-3" src="/Photos/user.png" />
          <span className="text-white p-2 font-bold  text-2xl">{data}</span>
        </div>
      </nav>
      <div className="flex h-3/4 w-full flex-row">
        <div className="w-26 ">
          {get_admin_messages_success &&
          get_admin_messages_success !== null &&
          data
            ? get_admin_messages_success.map((messages) =>
                messages.phone_number == data
                  ? messages.chat.map((reply) =>
                      reply.isAdmin == true ? (
                        <div className="text-white bg-brand-Tgray mt-6 h-12 p-3 ml-8 rounded-lg">
                          <h1>{reply.messages}</h1>
                        </div>
                      ) : (
                        <div className="text-black bg-white mt-6 h-12 p-3 ml-8 rounded-lg">
                          <h1>{reply.messages}</h1>
                        </div>
                      )
                    )
                  : ""
              )
            : ""}
          {/* <div className="text-white bg-brand-Tgray mt-16 h-12 p-3 ml-8 rounded-lg">
            <h1>Hii</h1>
          </div> */}
          {/* <input
            class=" border border-gray-500 rounded-full ml-12 py-2 italic text-lg  text-gray-700 mt-5 outline-none leading-tight w-full pl-5 h-12"
            type="text"
            placeholder=" Hi Ram  "
          > */}
          {/* {get_user_messages_success && get_user_messages_success !== null
            ? get_user_messages_success.map((messages) => (
                <div className="h-12 text-white w-full md:w-11/12 p-3 border-brand-Navbar border rounded-md mt-2 flex justify-between items-center">
                  <small className=" text-brand-buttons px-2 text-base font-POPPINS">
                    {messages.message}
                  </small>
                </div>
              ))
            : ""} */}
        </div>
      </div>

      <footer className="flex w-full flex-row  bg-gray-700">
        <div className="w-9/12 ">
          <input
            class=" border border-gray-500 rounded-full ml-12 py-2 italic  text-gray-700 mt-5 outline-none leading-tight w-full pl-5 h-12"
            type="text"
            name="messages"
            value={messages}
            onChange={handleChange}
            placeholder="Enter Your Message"
          ></input>
        </div>
        <div className=" ">
          <button className=" outline-none text-gray-700 hover:text-green-500 ml-20 rounded-full bg-white my-4 mx-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-14 w-14"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={submit}
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default UserChat;
