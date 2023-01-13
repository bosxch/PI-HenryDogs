import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css";
import "../LandingPage/ButtonHome.css"

function LandingPage () {
    return (
        <div>
            <video src="././multimedia/videobackground_landingpage.mp4" autoPlay loop alt={'Video representativo al proyecto'}/>
            <div className={`${style.center_container}`}>
                <h1 className={`${style.title}`}>BEST FRIEND FINDER</h1>
                <h3>An application  to find or learn more about our best friends!</h3>
                <Link to = '/home'>
                <button className="button_home">Click me to start!</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;