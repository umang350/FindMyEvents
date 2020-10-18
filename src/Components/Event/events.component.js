import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar";
import "./sidebar.css";
import "./sidebar"
import Tablesort from "./sorts/tablesort"
import "./sorts/tablesort.number"
import "./sorts/sorts.css"
import { getUser } from '../../Utils/Common';
import $ from "jquery";

function getDates(dateValue) {
    var dateObject = new Date(dateValue);
    return (dateObject).getDate() + "/" + ((dateObject).getMonth() + 1) + "/" + (dateObject).getFullYear();
}

class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            selectedCategory: [],
            selectedEventType: [],
            selectedLocations: [],
            selectedStartDate: null,
            selectedEndDate: null,
            selectedPriceType: "all",
            categories: [],
            eventTypes: [],
            locations: [],
            toggler: "toggled",
            sidebar: "close-sidebar",
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

    getEvents() {
        axios.get(`http://localhost:3001/api/events`)
            .then(result => {
                const eventList = result.data;
                this.getUniqueTags(eventList);
                this.setState({ events: eventList })
            })
            .catch(error => console.log('There is some error.. : ', error));
    }

    filterEvents() {
        var selectorsT = this.state.selectedCategory;
        if (selectorsT.length === 0) {
            selectorsT = this.state.categories
        }
        var selectorsC = this.state.selectedEventType;
        if (selectorsC.length === 0) {
            selectorsC = this.state.eventTypes
        }
        var selectorsL = this.state.selectedLocations;
        if (selectorsL.length === 0) {
            selectorsL = this.state.locations
        }
        var selectorsStart = this.state.selectedStartDate;
        var selectorsEnd = this.state.selectedEndDate;
        if (!selectorsEnd || selectorsEnd === "") {
            selectorsEnd = "2222-01-01"
        }
        if (!selectorsStart || selectorsStart === "") {
            selectorsStart = "0001-01-01"
        }
        var priceTyper = this.state.selectedPriceType
        axios.post(`http://localhost:3001/api/events/filter`, {
            categories: selectorsT,
            types: selectorsC,
            startDate: selectorsStart,
            endDate: selectorsEnd,
            priceType: priceTyper,
            locations: selectorsL
        }
        )
            .then(result => {
                const eventList = result.data;
                this.setState({ events: eventList })
            })
            .catch(error => console.log('There is some error.. : ', error));
    }

    getUniqueTags(eventList) {
        eventList.forEach((listValue, i) => {
            let categorizer = this.state.categories;
            if (!categorizer.find(el => el === listValue.category)) {
                categorizer.push(listValue.category)
            }
            let typerizer = this.state.eventTypes;
            if (!typerizer.find(el => el === listValue.eventType)) {
                typerizer.push(listValue.eventType)
            }
            let locationizer = this.state.locations;
            if (!locationizer.find(el => el === listValue.location)) {
                locationizer.push(listValue.location)
            }
            this.setState({ categories: categorizer, eventTypes: typerizer, locations: locationizer })
        })
    }

    componentDidMount() {
        this.getEvents();
        this.checkLogin();
        new Tablesort(document.getElementById("table-id"));

        $(document).ready(function () {
            $("#myInput").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                // eslint-disable-next-line array-callback-return
                $("#myTable tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    }

    handleTypeChange(event) {
        var currSelection = event.target.value;
        var eventTyper = this.state.selectedEventType;
        if (!eventTyper.find(el => el === currSelection)) {
            eventTyper.push(currSelection)
        } else {
            while (eventTyper.indexOf(currSelection) !== -1) {
                eventTyper.splice(eventTyper.indexOf(currSelection), 1)
            }
        }
        this.setState({ selectedEventType: eventTyper }, () => {
            this.filterEvents();
        })
        console.log(this.state.selectedEventType);
    }

    handleCategoryChange(event) {
        var currSelection = event.target.value;
        var eventTyper = this.state.selectedCategory;
        if (!eventTyper.find(el => el === currSelection)) {
            eventTyper.push(currSelection)
        } else {
            while (eventTyper.indexOf(currSelection) !== -1) {
                eventTyper.splice(eventTyper.indexOf(currSelection), 1)
            }
        }
        this.setState({ selectedCategory: eventTyper }, () => {
            this.filterEvents();
        })
        console.log(this.state.selectedCategory);
    }
    handleLocationChange(event) {
        var currSelection = event.target.value;
        var locationizer = this.state.selectedLocations;
        if (!locationizer.find(el => el === currSelection)) {
            locationizer.push(currSelection)
        } else {
            while (locationizer.indexOf(currSelection) !== -1) {
                locationizer.splice(locationizer.indexOf(currSelection), 1)
            }
        }
        this.setState({ selectedLocations: locationizer }, () => {
            this.filterEvents();
        })
        console.log(this.state.selectedLocations);
    }

    handleStartDateChange(event) {
        this.setState({ selectedStartDate: event.target.value }, () => {
            this.filterEvents();
        });
    }

    handleEndDateChange(event) {
        this.setState({ selectedEndDate: event.target.value }, () => {
            this.filterEvents();
        });
    }

    handlePrice(event) {
        console.log(event.target.id)
        var priceTyper = event.target.id || this.state.selectedPriceType
        this.setState({ selectedPriceType: priceTyper }, () => {
            this.filterEvents();
        })
    }

    hideButton(event){
        var changer = this.state.toggler;
        var sidebar = this.state.sidebar;
        if(changer === "toggled"){
            changer = ""
            sidebar = "show-sidebar"
        }else{
            changer = "toggled"
            sidebar = "close-sidebar"
        }
        this.setState({toggler: changer, sidebar: sidebar})

    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className={"page-wrapper chiller-theme " + (this.state.toggler)   }>

                    <nav id="sidebar" className="sidebar-wrapper container">
                        <br />
                        <label id={this.state.sidebar} data-toggle="tooltip" data-placement="right" title="Event Filters" className="btn btn-sm btn-dark" to="" onClick={this.hideButton.bind(this)}>
                            <i className="fas fa-bars"></i>
                        </label>
                        <div className="sidebar-content container">
                            <h4 className="text-white">Filters</h4>
                            <h6 className="text-white">Select Event Types</h6>
                            {
                                this.state.eventTypes.map((listValue, index) => {
                                    return (
                                        <label className="btn btn-primary ml-3" key={index}>{listValue}
                                            <input onChange={this.handleTypeChange.bind(this)} value={listValue} type="checkbox" className="badgebox" />
                                            <span className="badge bg-light">&#10004;</span> </label>
                                    )
                                })
                            }
                            <h6 className="text-white">Select Event Categories</h6>
                            {
                                this.state.categories.map((listValue, index) => {
                                    return (
                                        <label className="btn btn-success ml-3" key={index}>{listValue}
                                            <input onChange={this.handleCategoryChange.bind(this)} value={listValue} type="checkbox" className="badgebox" />
                                            <span className="badge bg-light">&#10004;</span> </label>
                                    )
                                })
                            }
                            <h6 className="text-white">Select Event Start Date</h6>
                            <input className="form-control" type="date" name="startDate" onChange={this.handleStartDateChange.bind(this)} />
                            <h6 className="text-white">Select Event End Date</h6>
                            <input className="form-control" type="date" name="endDate" onChange={this.handleEndDateChange.bind(this)} />
                            <br />
                            <h6 className="text-white">Price</h6>
                            <div className="text-white">
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input onChange={this.handlePrice.bind(this)} type="radio" id="free" name="price" className="custom-control-input" />
                                    <label className="custom-control-label" htmlFor="free">Free</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input onChange={this.handlePrice.bind(this)} type="radio" id="paid" name="price" className="custom-control-input" />
                                    <label className="custom-control-label" htmlFor="paid">Paid</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input onChange={this.handlePrice.bind(this)} type="radio" id="all" name="price" className="custom-control-input" />
                                    <label className="custom-control-label" htmlFor="all">All</label>
                                </div>
                            </div>
                            <h6 className="text-white">Select Event Locations</h6>
                            {
                                this.state.locations.map((listValue, index) => {
                                    return (
                                        <label className="btn btn-info ml-3" key={index}>{listValue}
                                            <input onChange={this.handleLocationChange.bind(this)} value={listValue} type="checkbox" className="badgebox" />
                                            <span className="badge bg-light">&#10004;</span> </label>
                                    )
                                })
                            }
                        </div>
                        <div className="sidebar-footer">

                        </div>
                    </nav>
                    <main className="page-content">
                        <div className="container-fluid">

                            <div className="container table-responsive">
                                <br />

                                {
                                    this.state.isLogin === true
                                        ?
                                        <h4>Manage Events</h4> :
                                        <h4>Find My Events</h4>}

                                <br />
                                <div className="row">
                                    {
                                        this.state.isLogin === true
                                            ?
                                            <Link to='/events-add' className="btn btn-secondary">Add New Event</Link> :
                                            <div></div>}

                                    <form className="form-inline my-2 my-md-0 ml-lg-auto">
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Sort Events
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <p className="dropdown-item">Click on Column Title to Sort</p>
                                            </div>
                                        </div>
                                        <input className="form-control" type="text" id="myInput" placeholder="Search" aria-label="Search" />
                                    </form>
                                </div>

                                <br />
                                <br />
                                {
                                    this.state.events.length === 0 ? <div className="center container h4">No Events found (Try Changing Filters)</div> : <span></span>
                                }
                                <table className="table table-" id="table-id">

                                    <thead className="thead-light">
                                        <tr>
                                            <th>Name</th>
                                            <th>Type</th>
                                            <th>Category</th>
                                            <th data-sort-method='number'>Price (Rs.)</th>
                                            <th>Start Date</th>
                                            <th>Location</th>
                                            <th data-sort-method='none'>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="table-hover" id="myTable">

                                        {this.state.events.map((listValue, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{listValue.name}</td>
                                                    <td>{listValue.eventType}</td>
                                                    <td>{listValue.category}</td>
                                                    <td data-sort={listValue.cost}>{listValue.cost>0? listValue.cost : "Free" }</td>
                                                    <td data-sort={Date.parse(listValue.startDate)}>{getDates(listValue.startDate)}</td>
                                                    <td>{listValue.location}</td>
                                                    <td><Link to={'/events-detail/' + listValue._id}>Show Details</Link></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div></div>
        )
    }
}

export default Events;