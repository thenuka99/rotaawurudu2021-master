import React from "react";
import "./Game.scss";
import GameSubNav from "../GameSubNav";

const Game = props => {
    return (
        <div>
            {/*This example requires Tailwind CSS v2.0+ */}
            <div>
                <GameSubNav name={props.name} back="/home" />
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {/* Replace with your content */}
                        <div className="game__card">
                            <div className="game__image">
                                <img src={props.imgsrc} />
                                <div className="game__gname__container">
                                </div>
                            </div>
                            <div className="place-content-center grid grid-cols-2 gap-1 place-content-around h-0 mb-10">
                                <a href={props.practice}>
                                    <div className="rounded-md shadow mx-10">
                                        <span className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-900 md:py-4 md:text-lg md:px-10 ">
                                            Practice
                                        </span>
                                    </div>
                                </a>

                                <a href={props.Start}>
                                    <div className="rounded-md shadow mx-10">
                                        <span className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-900 md:py-4 md:text-lg md:px-10 ">
                                            Start
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* /End replace */}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Game;
