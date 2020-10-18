import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar";
import { getUser } from '../../Utils/Common';

function getDates(dateValue) {
    var dateObject = new Date(dateValue);
    return (dateObject).getDate() + "/" + ((dateObject).getMonth() + 1) + "/" + (dateObject).getFullYear();
}

export default class EventsDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: {},
            isLogin: null
        }
    }


    checkLogin() {
        const user = getUser();
        if (user != null) {
            this.setState({ isLogin: true });
            console.log(user, this.state.isLogin)
        } else {
            this.setState({ isLogin: false });
            console.log(user, this.state.isLogin)
        }
    }


    deleteCompany(id) {
        console.log(id);
        Axios.delete('http://localhost:3001/api/events/' + id)
            .then(result => {
                console.log('Events deleted with id: ' + id);
                this.props.history.push('/events')
            })
            .catch(error => console.log('There is some error in delete .. : ', error))
    }

    componentDidMount() {
        this.checkLogin();
        Axios.get(`http://localhost:3001/api/event/${this.props.match.params.id}`)
            .then(result => {
                this.setState({ event: result.data });
                console.log(this.state.event)
            })
            .catch(error => console.log('There is some error.. : ', error));
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <br />
                            <h3 className="panel-title">
                                Details of Event : {this.state.event.code}
                            </h3>
                            <br />
                        </div>
                        <div className="panel-body">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Event Name</th>
                                        <td>{this.state.event.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Code</th>
                                        <td>{this.state.event.code}</td>
                                    </tr>
                                    <tr>
                                        <th>Description</th>
                                        <td>{this.state.event.description}</td>
                                    </tr>
                                    <tr>
                                        <th>Organizer</th>
                                        <td>{this.state.event.organizer}</td>
                                    </tr>
                                    <tr>
                                        <th>Location</th>
                                        <td>{this.state.event.location}</td>
                                    </tr>
                                    <tr>
                                        <th>Start Date</th>
                                        <td>{getDates(this.state.event.startDate)}</td>
                                    </tr>
                                    <tr>
                                        <th>End Date</th>
                                        <td>{getDates(this.state.event.endDate)}</td>
                                    </tr>
                                    <tr>
                                        <th>Cost</th>
                                        <td>{this.state.event.cost}</td>
                                    </tr>
                                    <tr>
                                        <th>Category</th>
                                        <td>{this.state.event.category}</td>
                                    </tr>
                                    <tr>
                                        <th>Event Type</th>
                                        <td>{this.state.event.eventType}</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Link className="btn btn-info mr-3" to='/events'>Back to List</Link>

                                            {
                                                this.state.isLogin === true
                                                    ?
                                                    <span>
                                                        <Link className="btn btn-secondary mr-3" to={'/events-edit/' + this.state.event._id}>Edit</Link>
                                                        <button onClick={this.deleteCompany.bind(this, this.state.event._id)} className="btn btn-danger mr-3">Delete</button>
                                                    </span>
                                                    : <div></div>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}