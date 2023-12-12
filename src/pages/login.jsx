import React, { useEffect, useState } from "react";
import client from "../../api";
import avatar from "../assets/icons/avatar.png";
import { Link } from "react-router-dom";
import loadingIcon from "../assets/icons/work-in-progress.gif";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_ACTUAL_SERVER_API;

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const userEndpoint = "/api/v1/user/login";
  const cmsEndpoint = "/api/v1/user/cms/login";
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(isAdmin);
    axios
      .post(isAdmin ? cmsEndpoint : userEndpoint, {
        email: username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success == true) {
          if (isAdmin) {
            window.location.replace(
              `http://localhost:5173?token=${response.data.token}}&flag=${response.data.flag}`
            );
            return;
          }
          localStorage.setItem("accessKeyToken", response.data.token);
          localStorage.setItem("flag", response.data.flag);
          location.reload();
          setLoginErr(false);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginErr(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const changeEndpoint = () => {
    if (isAdmin) {
      setEndpoint("/api/v1/user/cms/login");
    } else {
      setEndpoint("/api/v1/user/login");
    }
    console.log(isAdmin);
    console.log(endpoint);
  };

  return (
    <div className="flex justify-center items-center text-xl h-screen">
      <form className="flex-col items-center w-[35rem] bg-slate-600 opacity-80 p-4 text-lg px-6 border rounded-lg h-3/4">
        <div className="text-center text-3xl font-medium text-black">
          Hello Again!
        </div>
        <div className="text-center p-2">
          Explore More by connecting with us
          {loginErr ? <p className="text-red-600">Login Failed</p> : ""}
          <div className="flex justify-center">
            <section
              onClick={() => {
                setIsAdmin(!isAdmin);
              }}
              className="border flex bg-fuchsia-500 cursor-pointer mt-2 "
            >
              <div
                className={!isAdmin ? "w-2/4 text-fuchsia-500 bg-white" : ""}
              >
                user
              </div>
              <div className={isAdmin ? "w-2/4 text-fuchsia-500 bg-white" : ""}>
                admin
              </div>
            </section>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-2/4 text-center">
            <img src={avatar} alt="" className="" />
          </div>
        </div>
        <label htmlFor="username" className="p-2 text-lg">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="username or email"
          className="w-full h-15 p-2 rounded-lg text-[#444] border mb-4 focus:outline-none"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password" className="p-2 text-lg">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="password"
          className="w-full h-15 p-2 rounded-lg text-[#444] border mb-4 focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center">
          <button
            type="submit"
            onClick={(e) => handleLogin(e)}
            className="w-40 hover:bg-purple-300 p-2 m-3 border rounded-lg bg-green-600"
            disabled={!Boolean(username && password)}
          >
            Login
          </button>
          <div className="text-sm">
            Not registered?
            <span className="text-violet-400">
              <Link to="/register"> Register here</Link>
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

export default login;
