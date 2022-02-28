import React from "react";
import Game from "../Game/Game";
import Balloon from "../../assests/Balloon.png";
import SNavBar from "../Navbar/SignOutNavbar";


function balloonPipirima() {

    return (
        <>
            <SNavBar />
            <Game
                imgsrc={Balloon}
                name="Balloon Pipirima"
                practice="games/balloon/?practice=true"
                Start="games/balloon/"
            />
        </>
    );
}

export default balloonPipirima;