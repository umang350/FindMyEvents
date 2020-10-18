import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar";

const formValid = (formErrors) => {
    let valid = true;
    Object.values(formErrors).forEach(value => {
        value.length > 0 && (valid = false)
    });
    return valid;
}

export default class EventsAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: null,
            name: null,
            description: null,
            organizer: null,
            location: null,
            startDate: null,
            endDate: null,
            cost: null,
            category: null,
            eventType: null,
            formErrors: {
                code: "",
                name: "",
                description: "",
                organizer: "",
                location: "",
                startDate: "",
                endDate: "",
                cost: "",
                category: "",
                eventType: "",
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (formValid(this.state.formErrors)) {
            const event = {
                code: this.state.code,
                name: this.state.name,
                description: this.state.description,
                organizer: this.state.organizer,
                location: this.state.location,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                cost: this.state.cost,
                category: this.state.category,
                eventType: this.state.eventType
            };
            Axios.post('http://localhost:3001/api/events', event)
                .then(result => {
                    console.log("Success in Add")
                    this.props.history.push("/events")
                })
                .catch(error => console.log('There is some error is post save. : ', error))
        } else {
            console.error("Form Invalid");
            let formErrors = this.state.formErrors;
            formErrors.name = this.state.name == null || this.state.name === "" ? "Minimum 3 Chars are required" : formErrors.name;
            this.setState({ formErrors })
        }


    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value })
        console.log(this.state)
        let formErrors = this.state.formErrors;
        switch (name) {
            case "name":
                formErrors.name = value.length < 3 && value.length > 0 ? "Minimum 3 Chars are required" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => { console.log(this.state) })

    }

    render() {
        const { formErrors } = this.state;
        return (
            <div>
                <Navbar></Navbar>
                <div className="container">
                    <h3>Add Event</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Event Name</label>
                            <input type="text"
                                className={`form-control ${formErrors.name.length > 0 ? 'is-invalid' : null}`}
                                name="name"
                                onChange={this.handleChange}
                            />
                            {formErrors.name.length > 0 && (<span>{formErrors.name}</span>)}
                        </div>
                        <div className="form-group">
                            <label>Event Code</label>
                            <input type="text"
                                className={`form-control ${formErrors.code.length > 0 ? 'is-invalid' : null}`}
                                name="code"
                                onChange={this.handleChange} />
                            {formErrors.code.length > 0 && (<span>{formErrors.code}</span>)}
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text"
                                className={`form-control ${formErrors.description.length > 0 ? 'is-invalid' : null}`}
                                name="description"
                                onChange={this.handleChange} />
                            {formErrors.description.length > 0 && (<span>{formErrors.description}</span>)}
                        </div>
                        <div className="form-group">
                            <label>Organizer</label>
                            <input type="text"
                                className={`form-control ${formErrors.organizer.length > 0 ? 'is-invalid' : null}`}
                                name="organizer"
                                onChange={this.handleChange} />
                            {formErrors.organizer.length > 0 && (<span>{formErrors.organizer}</span>)}
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input type="text"
                                className={`form-control ${formErrors.location.length > 0 ? 'is-invalid' : null}`}
                                name="location"
                                onChange={this.handleChange} />
                            {formErrors.location.length > 0 && (<span>{formErrors.location}</span>)}
                        </div>
                        <div className="form-group">
                            <label>Start Date</label>
                            <input type="date"
                                className={`form-control ${formErrors.startDate.length > 0 ? 'is-invalid' : null}`}
                                name="startDate"
                                onChange={this.handleChange} />
                            {formErrors.startDate.length > 0 && (<span>{formErrors.startDate}</span>)}
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input type="date"
                                className={`form-control ${formErrors.endDate.length > 0 ? 'is-invalid' : null}`}
                                name="endDate"
                                onChange={this.handleChange} />
                            {formErrors.endDate.length > 0 && (<span>{formErrors.endDate}</span>)}
                        </div>
                        <div className="form-group">
                            <label>Ticket Price</label>
                            <input type="number"
                                className={`form-control ${formErrors.cost.length > 0 ? 'is-invalid' : null}`}
                                name="cost"
                                onChange={this.handleChange} />
                            {formErrors.cost.length > 0 && (<span>{formErrors.cost}</span>)}
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <input type="text"
                                className={`form-control ${formErrors.category.length > 0 ? 'is-invalid' : null}`}
                                name="category"
                                onChange={this.handleChange} />
                            {formErrors.category.length > 0 && (<span>{formErrors.category}</span>)}
                        </div>
                        <div className="form-group">
                            <label>Event Type</label>
                            <input type="text"
                                className={`form-control ${formErrors.eventType.length > 0 ? 'is-invalid' : null}`}
                                name="eventType"
                                onChange={this.handleChange} />
                            {formErrors.eventType.length > 0 && (<span>{formErrors.eventType}</span>)}
                        </div>
                        <button className="btn btn-secondary">Add</button>&nbsp;&nbsp;
                <Link className="btn btn-info" to='/events'>Back to List</Link>
                    </form>
                </div>
            </div>
        )
    }
}