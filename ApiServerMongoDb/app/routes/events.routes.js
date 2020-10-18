module.exports = function(app) {
    var events = require('../controllers/events.controller.js');

    app.get('/api/InitiateFakeData', events.initFakeData)
	
	app.get('/api/events', events.findAll);
			
	// Find a single Event by Name
    app.get('/api/events/:eventName', events.findByName);
	
	// Find all Events of a Category
    app.get('/api/events/category/:category', events.findByCategory);

    // Create a new Event
    app.post('/api/events', events.create);

    // Retrieve a single Event with eventId
    app.get('/api/event/:eventId', events.findOneById);

    // // Update a Event with eventId
    app.put('/api/events/:eventId', events.update);

    // // Delete a Event with eventId
    app.delete('/api/events/:eventId', events.delete);

    app.post('/api/events/filteredByCategory', events.findByCategories)

    app.post('/api/events/filteredByTypes', events.findByTypes)

    app.post('/api/events/filteredByStartDates', events.findByDates)

    app.post('/api/events/filteredByPrice', events.findByPrice)
    
    app.post('/api/events/filter', events.findByFilters)
}