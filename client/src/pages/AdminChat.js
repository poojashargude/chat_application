import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MessagesContext from "../context/messagesContext/messagesContext";

function AdminChat() {
  const {
    message_send_success,
    message_send_error,
    get_admin_messages_error,
    get_admin_messages_success,
    admin_reply_success,
    admin_reply_error,
    adminReply,
    clearError,
    clearInfo,
    sendMessage,
    getAdminMessages,
  } = useContext(MessagesContext);

  //console.log("16", get_admin_messages_success);

  const [message, setMessage] = useState({ phone_number: "", messages: "" });
  const { phone_number, messages } = message;
  const [user, setUser] = useState();
  //console.log("22", user);

  //const { phone_number, password } = this.state;
  const [open, setOpen] = React.useState(true);

  const data = localStorage.getItem("phone_number");
  const handleChange = (e) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
      phone_number: user,
    });
    console.log(user);
    clearError();
    clearInfo();
  };

  const submit = (e) => {
    e.preventDefault();
    adminReply(message);
    //sendMessage(message);
    setMessage({
      messages: "",
    });
  };

  useEffect(() => {
    getAdminMessages();
  }, [get_admin_messages_success]);

  return (
    <div className="flex w-full flex-row">
      <div className="md:w-3/12 w-1/3">
        {/* <ForthPage/> */}
        <div className="h-full border-b border-gray-600 bg-brand-Agray">
          <nav className=" w-full h-20 border-b border-gray-600">
            <div className="flex flex-row">
              <img
                className=" h-16 w-15 p-2 ml-6 pt-3"
                src="/Photos/user.png"
              />
              <span className="text-white p-2 font-bold md:text-2xl text-xl">
                {data}
              </span>
            </div>
          </nav>

          <div class="container flex mx-auto w-full border-b border-gray-600">
            <input
              type="text"
              class="px-4 py-2  rounded-full outline-none w-full m-8 bg-brand-Tgray"
              placeholder="Search or Start New Chat "
            />
          </div>

          {get_admin_messages_success && get_admin_messages_success !== null
            ? get_admin_messages_success.map((messages) =>
                messages.phone_number !== 9145530022 ? (
                  <div
                    className="h-12 text-white w-full md:w-11/12 p-3 border-brand-Navbar border rounded-md mt-2 flex justify-between items-center"
                    onClick={() => setUser(messages.phone_number)}
                  >
                    <small className=" text-brand-buttons px-2 text-base font-POPPINS">
                      {messages.phone_number}
                    </small>
                  </div>
                ) : (
                  ""
                )
              )
            : ""}
        </div>
      </div>
      <div className="md:w-9/12 w-2/3">
        <div className="w-full h-screen">
          <nav className=" w-full h-20 bg-brand-Agray border-b border-gray-600">
            <div className="flex flex-row">
              <img
                className=" h-16 w-15 p-2 ml-6 pt-3"
                src="/Photos/user.png"
              />
              <span className="text-white p-2 font-bold text-xl">{user}</span>
            </div>
          </nav>

          <div className="flex h-3/4 w-full flex-row">
            <div className="w-full h-screen bg-brand-Bblack flex">
              {get_admin_messages_success &&
              get_admin_messages_success !== null &&
              user
                ? get_admin_messages_success.map((messages) =>
                    messages.phone_number == user
                      ? messages.chat.map((data) =>
                          data.isAdmin == true ? (
                            <div className="text-white bg-brand-Tgray mt-16 h-12 p-3 ml-8 rounded-lg">
                              <h1>{data.messages}</h1>
                            </div>
                          ) : (
                            <div className="text-black bg-white mt-16 h-12 p-3 ml-8 rounded-lg">
                              <h1>{data.messages}</h1>
                            </div>
                          )
                        )
                      : ""
                  )
                : ""}
            </div>
          </div>
          <footer className="flex w-full flex-row h-24 bg-brand-Agray">
            <div className="w-11/12">
              <input
                class=" border border-gray-500 rounded-full ml-12 py-2  text-white mt-5 outline-none leading-tight w-full m-3 pl-5 h-12 bg-brand-Tgray"
                type="text"
                name="messages"
                value={messages}
                onChange={handleChange}
                placeholder="Enter Your Message"
              ></input>
            </div>
            <div className="">
              <button className=" outline-none text-white ml-14 rounded-full bg-brand-Agray my-4 mx-6">
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
      </div>
    </div>
  );
}

export default AdminChat;
