import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../state";
import { RiShoppingBag2Line, RiUser3Line, RiSearchLine } from "react-icons/ri";

function Navbar() {
  const [search, setSearch] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className="fixed w-full flex items-center h-[9vh] md:h-[15vh] px-3 md:px-16 z-10">
      <div
        onClick={() => navigate("/")}
        className="logo cursor-pointer w-[50%] flex justify-start"
      >
        <h1 className="text-[12px] font-extrabold text-center tracking-wide text-black opacity-90 uppercase font-stretch">
          Kids
          <span className="font-stretch text-red-600">of</span>
          Manila
        </h1>
        {/* <img src={logo} alt="logo" /> */}
      </div>
      <div className="flex gap-4 w-[50%] justify-end">
        <div className="relative w-[200px] md:w-[400px] ">
          <input
            className={`outline-none w-[200px] mx-2 md:w-[400px] text-right bg-transparent border-b border-b-gray-900 placeholder-red-600 uppercase text-red-600 text-[12px] absolute bottom-0 duration-300
            ${search ? "right-5" : "right-[-120%] opacity-0"}`}
            type="text"
            name="search"
            autoComplete="Off"
            placeholder="Search Here."
          />
          <button
            onClick={() => setSearch(!search)}
            className="absolute right-0"
          >
            <RiSearchLine size={20} />
          </button>
        </div>
        <button
          className="flex relative items-start"
          onClick={() => dispatch(setIsCartOpen({}))}
        >
          <RiShoppingBag2Line size={20} />
          <span className="absolute top-0 right-[0] text-red-100 bg-red-600 px-1 text-[8px] rounded-full">
            {cart.length ? cart.length : ""}
          </span>
        </button>
        <button>
          <RiUser3Line size={20} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
