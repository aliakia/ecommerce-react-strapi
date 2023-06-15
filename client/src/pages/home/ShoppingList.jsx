import { useDispatch, useSelector } from "react-redux";
import Item from "../../components/Item";
import { useEffect, useState } from "react";
import { setItems } from "../../state";

function ShoppingList() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);

  const handleChange = (e, newVal) => {
    setValue(newVal);
  };

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

  console.log("items", items);

  useEffect(() => {
    getItems();
  }, []);

  const tees = items.filter((item) => item.attributes.categories === "tees");
  const pants = items.filter((item) => item.attributes.categories === "pants");
  const hats = items.filter((item) => item.attributes.categories === "hats");
  const jackets = items.filter(
    (item) => item.attributes.categories === "jackets"
  );

  return (
    <div className="min-h-[85vh] p-2">
      <div className="">
        <ul className="flex justify-around font-bold uppercase p-1 border text-[14px] border-black cursor-pointer">
          <button onClick={() => setValue("all")}>All</button>
          <button onClick={() => setValue("tees")}>Tees</button>
          <button onClick={() => setValue("pants")}>Pants</button>
          <button onClick={() => setValue("jackets")}>Jackets</button>
          <button onClick={() => setValue("hats")}>Hats</button>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 items-end gap-4 mt-2">
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "tees" &&
          tees.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "pants" &&
          pants.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "jackets" &&
          jackets.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "hats" &&
          hats.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </div>
    </div>
  );
}

export default ShoppingList;
