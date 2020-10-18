import React, { Component } from "react";
import { getUser } from '../Utils/Common';
import { Link } from "react-router-dom";

var navbarBgColor = { backgroundColor: '#2874f0' }

export default class Navbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLogin: null
        }
    }

    checkLogin(){
        const user = getUser();
        if(user!=null){
            this.setState({isLogin : true});
            console.log(user, this.state.isLogin)
        }else{
            this.setState({isLogin : false});
            console.log(user, this.state.isLogin)
        }
    }

    // componentWillMount(){
    //     this.checkLogin();
    // }

    componentDidMount(){
        this.checkLogin();
    }


    render(props) {

       
        return (
            <div>
                <nav className="navbar navbar-expand-xl navbar-dark" style={navbarBgColor}>
                    <div className="container-xl">
                        <Link to={'/'} className="navbar-brand">Find My Events</Link>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item ">
                                    <Link to={'/events'} className="nav-link">Events</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                {
                                    this.state.isLogin===true 
                                        ? 
                                    <li className="nav-item" onClick={this.checkLogin.bind(this)}><Link to={'/logout'} className="nav-link">Logout</Link></li>
                                        : 
                                    <li className="nav-item" onClick={this.checkLogin.bind(this)}><Link to={'/login'} className="nav-link">Login</Link></li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}