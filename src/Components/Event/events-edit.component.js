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

function dater(date1) {
    date1 = date1 ? date1 : ""
    return date1.substring(0, 10);
}

export default class EventsEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: {},
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
            }
            Axios.put(`http://localhost:3001/api/events/${this.props.match.params.id}`, event)
                .then(result => {
                    console.log("Success in Edit")
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

    componentDidMount() {
        Axios.get(`http://localhost:3001/api/event/${this.props.match.params.id}`)
            .then(result => {
                this.setState({
                    event: result.data,
                    code: result.data.code,
                    name: result.data.name,
                    description: result.data.description,
                    organizer: result.data.organizer,
                    location: result.data.location,
                    startDate: result.data.startDate,
                    endDate: result.data.endDate,
                    cost: result.data.cost,
                    category: result.data.category,
                    eventType: result.data.eventType
                })
                console.log(this.state.event)
            })
            .catch(error => console.log('There is some error.. : ', error));
    }

    render() {
        const { formErrors } = this.state;
        return (

            <div>
                <Navbar></Navbar>
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <br />
                            <h3 className="panel-title">
                                Edit Event: {this.state.event.name || ''}
                            </h3>
                            <br />
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Event Name</label>
                                    <input type="text"
                                        className={`form-control ${formErrors.name.length > 0 ? 'is-invalid' : null}`}
                                        name="name"
                                        defaultValue={this.state.event.name || ''}
                                        onChange={this.handleChange} />
                                    {formErrors.name.length > 0 && (<span>{formErrors.name}</span>)}
                                </div>
                                <div className="form-group">
                                    <label>Event Code</label>
                                    <input type="text"
                                        className={`form-control ${formErrors.code.length > 0 ? 'is-invalid' : null}`}
                                        name="code"
                                        defaultValue={this.state.event.code || ''}
                                        onChange={this.handleChange} />
                                    {formErrors.code.length > 0 && (<span>{formErrors.code}</span>)}
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text"
                                        className={`form-control ${formErrors.description.length > 0 ? 'is-invalid' : null}`}
                                        name="description"
                                        defaultValue={this.state.event.description || ''}
                                        onChange={this.handleChange} />
                                    {formErrors.description.length > 0 && (<span>{formErrors.description}</span>)}
                                </div>
                                <div className="form-group">
                                    <label>Organizer</label>
                                    <input type="text"
                                        className={`form-control ${formErrors.organizer.length > 0 ? 'is-invalid' : null}`}
                                        name="organizer"
                                        defaultValue={this.state.event.organizer || ''}
                                        onChange={this.handleChange} />
                                    {formErrors.organizer.length > 0 && (<span>{formErrors.organizer}</span>)}
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input type="text"
                                        className={`form-control ${formErrors.location.length > 0 ? 'is-invalid' : null}`}
                                        name="location"
                                        defaultValue={this.state.event.location || ''}
                                        onChange={this.handleChange} />
                                    {formErrors.location.length > 0 && (<span>{formErrors.location}</span>)}
                                </div>
                                <div className="form-group">
                                    <label>Start Date</label>
                                    <input type="date"
                                        className={`form-control ${formErrors.startDate.length > 0 ? 'is-invalid' : null}`}
                                        name="startDate"
                                        defaultValue={dater(this.state.event.startDate) || ''}
                                        onChange={this.handleChange} />
                                    {formErrors.startDate.length > 0 && (<span>{formErrors.startDate}</span>)}
                                </div>
                                <div className="form-group">
                                    <label>End Date</label>
                                    <input type="date"
                                        className={`form-control ${formErrors.endDate.length > 0 ? 'is-invalid' : null}`}
                                        name="endDate"
                                        defaultValue={dater(this.state.event.endDate) || ""}
                                        onChange={this.handleChange} />
                                    {formErrors.endDate.length > 0 && (<span>{formErrors.endDate}</span>)}
                                </div>
                                <div className="form-group">
                                    <label>Ticket Price</label>
                                    <input type="number"
                                        className={`form-control ${formErrors.cost.length > 0 ? 'is-invalid' : null}`}
                                        name="cost"
                                        defaultValue={this.state.event.cost || ''}
                                        onChange={this.handleChange} />
                                    {formErrors.cost.length > 0 && (<span>{formErrors.cost}</span>)}
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <input type="text"
                                        className={`form-control ${formErrors.category.length > 0 ? 'is-invalid' : null}`}
                                        name="category"
                                        defaultValue={this.state.event.category || ''}
                                        onChange={this.handleChange} />
                                    {formErrors.category.length > 0 && (<span>{formErrors.category}</span>)}
                                </div>
                                <div className="form-group">
                                    <label>Event Type</label>
                                    <input type="text"
                                        className={`form-control ${formErrors.eventType.length > 0 ? 'is-invalid' : null}`}
                                        name="eventType"
                                        defaultValue={this.state.event.eventType || ''}
                                        onChange={this.handleChange} />
                                    {formErrors.eventType.length > 0 && (<span>{formErrors.eventType}</span>)}
                                </div>
                                <button className="btn btn-secondary">Save Edits</button>&nbsp;&nbsp;
                        <Link className="btn btn-info" to='/events'>Back to List</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}