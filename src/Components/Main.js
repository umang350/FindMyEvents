import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import EventsAdd from "./Event/events-add.component";
import EventsDetail from "./Event/events-detail.component";
import EventsEdit from "./Event/events-edit.component";
import Events from "./Event/events.component";
import Home from "./Home";
import Login from "../Login"
import PrivateRoute from '../Utils/PrivateRoute';
import PublicRoute from '../Utils/PublicRoute';
import Logout from "./logout";

class Main extends Component {
    

    render() {

        return (
            <div>
                <Router>
                    <div>
                        <div>
                            <Switch>
                                <PublicRoute exact path='/' component={Home} />
                                <PublicRoute path="/login" component={Login} />
                                <PrivateRoute path='/logout' component={Logout} />
                                <PublicRoute path='/events' component={Events} />
                                <PrivateRoute path='/events-add' component={EventsAdd} />
                                <PublicRoute path='/events-detail/:id' component={EventsDetail} />
                                <PrivateRoute path='/events-edit/:id' component={EventsEdit} />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}


export default Main;