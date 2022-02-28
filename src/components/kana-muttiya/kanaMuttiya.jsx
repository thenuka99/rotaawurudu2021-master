import React from "react";
import Game from "../Game/Game";
import KanaMuttiya from "../../assests/KanaMuttiya.png";
import SNavBar from "../Navbar/SignOutNavbar";


function kanaMuttiya() {

    return (
        <>
            <SNavBar />
            <Game
                imgsrc={KanaMuttiya}
                name="Kana Muttiya Bidima"
                practice="/games/kana-mutti/?practice=true"
                Start="/games/kana-mutti/"
            />
        </>
    );
}

export default kanaMuttiya;