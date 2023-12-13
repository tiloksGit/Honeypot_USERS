import React, { useEffect, useState } from "react";
import client from "../../api";
import avatar from "../assets/icons/avatar.svg";
import { Link } from "react-router-dom";
import loadingIcon from "../assets/icons/work-in-progress.gif";
import axios from "axios";
import "../pages/login.css";

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
    axios
      .post(isAdmin ? cmsEndpoint : userEndpoint, {
        email: username,
        password,
      })
      .then((response) => {
        if (response.data.success == true) {
          if (isAdmin) {
            window.location.replace(
              `https://honeypot-cms.netlify.app/?token=${response.data.token}&flag=${response.data.flag}&email=${username}`
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
        setLoginErr(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div
      className="flex justify-center items-center text-xl h-screen w-screen"
      style={{ background: "#4D50C0" }}
    >
      <form
        className="flex-col items-center w-[30rem] h-[45rem]  opacity-80 p-4 text-lg px-6 border rounded-lg h-3/4"
        style={{ background: "#ECF5FF" }}
      >
        <div className="text-center text-2xl font-medium text-[#889DF0] mt-2 mb-2">
          Hello Again!
        </div>
        <div className="text-center p-2" style={{ color: "#889DF0" }}>
          Explore More by connecting with us
          {loginErr ? <p className="text-red-600">Unauthorized</p> : ""}
          <div className="flex justify-center">
            <section
              onClick={() => {
                setIsAdmin(!isAdmin);
              }}
              className="toggle-section mt-5"
            >
              <div className={`toggle-option ${!isAdmin ? "active" : ""}`}>
                User
              </div>
              <div className={`toggle-option ${isAdmin ? "active" : ""}`}>
                Admin
              </div>
            </section>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-2/5 text-center mt-2 mb-2">
            <img src={avatar} alt="" className="" />
          </div>
        </div>
        <label htmlFor="username" className="p-2 text-lg text-[#889DF0]">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="username or email"
          className="w-full h-15 p-2 rounded-lg text-[#889DF0] border mt-3 mb-3 focus:outline-none"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password" className="p-2 text-lg text-[#889DF0]">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="password"
          className="w-full h-15 p-3 rounded-lg text-[#889DF0] border mt-3 mb-3 focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center">
          <button
            type="submit"
            onClick={(e) => handleLogin(e)}
            className="w-40 hover:bg-[#7282DE] p-2 m-3 border rounded-lg bg-[#4D50C0]"
            disabled={!Boolean(username && password)}
          >
            Login
          </button>
          <div className="text-sm text-[#4D50C0]">
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
