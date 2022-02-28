import React from "react";
import Game from "../Game/Game";
import AliyataAsa from "../../assests/AliyataAsaThabima.png";
import SNavBar from "../Navbar/SignOutNavbar";


function aliyataAsaThabima() {

    return (
        <>
            <SNavBar />
            <Game
                imgsrc={AliyataAsa}
                name="Aliyata Asa Thabima"
                practice="/games/aliyata-esa-thabeema/?practice=true"
                Start="/games/aliyata-esa-thabeema/"
            />
        </>
    );
}

export default aliyataAsaThabima;