import React, { useEffect, useState } from "react";
import { api_route, products, user } from "../App";
import { FaTrash } from "react-icons/fa";

import axios from "axios";
const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        await axios.get(api_route + "/cart/" + user).then((res) => {
          setCartData(res.data.userCart);
        });
      } catch (e) {
        if (e.response.status === 404) {
          setError(true);
          console.log("error");
          setCartData(null);
        }
      }
    })();
  }, []);

  const deleteFromCart = async (id) => {
    const empty = false;
    if (cartData.products.length === 1) {
    }
    try {
      await axios.delete(api_route + "/cart/" + user + "/" + id).then((res) => {
        console.log(res);

        setCartData(cartData.products.length === 1 ? null : res.data.userCart);
      });
    } catch (e) {
      if (e.response.status === 404) {
        setError(true);
        setCartData(null);
      }
    }
  };
  return (
    <div
      className="w-full bg-white rounded-md p-4 shadow-lg flex flex-col gap-y-8"
      dir="rtl"
    >
      <span className="text-purple-700 font-bold pb-2">السلة</span>
      <div className="w-full flex flex-col gap-y-2 text-xs">
        <div className="flex justify-between items-center ">
          <div className="flex items-center justify-center w-full text-purple-700 font-bold">
            المنتج
          </div>
          <div className="flex items-center justify-center w-full text-purple-700 font-bold">
            متجر
          </div>
          <div className="flex items-center justify-center w-full text-purple-700 font-bold">
            الكمية
          </div>
          <div className="flex items-center justify-center w-full text-purple-700 font-bold">
            السعر
          </div>
          <div className="flex items-center justify-center w-full text-purple-700 font-bold">
            الإجمالي
          </div>
        </div>
        {cartData?.products.map((product) => {
          return (
            <div className="w-full flex justify-between items-center relative ">
              <div className="flex items-center justify-center w-full">
                <img src={product.image} className="w-14 shadow-lg" />
              </div>
              <div className="flex items-center justify-center w-full">
                <span>{product.name}</span>
              </div>
              <div className="flex items-center justify-center w-full">
                <span>{product.quantity}</span>
              </div>
              <div className="flex items-center justify-center w-full">
                <span>د.ب {product.price} </span>
              </div>
              <div className="flex items-center justify-center w-full">
                <span>د.ب {product.price * product.quantity}</span>
              </div>
              <div className="flex items-center justify-center absolute bottom-0 left-0">
                <FaTrash
                  className="text-red-500"
                  onClick={() => deleteFromCart(product.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
      {cartData?.totalPrice ? (
        <div className="w-full py-2 flex justify-between items-center text-purple-600">
          <span>السعرالإجمالي </span>
          <span> د.ب {cartData?.totalPrice}</span>
        </div>
      ) : (
        ""
      )}

      {cartData?.products?.length ? (
        <div className="w-full flex items-center justify-center">
          <button className="bg-yellow-400 font-bold text-center text-black w-2/3 rounded-md py-2 my-2" onClick={()=>{
            window.location.href='/payment'
          }}>
            إتمام الدفع
          </button>
        </div>
      ) : (
        ""
      )}

      {error ? (
        <div className="flex flex-col my-5 items-center justify-center gap-y-8">
          <span>لا توجد منتجات في السلة </span>
          <span
            className="bg-purple-600 text-white px-5 py-2 rounded-md"
            onClick={() => (window.location.href = "/")}
          >
            أضف منتجات{" "}
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
