import { useEffect } from "react";
import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ItemDetails from "./pages/itemsDetails/ItemDetails";
import CheckOut from "./pages/checkout/CheckOut";
import Confirmation from "./pages/confirmation/Confirmation";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import CartMenu from "./components/header/CartMenu";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="w-[100vw]">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="item/:itemId" element={<ItemDetails />}></Route>
          <Route path="/checkout" element={<CheckOut />}></Route>
          <Route
            path="/checkout/confirmation"
            element={<Confirmation />}
          ></Route>
        </Routes>
        <CartMenu />
      </BrowserRouter>
    </div>
  );
}

export default App;
