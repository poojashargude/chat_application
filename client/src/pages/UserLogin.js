import React, { useState, useContext, useEffect } from "react";
import MessagesContext from "../context/messagesContext/messagesContext";
import { useHistory } from "react-router-dom";

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

  // useEffect(() => {
  //   console.log(phone_number)
  //   if (phone_number !== null) {
  //     console.log("23", phone_number);
  //     props.history.push("/userchat");
  //   }
  // }, [props.history]);

  return (
    <div className=" w-full h-screen overflow-y-hidden align-middle bg-black">
      <nav className="w-full h-1/3 bg-green-300"></nav>
      <div class="w-full flex h-full justify-center">
        <div class=" bg-white p-8 rounded shadow-2xl h-min w-7/12  pt-6 pb-8 mb-4   -mt-36 ">
          <h2 class=" text-2xl italic font-POPPINS font-bold text-brand-NewBlue mb-3 ">
            {" "}
            create your Account{" "}
          </h2>
          <form class="space-y-3 justify-items-center">
            <div className="mt-7">
              <label className="text-lg font-bold  font-POPPINS italic">
                Mobile Number{" "}
              </label>
              <input
                class="  shadow font-POPPINS appearance-none italic mt-5 rounded-lg bg-blue-50   border-red-400 border w-full py-3 px-3 text-grey-darker mb-1  text-sm outline-none"
                id="username"
                type="number"
                name="phone_number"
                value={phone_number}
                onChange={handleChange}
                placeholder="Enter your Mobile Number"
              />
            </div>

            <button
              className="text-white bg-red-200 p-3 shadow-lg  hover:text-black  md:w-3/12 w-full border border-red-400 hover:bg-white md:mx-80 text-xl  rounded-lg   md:mt-5 mt-7"
              type="button"
              onClick={submit}
              // onClick={() => {
              //   history.push("/userchat");
              // }}
            >
              Submit
            </button>
            <button
              class="hover:bg-blue-700 hover:text-white text-brand-Bblack font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline md:mb-16 bg-brand-Ggreen"
              type="button"
              onClick={() => onLogout()}
            >
              Log Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
