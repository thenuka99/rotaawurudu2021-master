import React from "react";
import {Link} from "react-router-dom";
import GameSubNav from "../GameSubNav";
import SNavBar from "../Navbar/SignOutNavbar";

function LissanaGasaPractice(){
    
    return(
        <>
        <SNavBar/>
        <GameSubNav
            name="Lissana Gaha Nagima"
            back="/lissana-gasa"
        />
        </>
    );

}


export default LissanaGasaPractice;