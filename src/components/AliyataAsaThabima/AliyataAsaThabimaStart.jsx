import React from "react";
import {Link} from "react-router-dom";
import GameSubNav from "../GameSubNav";
import SNavBar from "../Navbar/SignOutNavbar";

function aliyataAsaThabimaStart(){
    
    return(
        <>
        <SNavBar />
        <GameSubNav
            name="Aliyata Asa Thabima"
            back="/aliyata-asa-thabima"
        />
        </>
    );

}


export default aliyataAsaThabimaStart;