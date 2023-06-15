import bgVid from "../../assets/images/bg-vid.mp4";
import { RiArrowDownLine } from "react-icons/ri";

const Hero = () => {
  return (
    <div className="relative z-[-1]">
      <div className="flex w-[75%] items-center md:justify-between absolute top-[20%] md:top-[50%] left-[12%]">
        <div className="mr-4">
          <h1 className="text-2xl font-extrabold tracking-wide text-black opacity-90 uppercase md:text-8xl font-stretch">
            Kids
            <span className="text-2xl font-stretch md:text-4xl text-red-600">
              of
            </span>
            Manila
          </h1>
        </div>
        <div className="flex items-center gap-2 text-red-600 font-bold">
          <h6 className="flex items-center text-[9px] md:text-1xl font-stretch md:text-[16px] uppercase">
            scroll down to shop
            <RiArrowDownLine />
          </h6>
        </div>
      </div>
      <div className="h-[100vh] top-0 object-cover z-[-1] w-full">
        <video autoPlay loop muted className="h-[100vh] md:h-auto">
          <source src={bgVid} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Hero;
