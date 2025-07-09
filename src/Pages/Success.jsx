import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { api_route, socket } from "../App";
import axios from "axios";
const Success = () => {

  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
      <img
        src="/home.png"
        className="w-full"
        onClick={() => (window.location.href = "/")}
      />
      <div className=" bg-opacity-75 w-full flex flex-col md:flex-row  items-center justify-center text-black px-2 py-8 rounded-lg  mt-5">
        <div
          className="flex flex-col gap-y-2 md:items-end items-center md:py-2"
          dir="rtl "
        >
          <span className="text-3xl md:text-5xl ">تم إنشاء الطلب بنجاح </span>
        </div>
      </div>
    </div>
  );
};

export default Success;
