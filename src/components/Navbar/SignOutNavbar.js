import React, { useState } from 'react'
import "./Navbar.css"
import { Button } from "../Button"
import { Link, useHistory } from 'react-router-dom';
import logo from "../../assests/cast4logof.png"
import { signout } from '../../helpers/auth';
import { toast } from 'react-toastify';

function SignOutNavbar() {
    const history = useHistory();
    const [clicked, setClicked] = useState(false);

    return (
        <nav className="NavbarItems">
            <Link  to="/">
                <img className="navbar-logo" src={logo} alt="" />
            </Link>
            <div className="menu-icon" onClick={() => setClicked(!clicked)}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={clicked ? "nav-menu-active" : "nav-menu"}>
                {
                    <>
                        <button onClick={() => history.push('/home')} className="nav-links">Home</button>
                        <button onClick={() => {
                            signout(() => {
                                history.push('/');
                                toast.success('Signout Successfully');
                            });
                        }} className="nav-links-mobile">Sign Out</button>
                    </>
                        
                }

            </ul>
            <Button onClick={() => {
                    signout(() => {
                      toast.error('Signout Successfully');
                      history.push('/');
                    });
                  }}>Sign Out</Button>

        </nav >
    )
}

export default SignOutNavbar;
