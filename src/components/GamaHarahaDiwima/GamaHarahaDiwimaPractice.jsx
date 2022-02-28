import React from "react";
import {Link} from "react-router-dom";
import GameSubNav from "../GameSubNav";
import SNavBar from "../Navbar/SignOutNavbar";

function gamaHarahaPractice(){
    
    return(
        <>
        <SNavBar/>
        <GameSubNav
            name="Gama Haraha Diwima"
            back="/gama-haraha-diwima"
        />
        </>
    );

}


export default gamaHarahaPractice;