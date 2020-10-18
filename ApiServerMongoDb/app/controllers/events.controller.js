const Event = require('../models/events.model.js');

exports.findAll = (req, res) => {
    Event.find()
        .then(events => {
            res.send(events);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving events."
            });
        });
};

// Find a Events by Name
exports.findByName = (req, res) => {
    Event.findOne({ name: req.params.eventName })
        .exec(function (err, event) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Events not found with given name " + req.params.eventName
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Events with given Event name: " + req.params.eventName
                });
            }

            res.send(event);
        });
};

// Find all events by Category
exports.findByCategory = (req, res) => {
    Event.find({ category: req.params.category })
        .exec(function (err, events) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Event not found with given Category " + req.params.eventId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Event with given Category " + req.params.eventId
                });
            }

            res.send(events);
        });
};


exports.findByCategories = (req, res) => {
    Event.find({ category: req.body.categories })
        .exec(function (err, events) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Event not found with given Category " + req.params.eventId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Event with given Category " + req.params.eventId
                });
            }

            res.send(events);
        });
};


exports.findByTypes = (req, res) => {
    Event.find({ eventType: req.body.types })
        .exec(function (err, events) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Event not found with given Category " + req.params.eventId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Event with given Category " + req.params.eventId
                });
            }

            res.send(events);
        });
};

exports.findByDates = (req, res) => {
    var startDate = req.body.startDate + "T00:00:00.000Z";
    var endDate = req.body.endDate + "T00:00:00.000Z";
    Event.find({ "startDate": { $gte: startDate }, "endDate": { $lte: endDate } })
        .exec(function (err, events) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Event not found with given Category " + req.params.eventId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Event with given Category " + err.message
                });
            }

            res.send(events);
        });
};


exports.findByFilters = (req, res) => {
    var priceType = req.body.priceType;
    var startDate = req.body.startDate + "T00:00:00.000Z";
    var endDate = req.body.endDate + "T00:00:00.000Z";
    var statementP = { "cost": { $gte: 0 } };
    var statementD = { "startDate": { $gte: startDate }, "endDate": { $lte: endDate } };
    var statementT = { eventType: req.body.types }
    var statementC = { category: req.body.categories }
    var statementL = { location: req.body.locations }
    switch (priceType) {
        case "all":
            break;
        case "free":
            statementP = { cost: 0 };
            break;
        case "paid":
            statementP = { "cost": { $gt: 0 } };
            break;
        default:
            break;
    }
    var statement = { ...statementD, ...statementP, ...statementT, ...statementC, ...statementL }
    console.log(statement)
    Event.find(statement)
        .exec(function (err, events) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Event not found with given Category " + req.params.eventId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Event with given Category " + err.message
                });
            }

            res.send(events);
        });
};

exports.findByPrice = (req, res) => {
    var priceType = req.body.priceType;
    var statement = { "cost": { $gte: 0 } };
    switch (priceType) {
        case "all":
            break;
        case "free":
            statement = { cost: 0 };
            break;
        case "paid":
            statement = { "cost": { $gt: 0 } };
            break;
        default:
            break;
    }
    Event.find(statement)
        .exec(function (err, events) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Event not found with given Category " + req.params.eventId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Event with given Category " + err.message
                });
            }

            res.send(events);
        });
};

// Create and Save a new Event
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Event Name can not be empty"
        });
    }

    // Create a Note
    const event = new Event({
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        organizer: req.body.organizer,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        cost: req.body.cost,
        category: req.body.category,
        eventType: req.body.eventType
    });

    // Save Note in the database
    event.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Event."
            });
        });
};

// Find a single Event with a eventId
exports.findOneById = (req, res) => {
    Event.findById(req.params.eventId)
        .then(event => {
            if (!event) {
                return res.status(404).send({
                    message: "Event not found with id " + req.params.eventId
                });
            }
            res.send(event);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Event not found with id " + req.params.eventId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Event with id " + req.params.eventId
            });
        });
};


// Update a event identified by the eventId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Event name can not be empty"
        });
    }

    // Find Event and update it with the request body
    Event.findByIdAndUpdate(req.params.eventId, {
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        organizer: req.body.organizer,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        cost: req.body.cost,
        category: req.body.category,
        eventType: req.body.eventType
    }, { new: true })
        .then(event => {
            if (!event) {
                return res.status(404).send({
                    message: "event not found with id " + req.params.eventId
                });
            }
            res.send(event);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "event not found with id " + req.params.eventId
                });
            }
            return res.status(500).send({
                message: "Error updating event with id " + req.params.eventId
            });
        });
};


// Delete a Event with the specified eventId in the request
exports.delete = (req, res) => {
    Event.findByIdAndRemove(req.params.eventId)
        .then(event => {
            if (!event) {
                return res.status(404).send({
                    message: "Event not found with id " + req.params.eventId
                });
            }
            res.send({ message: "Event deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Event not found with id " + req.params.eventId
                });
            }
            return res.status(500).send({
                message: "Could not delete Event with id " + req.params.eventId
            });
        });
};

exports.initFakeData = (req, res) => {
    const event1 = new Event({
        code: "A100",
        name: "Gap of Paid",
        description: "Some random event description",
        organizer: "ABC Company",
        location: "Delhi",
        startDate: "2020-10-18",
        endDate: "2020-10-28",
        cost: 0,
        category: "Thriller",
        eventType: "Movies"
    });
    event1.save(function (err) {
        if (err) return console.error(err.stack)
        console.log("Event is added")
    });

    const event2 = new Event({
        code: "A101",
        name: "Harmony in Spain",
        description: "Spanish random event description",
        organizer: "La Liga",
        location: "Gurgaon",
        startDate: "2020-10-07",
        endDate: "2020-10-10",
        cost: 50,
        category: "Comedy",
        eventType: "Theater"
    });
    event2.save(function (err) {
        if (err) return console.error(err.stack)
        console.log("Event is added")
    });

    const event3 = new Event({
        code: "A102",
        name: "Checkout on Paint",
        description: "Artictic random event description",
        organizer: "Govt Of India",
        location: "Delhi",
        startDate: "2020-08-17",
        endDate: "2020-10-01",
        cost: 0,
        category: "Adventure",
        eventType: "Theater"
    });
    event3.save(function (err) {
        if (err) return console.error(err.stack)
        console.log("Event is added")
    });

    const event4 = new Event({
        code: "A103",
        name: "Bottle of Life",
        description: "Rrandom event description",
        organizer: "Govt Of USA",
        location: "Noida",
        startDate: "2020-05-11",
        endDate: "2020-06-12",
        cost: 1000,
        category: "Fiction",
        eventType: "Movies"
    });
    event4.save(function (err) {
        if (err) return console.error(err.stack)
        console.log("Event is added")
    });

    const event5 = new Event({
        code: "A104",
        name: "Notebook Case",
        description: "Proud event description",
        organizer: "BigBills Ent",
        location: "Delhi",
        startDate: "2020-01-01",
        endDate: "2020-02-02",
        cost: 1000,
        category: "Thriller",
        eventType: "Theater"
    });
    event5.save(function (err) {
        if (err) return console.error(err.stack)
        console.log("Event is added")
    });
    
  res.send("Done Initial Data!");
};