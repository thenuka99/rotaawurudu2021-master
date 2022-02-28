import React from "react";
import {Link} from "react-router-dom";
import GameSubNav from "../GameSubNav";
import SNavBar from "../Navbar/SignOutNavbar";

function balloonPipirimaStart(){
    
    return(
        <>
        <SNavBar/>
        <GameSubNav
            name="Balloon Pipirima"
            back="/balloon-pipirima"
        />
        </>
    );

}


export default balloonPipirimaStart;