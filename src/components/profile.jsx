import React, { useEffect, useState } from "react";
import client from "../../api";
import axios from "axios";

const profile = () => {
 const [userData, setUserData] = useState("");
 if(localStorage.getItem("flag")==1){
    axios.defaults.baseURL = import.meta.env.VITE_HONEYPOT_SERVER_API;
 }else{
    axios.defaults.baseURL = import.meta.env.VITE_ACTUAL_SERVER_API;
 }
  useEffect(() => {
    axios
      .get("api/v1/user/details", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessKeyToken")}`,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success === true) {
          setUserData(response.data.user);
        } else {
          //   console.log(response);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessKeyToken");
    location.reload();
  };
  return (
    <div className="bg-[#444] opacity-70 w-1/2 my-20 flex-col items-center rounded-3xl shadow-md">
      <div className="flex p-2 justify-center">
        <section className="w-[7rem] text-[1.5rem] p-1">Name</section>
        <section className="w-[30rem] text-[1.5rem]  p-1 border rounded-lg">
          {userData.name}
        </section>
      </div>
      <div className="flex p-2 justify-center">
        <section className="w-[7rem] text-[1.5rem]  p-1">Email</section>
        <section className="w-[30rem] text-[1.5rem]  p-1 border rounded-lg">
          {userData.email}
        </section>
      </div>
      <div className="flex p-2 justify-center">
        <section className="w-[7rem] text-[1.5rem]  p-1">Mobile</section>
        <section className="w-[30rem] text-[1.5rem] p-1 border rounded-lg">
          {userData.mobile}
        </section>
      </div>
      <div className="flex justify-center">
      <button
        onClick={() => logout()}
        className="relative bottom-[-30rem] w-[5rem] text-green-600 list-none text-center text-lg p-3 bg-rose-100 rounded-lg hover:bg-gray-600"
      >
        logout
      </button>
      </div>
    </div>

  );
};

export default profile;
