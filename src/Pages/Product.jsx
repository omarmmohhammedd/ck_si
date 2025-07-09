import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { api_route, products, user } from "../App";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { RiShoppingCartFill } from "react-icons/ri";
import Cart from "../components/Cart";
import { IoCloseCircle } from "react-icons/io5";
export const Product = () => {
  const { id } = useParams();
  const data = products.filter((e) => e.id == id)[0];
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const addToCart = async (product) => {
    setLoading(true);
    await axios
      .post(api_route + "/cart", { user, product })
      .then(({ data: response }) => {
        setLoading(false);
        setSuccess(true);
        window.scrollTo = (0,0)
        setTimeout(()=>{
               setSuccess(false);
        },2000)
      });
  };
  if (!data) {
    return (
      <>
        <img
          src="/home2.png"
          className="w-full"
          onClick={() => window.location.href = "/"}
        />
        <div className="w-full flex flex-col items-center justify-center font-bold text-red-500">
          <span>No Product Found ... Invalid data</span>
          <button
            className="bg-gray-500 px-3 py-2 text-white rounded-md my-2"
            onClick={() => (window.location.href = "/")}
          >
            Back
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      {loading ? (
        <div className="fixed top-0 z-50 w-full h-screen bg-black bg-opacity-20 flex items-center justify-center ">
          <TailSpin
            height="60"
            width="60"
            color="blue"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        ""
      )}{" "}
      {success ? (
        <div className="fixed top-0 animate-bounce z-50 w-full h-20 bg-purple-600 text-white  flex items-center justify-center ">
          <span className="">تم أضافة المنتج إلي السلة </span>
        </div>
      ) : (
        " "
      )}
      <div className="w-full flex flex-col items-center justify-start bg-gray-100 min-h-screen p-2">
        <img
          src="/home2.png"
          className="w-full"
          onClick={() => (window.location.href = "/")}
        />
        <div className="flex flex-col p-2 bg-white w-full items-center justify-center my-3 relative">
          <img src={data.image} className="w-3/4" />
          <span className="absolute top-0 left-4 bg-red-500 text-white px-3 text-sm py-1 rounded-b">
            تقرير
          </span>
        </div>
        <div className="w-full px-5 my-2 flex flex-col gap-y-3" dir="rtl">
          <div className="flex items-center  w-full  gap-x-2">
            <img
              src={data.name === "مركز سلطان" ? "/soltan.png" : ""}
              className="rounded-md w-16"
            />
            <span>{data.name}</span>
          </div>
          <img src="/home3.png" />
          <div className="flex gap-x-5 ">
            {data.descrtions.map((d) => (
              <span className="font-bold">{d}</span>
            ))}
          </div>

          <span className="mt-10 font-bold">العروض المتاحة في الفروع</span>
          <div className="grid grid-cols-2 gap-5 gap-y-2 font-bold ">
            {data.avaialble.map((d) => (
              <span className="border text-xs py-2 bg-white border-dashed text-center">
                {d}
              </span>
            ))}
          </div>

          <div className="pr-5 mt-5 flex gap-x-3 ">
            <div className="font-bold flex gap-x-2">
              {" "}
              <span>{new Date(Date.now()).toDateString().split(" ")[1]}</span>
              <span>
                {" "}
                {new Date(Date.now()).toDateString().split(" ")[2]}th
              </span>
            </div>
            <span> Till </span>
          </div>
          <div className="flex items-center justify-between mt-5 w-full">
            <span className="w-1/4">الكمية</span>
            <div className="w-3/4 flex items-center justify-center gap-x-2">
              <span
                onClick={() => setQuantity(quantity == 1 ? 1 : quantity - 1)}
                className="w-2/12 bg-gray-500 text-white rounded-md py-3 px-2 text-center text-xl cursor-pointer"
              >
                -
              </span>
              <span className="w-1/12 text-xl font-bold text-center">
                {quantity}
              </span>
              <span
                onClick={() => setQuantity(quantity + 1)}
                className="w-2/12 bg-gray-500 text-white rounded-md py-3 px-2 text-center text-xl  cursor-pointer"
              >
                +
              </span>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <button
              className="bg-yellow-400 font-bold text-center text-black w-1/2 rounded-md py-2 my-5"
              onClick={() =>
                addToCart({
                  id: data.id,
                  price: data.price,
                  image: data.image,
                  quantity,
                  name: data.name,
                })
              }
            >
              إضافة إلي السلة{" "}
            </button>
          </div>
        </div>
      </div>
      <RiShoppingCartFill
        className="absolute top-4 text-purple-600 right-1/3  h-7 w-7"
        onClick={() => setCartVisible(!cartVisible)}
      />
      {cartVisible ? (
        <div
          className={`bg-gray-100 bg-opacity-55 w-full h-screen absolute ${
            window.location.pathname === "/" ||
            window.location.pathname.match(/^\/product\/\d+$/).length
              ? "absolute"
              : "hidden"
          } flex justify-center items-center flex-col`}
        >
          <div className="flex flex-col w-10/12">
            <div>
              {" "}
              <IoCloseCircle
                className="text-red-500 text-3xl cursor-pointer"
                onClick={() => setCartVisible(!cartVisible)}
              />
            </div>
            <Cart />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
