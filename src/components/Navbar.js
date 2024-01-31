import { useEffect, useState } from "react"
import { FaBars } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import { NavbarData } from "./NavbarData";
import { useNavigate } from "react-router-dom";

export const Navbar = ({children}) => {

    const navigate = useNavigate();
    const[isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    
        
    useEffect(() => {
        // Implement logic to check if the user is logged in (e.g., by checking a token)
        const storedToken = localStorage.getItem("token");
        const userIsLoggedIn = !!storedToken;
        setIsLoggedIn(userIsLoggedIn);
      }, []);
    
      
    
      const handleNavClick = (link) => {
        if (link === "/login" && isLoggedIn) {
          // If the user is already logged in and tries to go to the login page,
          // you may want to redirect them to another page or do nothing.
          // For example:
          navigate("/dashboard");
        } else {
          // If the user is not logged in or is navigating to a different page,
          // proceed with navigation as usual.
          navigate(link);
        }
      };
    
      const handleLogout = () => {
        // Implement your logout logic (e.g., remove the token from storage)
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
      };

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
                            <li key={key} className="row2" id={window.location.pathname == value.link ? "active" : ""} onClick={() => {handleNavClick(value.link)}}>
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