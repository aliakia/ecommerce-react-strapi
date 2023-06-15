import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart, increaseCount } from "../state";
//{ item, width }
const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const { category, price, name, images } = item.attributes;
  const {
    data: {
      attributes: { url },
    },
  } = images;

  return (
    <div className="h-full md:h-fit">
      <div
        className="cursor-pointer h-auto md:h-auto border border-black border-b-0"
        onClick={() => navigate(`/item/${item.id}`)}
      >
        <img
          src={`http://localhost:1337${url}`}
          alt={name}
          className=" object-cover w-full md:h-[400px]"
        />
      </div>
      <div className="uppercase items-end flex justify-between border border-black p-2 md:py-0">
        <h1 className="text-[18px] font-bold">{name}</h1>
        <h4 className="text-[16px] ">PHP {price}</h4>
      </div>

      <div className="flex justify-end bottom-0">
        <button
          onClick={() => {
            dispatch(addToCart({ item: { ...item, count } }));
          }}
          className="border border-t-0 w-full py-1 border-black uppercase font-bold hover:bg-red-600 hover:text-white duration-100 text-[18px]"
        >
          add to cart
        </button>
      </div>
    </div>

    // <div className={`w-auto relative m-2 h-[500px]`}>
    //   <div className="cursor-pointer">
    //     <div className="h-full">
    //       <img src="https://i.pinimg.com/originals/f4/76/43/f4764386de9de0440fa5dc3b476bd4c7.jpg" />
    //     </div>
    //     <div className="flex justify-between text-[12px]">
    //       <h1 className="font-bold">PLANET</h1>
    //       <h4>PHP 1,300</h4>
    //     </div>

    //     <div className="flex justify-end w-full bottom-0">
    //       <button className="border w-full py-1 border-black uppercase font-bold hover:bg-red-600 hover:text-white duration-100 text-[12px]">
    //         add to cart
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Item;
