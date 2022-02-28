import React from "react";
import {Link} from "react-router-dom";
import GameSubNav from "../GameSubNav";
import SNavBar from "../Navbar/SignOutNavbar";

function kottaPoraStart(){
    
    return(
        <>
        <SNavBar/>
        <GameSubNav
            name="Kotta Pora"
            back="/kotta-pora"
        />
        </>
    );

}


export default kottaPoraStart;