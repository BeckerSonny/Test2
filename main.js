var eventPage = require ("./event.js");
var Event = new eventPage.Event();

var startDate = new Date(2018,6,1,10,30);
var endDate = new Date(2018,6,1,14,00)

console.log(startDate);
Event.addEventList(true, true, startDate, endDate);

var startDate = new Date(2018,6,8,11,30)
var endDate = new Date(2018,6,8,11,30);

Event.addEventList(false, false, startDate, endDate);

var fromDate = new Date(2018,6,4,10,00);
var toDate = new Date(2018,6,10,10,00);

Event.availabilities (fromDate, toDate);