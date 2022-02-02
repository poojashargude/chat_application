import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MessagesContext from "../context/messagesContext/messagesContext";

function UserLogin(props) {
  let history = useHistory();

  const { logout } = useContext(MessagesContext);
  const [user, setUser] = useState({ phone_number: "" });
  const { phone_number } = user;
  //const { phone_number, password } = this.state;
  const [open, setOpen] = React.useState(true);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    localStorage.setItem("phone_number", phone_number);
    console.log(user);
    setUser({
      phone_number: "",
    });
    const data = localStorage.getItem("phone_number");
    console.log("24", data);
    if (data) {
      history.push("/userchat");
    }
  };

  const onLogout = () => {
    logout();
    window.location.reload(true);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className=" w-full align-middle bg-brand-Bblack h-full">
        <nav className="w-full h-1/3 bg-brand-Newc"></nav>
        <div class="w-full flex justify-center">
          <form class="bg-white shadow-md p-6 mb-4  fixed rounded-lg md:w-2/6 w-5/6 -mt-36">
            <div className="flex flex-row justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex flex-row justify-center">
              <span className="text-3xl font-bold ml-3">User Login</span>
            </div>
            <div class="mb-4">
              <label
                class="block text-brand-Bblack text-xl font-bold mb-2 md:mt-4"
                for="username"
              >
                Username
              </label>
              <input
                class="shadow appearance-none rounded w-full py-2 px-3 text-brand-Bblack leading-tight focus:outline-none focus:shadow-outline border-2 border-brand-Newc"
                id="username"
                type="text"
                name="phone_number"
                value={phone_number}
                onChange={handleChange}
                placeholder="Enter Your Mobile Number"
              ></input>
            </div>

            <div class=" items-center">
              <button
                class="hover:bg-blue-700 hover:text-white text-brand-Bblack font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline md:mb-6 bg-brand-Newc w-full text-xl"
                type="button"
                onClick={submit}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
