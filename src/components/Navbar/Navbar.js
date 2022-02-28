import React, { useState } from 'react'
import { MenuItems } from "./MenuItems"
import "./Navbar.css"
import { Button } from "../Button"
import { Link } from 'react-router-dom';
import logo from "../../assests/cast4logof.png"

function Navbar() {

    const [clicked, setClicked] = useState(false);

    return (
        <nav className="NavbarItems">
            <Link  to="/">
                <img className="navbar-logo" src={logo} alt="" />
            </Link>
            <div className="menu-icon" onClick={() => setClicked(!clicked)}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars" }></i>
            </div>
            <ul className={clicked ? "nav-menu-active" : "nav-menu"}>
                {
                    MenuItems.map(
                        (item, index) => {
                            return <li key={index}><a href={item.url} className={item.cName}>{item.title}</a></li>
                        }
                    )
                }

            </ul>
            <Link to="/SignIn">
                <Button>Sign in</Button>
            </Link>
        </nav >
    )
}

export default Navbar;
