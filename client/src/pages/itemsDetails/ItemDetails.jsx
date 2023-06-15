import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../state";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";

import Banner from "../../components/Banner";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleChange = (e, newVal) => {
    setValue(newVal);
  };

  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=images`,
      { method: "GET" }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=images",
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]);

  return (
    <div className="">
      <Banner />
      <div className="w-full flex justify-end text-[14px] md:text-2xl uppercase p-2 mt-[8vh] md:mt-0">
        <h1>Prev</h1>/<h1>Next</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        <div className="h-auto">
          <img
            src={`http://localhost:1337${item?.attributes?.images?.data?.attributes?.url}`}
            alt={item?.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-auto">
          <div className="border border-black h-auto mb-4">
            <div className="uppercase items-end flex justify-between border-b border-black p-2">
              <h1 className="text-4xl font-bold">{item?.attributes?.name}</h1>
              <h4 className="text-2xl">php {item?.attributes?.price}</h4>
            </div>
            <p className="text-justify p-2 pb-4 uppercase text-[14px]">
              Description: <br></br>
              {item?.attributes?.categories}
              <br></br>
              {item?.attributes?.description}
            </p>

            <button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              className="w-full border-t  border-black p-2 uppercase font-bold hover:bg-red-600 hover:text-white duration-100"
            >
              add to cart
            </button>
          </div>
          <h1 className="font-bold text-[14px] uppercase text-red-600">
            Like it? Try these.
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {items.slice(0, 6).map((item, i) => (
              <Item item={item} key={`${item.name}-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
