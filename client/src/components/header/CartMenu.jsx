import { useSelector, useDispatch } from "react-redux";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state";
import { useNavigate } from "react-router-dom";
import {
  RiCloseLine,
  RiAddLine,
  RiSubtractLine,
  RiArrowRightFill,
} from "react-icons/ri";

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  return (
    <div className="">
      <div
        className={`bg-white h-fit w-full fixed z-[10] left-0 duration-300 p-2 ${
          isCartOpen ? "top-[-200%]" : "top-0"
        }`}
      >
        <div className="border border-black h-full w-full">
          {/* headers */}
          <div className="w-full border-b p-2 border-black text-[14px] md:text-2xl font-bold text-black tracking-wider uppercase flex justify-between">
            <h1>Shopping Bag</h1>
            <button onClick={() => dispatch(setIsCartOpen({}))}>
              <RiCloseLine />
            </button>
          </div>

          {/* items */}
          <div className="grid grid-cols-3 md:grid-cols-7 gap-2 h-fit p-2">
            {cart.length > 0 ? (
              <h1>Shopping bag have {cart.length} items.</h1>
            ) : (
              <h1>Shopping bag is empty.</h1>
            )}
            {cart.map((item) => (
              <div
                key={`${item.attributes.name}-${item.id}`}
                className="w-auto"
              >
                <div className="image h-auto relative">
                  <button
                    className="absolute right-[2%]"
                    onClick={() => dispatch(removeFromCart({ id: item.id }))}
                  >
                    <RiCloseLine size={30} />
                  </button>
                  <img
                    src={`http://localhost:1337${item?.attributes?.images?.data?.attributes?.url}`}
                    alt={item?.name}
                    className="h-full"
                  />
                </div>
                <div className="text-black uppercase flex justify-between items-baseline">
                  <h5 className="font-bold">{item.attributes.name}</h5>
                  <h6 className="text-[12px]">PHp {item.attributes.price}</h6>
                </div>
                <div className="flex w-full">
                  <div className="grid grid-cols-2 justify-items-center w-[90%] border border-black font-bold text-[14px]">
                    <button
                      onClick={() => dispatch(increaseCount({ id: item.id }))}
                      className="hover:bg-red-600 w-full uppercase hover:text-white duration-100"
                    >
                      ADD
                    </button>
                    <button
                      onClick={() => dispatch(decreaseCount({ id: item.id }))}
                      className="hover:bg-red-600 w-full uppercase hover:text-white duration-100"
                    >
                      remove
                    </button>
                  </div>
                  <h6 className="px-5 ml-1 border-b border-red-600 text-red-600">
                    {item.count}
                  </h6>
                </div>
              </div>
            ))}
          </div>
          <div
            className={
              cart.length > 0
                ? " flex items-center w-full justify-between gap-4 bottom-0 left-0 border-t border-black p-2 uppercase"
                : "hidden"
            }
          >
            <div className="">
              <h1 className="font-bold">Subtotal </h1>
              <h3 className="text-[14px]">PHP {totalPrice}</h3>
            </div>
            <button
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
              className="text-[14px] font-bold bg-black text-white p-2 flex items-center gap-2"
            >
              CHECKOUT
              <RiArrowRightFill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
