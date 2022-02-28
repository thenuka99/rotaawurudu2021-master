import React from "react";
import "./Footer.css"

function Footer(){

    let currentYear = new Date().getFullYear();

    return(
            <footer>
                <p>Copyright {currentYear} © Rotaract Mora</p>
            </footer>
    );
}

export default Footer;