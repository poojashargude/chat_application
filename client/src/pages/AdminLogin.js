import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MessagesContext from "../context/messagesContext/messagesContext";

function AdminLogin(props) {
  //let history = useHistory();

  const {
    adminLogin,
    admin_login_error,
    admin_login_success,
    clearError,
    clearInfo,
    logout,
    admin_auth,
  } = useContext(MessagesContext);

  const [admin, setAdmin] = useState({ phone_number: "", password: "" });
  const { phone_number, password } = admin;
  //const { phone_number, password } = this.state;
  const [open, setOpen] = React.useState(true);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
    clearError();
  };
  const submit = (e) => {
    localStorage.setItem("phone_number", phone_number);
    localStorage.setItem("password", password);
    e.preventDefault();
    console.log(admin);
    adminLogin(admin);
    setAdmin({
      phone_number: "",
      password: "",
    });
  };

  const onLogout = () => {
    console.log(admin_auth);
    logout();
    window.location.reload(true);
  };

  useEffect(() => {
    if (admin_auth == true) {
      console.log(admin_auth);
      props.history.push("/adminchat");
    }
    console.log(admin_login_error);
  }, [props.history, admin_auth]);

  return (
    <div className="flex flex-col w-full h-screen">
    <div className=" w-full align-middle bg-brand-Bblack h-full">
      <nav className="w-full h-1/3 bg-brand-Newc"></nav>
      <div class="w-full flex justify-center">
        <form class="bg-white shadow-md p-6 mb-4  fixed rounded-lg md:w-2/6 w-5/6 -mt-36">
        <div className="flex flex-row justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
        </div>
        <div className="flex flex-row justify-center">
        <span className="text-3xl font-bold ml-3">Admin Login</span>
        </div>
          <div class="mb-4">
            <label
              class="block text-brand-Bblack text-xl font-bold mb-2 md:mt-5"
              for="username"
            >
             Mobile Number
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
          <div class="mb-6">
            <label
              class="block text-brand-Bblack text-xl font-bold mb-2"
              for="password"
            >
              Password
            </label>
            
            <input
              class="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-2 border-brand-Newc"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="******************"
            ></input>
            <a
              class="inline-block align-baseline font-bold text-brand-Bblack hover:text-blue-800 float-right mb-6 "
              href="http://localhost:3000/forgotpassword"
            >
              Forgot Password?
            </a>
          </div>
          <div class=" items-center">
            <button
              class="hover:bg-blue-700 hover:text-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline md:mb-6 bg-brand-Newc w-full text-xl"
              type="button"
              onClick={submit}
            >
              Log In
            </button>
            {/* <button
              class="hover:bg-blue-700 hover:text-white text-brand-Bblack font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline md:mb-16 bg-brand-Ggreen"
              type="button"
              onClick={() => onLogout()}
            >
              Log Out
            </button> */}
            
          </div>
          {/* <a
              class="inline-block align-baseline font-bold text-sm text-brand-Bblack hover:text-blue-800 md:mb-16"
              href="#"
            >
              Forgot Password?
            </a> */}
          {admin_login_error &&
            admin_login_error.error.map((err) => (
              <div
                class="relative py-2 pl-4 pr-10 mt-2 leading-normal text-red-700 bg-white rounded-lg border-2 border-red-700"
                role="alert"
              >
                <p>{err.msg}</p>
                <span class="absolute inset-y-0 right-0 flex items-center mr-4">
                  <svg
                    class="w-4 h-4 fill-current"
                    role="button"
                    viewBox="0 0 20 20"
                    onClick={() => clearError()}
                  >
                    <path
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </div>
            ))}
          {admin_login_success && admin_login_success !== null ? (
            <div
              class="bg-green-100 border border-brand-Darkgreen text-brand-Darkgreen px-4 py-1 rounded relative"
              role="alert"
            >
              <span class="block sm:inline font-POPPINS">
                Admin Login successfully
              </span>
              <span class="absolute top-0 bottom-0 right-0 px-4 py-1">
                <svg
                  onClick={() => {
                    clearInfo();
                  }}
                  class="fill-current h-6 w-6 text-brand-Darkgreen"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
    </div>
  );
}

export default AdminLogin;
