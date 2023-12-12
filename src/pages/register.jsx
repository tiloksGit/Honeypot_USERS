import React, { useState } from "react";
import client from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingIcon from "../assets/icons/work-in-progress.gif";

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [registerFlag, setRegisterFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("done");
    client
      .post("/api/v1/user/register", {
        name: name,
        email: email,
        password: password,
        mobile: phone,
      })
      .then((response) => {
        if (response.data.success == true) {
          setRegisterFlag(true);
          toast("Succesfully registered");
          navigate("/");
        } else {
        }
      })
      .catch((err) => {
        toast("Register failed");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="flex justify-center items-center bg-fade text-xl h-screen">
      <form className="flex-col items-center w-[40rem] bg-gray-700 opacity-80 text-lg p-4 px-6 border rounded-lg h-3/4">
        <ToastContainer />
        <div className="text-center text-3xl font-medium text-black">Hello</div>
        <div className="text-center text-text1 p-2">
          Explore More by connecting with us
        </div>
        <label htmlFor="email" className="p-2 text-lg">
          Email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          placeholder="xyz@xyz.com"
          className="w-full h-15 p-2 rounded-lg border mb-4 focus:outline-none bg-slate-700"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="username" className="p-2 text-lg">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={name}
          placeholder="Name"
          className="w-full h-15 p-2 rounded-lg border mb-4 focus:outline-none bg-slate-700"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="phone" className="p-2 text-lg">
          Phone no
        </label>
        <input
          type="text"
          id="phone"
          value={phone}
          placeholder="mobile no"
          className="w-full h-15 p-2 rounded-lg border mb-4 focus:outline-none  bg-slate-700"
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="password" className="p-2 text-lg">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="password"
          className="w-full h-15 p-2 rounded-lg border mb-4 focus:outline-none  bg-slate-700"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center">
          <button
            type="submit"
            onClick={(e) => handleRegister(e)}
            className="w-40 p-2 m-3 border rounded-lg hover:bg-purple"
            disabled={!Boolean(name && password && email && phone)}
          >
            Register
          </button>
          <div className="text-sm">
            Already registered?
            <span className="text-violet-700">
              <Link to="/"> Login</Link>
            </span>
          </div>
        </div>
        {isLoading ? (
          <img
            src={loadingIcon}
            alt="loading..."
            className="opacity-40 absolute top-24 right-1/3 text-center"
          />
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default register;
