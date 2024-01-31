import { AiFillDashboard } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { FaBagShopping } from "react-icons/fa6";
import { FaStoreAlt } from "react-icons/fa";
import { MdPointOfSale } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

export const NavbarData = [

    {
        title: "User",
        icon: <FaUserCircle />,
        link:"#",
    },
    {
        title: "Dashboard",
        icon: <AiFillDashboard />,
        link:"/",
    },
    {
        title: "Manage Item Category",
        icon: <BiSolidCategory />,
        link:"/categories",
    },
    {
        title: "Manage Item",
        icon: <FaBagShopping />,
        link:"/items",
    },
    {
        title: "Manage Stock",
        icon: <FaStoreAlt />,
        link:"/stock",
    },
    {
        title: "Point Of Sale",
        icon: <MdPointOfSale />,
        link:"/orders",
    },{
        title: "Checkout",
        icon: <IoLogOut />,
        link:"/login",
    }

];