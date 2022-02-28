import React from "react";
import Game from "../Game/Game";
import LissanaGaha from "../../assests/LissanaGaha.png";
import SNavBar from "../Navbar/SignOutNavbar";


function LissanaGasa() {

    return (
        <>
            <SNavBar />
            <Game
                imgsrc={LissanaGaha}
                name="Lissana Gaha Nagima"
                practice="/games/lissana-gaha/?practice=true"
                Start="/games/lissana-gaha/"
            />
        </>
    );
}

export default LissanaGasa;