import React, { Component } from "react";
import eventImg from "./res/eventImg.jpg"
import Navbar from "./navbar";

var styler = { minWidth: '100%' }

export default class Home extends Component {

    render(props) {
        return (
            <div>
                <Navbar></Navbar>
                <img src={eventImg} style={styler} alt="Banner of events" className="img-fluid"></img>
                <div>
                </div>
            </div>
        )
    }
}