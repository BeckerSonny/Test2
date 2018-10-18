var openDatesRecurring = new Map;
var openDatesUniques = new Map;
var closeDatesRecurring = new Map;
var closeDatesUniques = new Map;
var allDatesAvailable = new Map;
var callsAddEnventList = 0;

var moment = require('moment');

exports.Event = class Event {
    constructor() {

    };

    addEventList(opening, recurring, startDate, endDate) {
        startDate = moment(startDate, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm");
        endDate = moment(endDate, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm")
        callsAddEnventList++;
        if (opening === true) {
            if (recurring === true) {
                openDatesRecurring.set("Start" + callsAddEnventList, startDate);
                openDatesRecurring.set("End" + callsAddEnventList, endDate);
            } else {
                openDatesUniques.set("Start" + callsAddEnventList, startDate);
                openDatesUniques.set("End" + callsAddEnventList, endDate);
            }
        } else {
            if (recurring === true) {
                closeDatesRecurring.set("Start" + callsAddEnventList, startDate);
                closeDatesRecurring.set("End" + callsAddEnventList, endDate);

            } else {
                closeDatesUniques.set("Start" + callsAddEnventList, startDate);
                closeDatesUniques.set("End" + callsAddEnventList, endDate);
            }
        }
        console.log("OpenDates ==> ", openDatesRecurring);
    }

    availabilities(fromDate, toDate) {
        allDatesAvailable = this.recoverAvalaibleDatesRecurring(openDatesRecurring, allDatesAvailable, fromDate, toDate);
        allDatesAvailable = this.recoverAvalaibleDatesUniques(openDatesUniques, allDatesAvailable, fromDate, toDate);
        allDatesAvailable = this.removeInavailableDatesRecuring(closeDatesRecurring, allDatesAvailable, toDate);
        allDatesAvailable = this.removeInavailableDatesUniques(closeDatesUniques, allDatesAvailable);
        this.createSentence(allDatesAvailable);
    }

    recoverAvalaibleDatesRecurring(openDatesRecurring, allDatesAvailable, fromDate, toDate) {
        openDatesRecurring.forEach(function(startDate, TypeDate) {
            if (TypeDate.substr(0, 3) == "Sta") {
                console.log("Start Date => ", startDate);
                let numberDate = TypeDate.substr(5,6);
                let thisEndDate = openDatesRecurring.get("End" + numberDate);
                
                if (!moment(startDate).isSame(thisEndDate, 'day')) {
                    thisEndDate = moment(startDate).hours(17).minutes(0);
                    console.log(thisEndDate);
                }   
            }
        })
    }

    recoverAvalaibleDatesUniques(array, arrayValidates, fromDate, toDate) {

    }

    removeInavailableDatesRecuring(array, arrayValidates, toDate) {

    }

    removeInavailableDatesUniques(array, arrayValidates) {

    }

    addHoursToDate(startDate, thisEndDate) {
        while(moment(startDate,  "YY/MM/YYYY").getHours) {
            
        }
    }

    createSentence(array) {
        let sentence = "We are available :";
        for(let key in array) {
            let keyTmp = parseInt(key);
            let MinutesEarly = array[key].getMinutes();;
            if (MinutesEarly == 0) {
                MinutesEarly += "0";
            }
            if (array[keyTmp + 1] != undefined) {
                var MinutesEnd = array[keyTmp + 1].getMinutes();
                if (MinutesEnd == 0) {
                    MinutesEnd += "0";
                }
            }
            if (Number.isInteger(key / 2)) {
                if (array[keyTmp - 1] != undefined &&
                array[keyTmp - 1].getDate() == array[key].getDate() &&
                array[keyTmp - 1].getMonth() == array[key].getMonth()) {
                    sentence += " and" 
                } else {
                    sentence += "\nThe " + array[key].getDate() + "/" + array[key].getMonth() + "/" + array[key].getFullYear();
                }
                sentence  += " from " + array[key].getHours() + ":" + MinutesEarly + " to " + array[keyTmp + 1].getHours() + ":" + MinutesEnd;
                if (array[keyTmp + 2] == undefined) {
                    sentence += ".";
                }
            }
        }
        console.log(sentence);
    }
};

exports.Event;