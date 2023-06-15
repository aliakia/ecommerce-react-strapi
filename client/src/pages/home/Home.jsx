import Banner from "../../components/Banner";
import Hero from "./Hero";
import ShoppingList from "./ShoppingList";

const Home = () => {
  return (
    <div className="h-[100vh]">
      <Hero />
      <Banner />
      <ShoppingList />
    </div>
  );
};

export default Home;
