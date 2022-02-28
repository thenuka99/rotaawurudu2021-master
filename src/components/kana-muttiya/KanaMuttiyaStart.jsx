import React from "react";
import {Link} from "react-router-dom";
import GameSubNav from "../GameSubNav";
import SNavBar from "../Navbar/SignOutNavbar";

function KanaMuttiyaStart(){
    
    return(
        <>
        <SNavBar/>
        <GameSubNav
            name="Kana Muttiya Bidima"
            back="/kana-muttiya"
        />
        </>
    );

}


export default KanaMuttiyaStart;