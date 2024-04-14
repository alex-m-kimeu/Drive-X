import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

const links = [
    { id: 1, name: 'Fleet', path: '/fleet' },
    { id: 2, name: 'About', path: '/about' },
    { id: 3, name: 'Contact', path: '/contact' },
    { id: 4, name: 'FAQ', path: '/faq' },
];

export const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-[10px] lg:gap-0 py-[10px] px-[25px] lg:px-[120px] font-sans shadow sm:shadow-md lg:shadow-none">
            <div className="flex justify-between w-full lg:w-auto">
                <Link to="/">
                    <img className='w-[90px] md:w-[140px] h-3 md:h-5 hover:cursor-pointer' src={logo} alt="logo" />
                </Link>
                <div className="lg:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>
            <div className={`lg:px-[20px] lg:py-[10px] lg:bg-white lg:shadow-md lg:rounded-[25px] ${isOpen ? 'block' : 'hidden'} lg:flex lg:flex-row`}>
                <ul className='flex flex-col lg:flex-row items-center gap-[15px] lg:gap-[40px] justify-center'>
                    {links.map((link) => (
                        <li key={link.id}>
                            <NavLink
                                to={link.path}
                                className='font-sans text-[15px] font-normal text-gray-600 hover:text-orange-600 hover:cursor-pointer'
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={`flex lg:flex-row items-center gap-[80px] lg:gap-[20px] ${isOpen ? 'block' : 'hidden'} lg:flex`}>
                <Link to="/fleet">
                    <button
                        className="p-[5px] bg-black text-white text-[15px] font-normal rounded-[5px]">
                        Rent a Car
                    </button>
                </Link>
                <button
                    onClick={handleLogout}
                    className="p-[5px] bg-white text-black text-[15px] font-normal border border-black border-solid rounded-[5px]">
                    Log Out
                </button>
            </div>
        </div>
    );
};