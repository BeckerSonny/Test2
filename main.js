var eventPage = require("./event.js");
var Event = eventPage.Event;

var startDate = new Date(2018,6,1,10,30);
var endDate = new Date(2018,6,1,14,00);

Event.addEventList(true, true, startDate, endDate);

startDate = new Date(2018,6,8,11,30);
endDate = new Date(2018,6,8,11,30);

Event.addEventList(false, true, startDate, endDate);

var fromDate = new Date(2018,6,4,10,00);
var toDate = new Date(2018,6,10,10,00);

Event.availabilities (fromDate, toDate);