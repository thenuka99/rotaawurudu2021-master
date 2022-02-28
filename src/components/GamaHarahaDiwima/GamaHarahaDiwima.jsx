import React from "react";
import Game from "../Game/Game";
import GamaHaraha from "../../assests/GamaHaraha.png";
import SNavBar from "../Navbar/SignOutNavbar";


function gamaHaraha() {

    return (
        <>
            <SNavBar />
            <Game
                imgsrc={GamaHaraha}
                name="Gama Haraha Diwima"
                practice="/games/gama-haraha/?practice=true"
                Start="/games/gama-haraha/"
            />
        </>
    );
}

export default gamaHaraha;