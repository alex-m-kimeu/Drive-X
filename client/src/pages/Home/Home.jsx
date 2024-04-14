import bg from "../../assets/bg1.png";
import { Brands } from "../../components/Brands/Brands";

export const Home = () => {
    return (
        <div className="flex flex-col px-[20px] lg:px-[120px] gap-[20px] lg:gap-[40px] py-[20px] lg:py-[40px] items-center justify-center font-sans">
            <div className="flex flex-col items-center justify-center gap-[6px] lg:gap-[12px]">
                <h1 className="text[18px] md:text-[20px] lg:text-[25px] text-gray-600 font-bold">Your Premium Car Rental</h1>
                <h1 className="text[18px] md:text-[20px] lg:text-[25px] text-orange-600 font-bold">Service</h1>
                <p className="text-[11.5px] md:text-[14px] lg:text-[16px] font-light text-gray-500 ">Drive Your Dreams: Where Every Mile Feels Like a Journey!</p>
            </div>
            <div className="w-auto h-auto md:w-[550px] lg:w-[810px] lg:h-[410px] object-contain">
                <img src={bg} alt="bg-image" />
            </div>
            <div className="flex flex-col items-center justify-center gap-[6px] lg:gap-[12px]">
                <h1 className="text[18px] md:text-[20px] lg:text-[25px] text-gray-600 font-bold">Discover the Perfect Ride for You</h1>
                <div className="flex flex-col items-center justify-center gap-[5px] lg:gap-[10px]">
                    <p className="text-[11.5px] md:text-[14px] lg:text-[16px] font-light text-gray-500 ">We assist you in finding a vehicle that perfectly matches your style,</p>
                    <p className="text-[11.5px] md:text-[14px] lg:text-[16px] font-light text-gray-500 ">aspirations, and budget!</p>
                </div>
            </div>
            <Brands />
        </div>
    );
};