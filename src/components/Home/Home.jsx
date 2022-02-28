import React from "react";
import "./Home.scss";

import KanaMuttiya from "../../assests/KanaMuttiya.png"
import BalloonPipirima from "../../assests/Balloon.png"
import GamaHarahaDiwima from "../../assests/GamaHaraha.png"
import KottaPora from "../../assests/KottaPora.png"
import AliyataAsaThabima from "../../assests/AliyataAsaThabima.png"
import LissanaGaha from "../../assests/LissanaGaha.png"

import { Link } from 'react-router-dom';
import SNavBar from "../Navbar/SignOutNavbar";


function Home() {
  return (
    <>
      <SNavBar />
      <div className="home">
        <div className="home__container">
          <Link to="/kana-muttiya">
            <div className="home__item">
              <div className="home__item__image">
                <img src={KanaMuttiya} alt="" />
              </div>
              <div className="home__item__title"><p>Kana Muttiya Bidima</p></div>
            </div>
          </Link>

          <Link to="/lissana-gasa">
            <div className="home__item">
              <div className="home__item__image">
                <img src={LissanaGaha} alt="" />
              </div>
              <div className="home__item__title"><p>Lissana Gasa</p></div>
            </div>
          </Link>

          <Link to="/gama-haraha-diwima">
            <div className="home__item">
              <div className="home__item__image">
                <img src={GamaHarahaDiwima} alt="" />
              </div>
              <div className="home__item__title"><p>Gama Haraha Diwima</p></div>
            </div>
          </Link>

          <Link to="/aliyata-asa-thabima">
            <div className="home__item">
              <div className="home__item__image">
                <img src={AliyataAsaThabima} alt="" />
              </div>
              <div className="home__item__title"><p>Aliyata Asa Thabima</p></div>
            </div>
          </Link>

          <Link to="/balloon-pipirima">
            <div className="home__item">
              <div className="home__item__image">
                <img src={BalloonPipirima} alt="" />
              </div>
              <div className="home__item__title"><p>Balloon Pipirima</p></div>
            </div>
          </Link>

          <Link to="/kotta-pora">
            <div className="home__item">
              <div className="home__item__image">
                <img src={KottaPora} alt="" />
              </div>
              <div className="home__item__title"><p>Kotta Pora </p></div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;