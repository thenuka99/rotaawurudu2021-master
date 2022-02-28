import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import GameSubNav from "../GameSubNav";
import SNavBar from "../Navbar/SignOutNavbar";
import Script from 'react-load-script'
import { Redirect } from "react-router";

function GamaHarahaStart() {
    useEffect(() => {
        window.location.href = '/games/gama-haraha/'
    }, [])

    return (<></>);

}


export default GamaHarahaStart;