import React, { Component } from "react";
import { removeUserSession } from '../Utils/Common';
import { Redirect, Route } from "react-router-dom";
import Navbar from "./navbar";

export default class Logout extends Component {

    render(props) {

        // handle click event of logout button
        const handleLogout = () => {
            removeUserSession();
        }
        handleLogout();
        return (
            <div>
                <Navbar></Navbar>
                <Route
                    render={(props) => <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
                />
            </div>

        )
    }
}