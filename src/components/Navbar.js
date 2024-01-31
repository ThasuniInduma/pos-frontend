import { useState } from "react"
import { FaBars } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import { NavbarData } from "./NavbarData";

export const Navbar = ({children}) => {

    const[isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

   

    return (
        <div className="Sidebar">
            <div style={{width: isOpen ? "250px": "50px"}} className="Navbar">
                <ul className="NavbarList">
                    <li className="row1">
                        <div className="row1-content">
                            <div style={{display: isOpen ? "block" : "none"}} className="pos"><GiShoppingCart /></div>
                            <h1 style={{display: isOpen ? "block" : "none"}} className="logo">POS</h1>
                            <div style={{marginLeft: isOpen ? "55px" : "10px"}} className="bars"><FaBars onClick={toggle} /></div>
                        </div>
                    </li>
                    
                    {NavbarData.map((value, key) => {
                        return(
                            <li key={key} className="row2" id={window.location.pathname == value.link ? "active" : ""} onClick={() => {window.location.pathname=value.link}}>
                                {""}
                                <div id="icon">{value.icon}</div>
                                <div style={{display: isOpen ? "block" : "none"}} id="title">{value.title}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <main>{children}</main>
        </div>
    )

} 