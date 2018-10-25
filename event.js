const functions = require('./functions.js');
const moment = require('moment');

// Modification des Tableaux
// Suppression du recurring inavailable
// Ajout d'un fonction pour le remplissage des dates (forOnDate)

class Event {
    constructor() {
        this.openDatesRecurring = new Map;
        this.openDates = new Map;
        this.closeDates = new Map;
        this.allDatesAvailable = new Map;
        this.allHoursAvailable = [];
    };

    addEventList(opening, recurring, startDate, endDate) {

        startDate = moment(startDate, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm");
        endDate = moment(endDate, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm")
        this.callsAddEnventList++;
        if (opening === true) {
            if (recurring === true) {
                this.openDatesRecurring.set(startDate, endDate);
            } else {
                this.openDates.set(startDate, endDate);
            }
        } else {
            this.closeDates.set(startDate, endDate);
        }
    }

    availabilities(fromDate, toDate) {
        fromDate = moment(fromDate, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm");
        toDate = moment(toDate, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm")
        this.allDatesAvailable = this.recoverAvalaibleDates(this.openDatesRecurring, this.openDates, this.allDatesAvailable, fromDate, toDate);
        this.allHoursAvailable = this.createAllHoursAvailable(this.allDatesAvailable, this.allHoursAvailable);
        this.allHoursAvailable = this.removeCloseDates(this.closeDates , this.allHoursAvailable);
        this.createSentence(this.allHoursAvailable);
    }

    recoverAvalaibleDates(openDatesRecurring, openDates, allDatesAvailable, fromDate, toDate) {
        openDatesRecurring.forEach(function(endDate,startDate) {
            while (moment(startDate).isSameOrBefore(toDate)) {
                allDatesAvailable = functions.completeAllDateAvailable(allDatesAvailable, startDate, endDate, fromDate, toDate);
                startDate = moment(startDate).add(7, "days");
                endDate = moment(endDate).add(7, "days");
            }
        })
        openDates.forEach(function(endDate,startDate) {
            allDatesAvailable = functions.completeAllDateAvailable(allDatesAvailable, startDate, endDate, fromDate, toDate);
        })
        return allDatesAvailable;
    }

    createAllHoursAvailable(allDatesAvailable, allHoursAvailable) {
        allDatesAvailable.forEach(function(endDateAvailable, startDateAvailable) {
            allHoursAvailable = functions.completeAllHoursAvailable(startDateAvailable, endDateAvailable, allHoursAvailable);
        });
        return allHoursAvailable;
    }

    removeCloseDates(closeDates, allHoursAvailable) {
        closeDates.forEach(function(endDateDelete, startDateDelete) {
            allHoursAvailable = functions.removeAllHoursInavailable(startDateDelete, endDateDelete, allHoursAvailable);
        });
        return allHoursAvailable;
    }

    createSentence(allHoursAvailable) {
        let sentence = "\nWe are available :";
        let dateSave = "";
        allHoursAvailable.forEach(hoursAvailable => {
            if (dateSave === "" || !moment(dateSave).isSame(hoursAvailable, 'days')) {
                sentence += "\n The " + moment(hoursAvailable).format("DD/MM/YYYY") + " at " + moment(hoursAvailable).format("HH:mm");
                dateSave = moment(hoursAvailable);
            } else if (!moment(allHoursAvailable[allHoursAvailable.indexOf(hoursAvailable) + 1]).isSame(hoursAvailable, "days")) {
                sentence += " and " + moment(hoursAvailable).format("HH:mm");
            } else {
                sentence += ", " + moment(hoursAvailable).format("HH:mm");
            }
        });
        sentence += "\nWe are not available any other time !\n";
        console.log(sentence);
    }
};

exports.Event = new Event;