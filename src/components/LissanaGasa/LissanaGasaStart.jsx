import React from "react";
import { Link } from "react-router-dom";
import GameSubNav from "../GameSubNav";
import "./lissanagasa.css";
import { Helmet } from "react-helmet";
import SNavBar from "../Navbar/SignOutNavbar";

function LissanaGasaStart() {

    const script = document.createElement("script"); script.async = true; script.src = "./LGScripts.js";

    return (
        <>
            <SNavBar />
            <GameSubNav
                name="Lissana Gaha Nagima"
                back="/lissana-gasa"
            />
            <Helmet>
                <meta charSet="utf-8" />
                <script src="LGScript.js" type="text/javascript" />
            </Helmet>
            <body className="LGbody" onload="startGame()">
                <br />
                <br />
                <button className="Climb" onclick="accelerate()">Click to climb</button>
                <br />
                <span id="marks"></span>
            </body>

        </>
    );

}


export default LissanaGasaStart;