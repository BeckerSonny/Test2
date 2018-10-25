const functions = require('./functions.js');
const moment = require('moment');

class Event {
    constructor() {
        this.openDatesRecurring = new Map;
        this.openDates = new Map;
        this.closeDates = new Map;
        this.allDatesAvailable = new Map;
        this.allHoursAvailable = [];
        this.callsAddEnventList = 0;
    };

    addEventList(opening, recurring, startDate, endDate) {

        startDate = moment(startDate, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm");
        endDate = moment(endDate, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm")
        this.callsAddEnventList++;
        if (opening === true) {
            if (recurring === true) {
                this.openDatesRecurring .set("Start" + this.callsAddEnventList, startDate);
                this.openDatesRecurring .set("End" + this.callsAddEnventList, endDate);
            } else {
                this.openDates.set("Start" + this.callsAddEnventList, startDate);
                this.openDates.set("End" + this.callsAddEnventList, endDate);
            }
        } else {
            this.closeDates .set("Start" + this.callsAddEnventList, startDate);
            this.closeDates .set("End" + this.callsAddEnventList, endDate);
        }
    }

    availabilities(fromDate, toDate) {
        fromDate = moment(fromDate, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm");
        toDate = moment(toDate, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm")
        this.recoverAvalaibleDatesRecurring(this.openDatesRecurring , this.allDatesAvailable, fromDate, toDate);
        this.recoverAvalaibleDatesUniques(this.openDatesUniques, this.allDatesAvailable, fromDate, toDate);
        this.allHoursAvailable = this.createAllHoursAvailable(this.allDatesAvailable, this.allHoursAvailable);
        this.allHoursAvailable = this.removeCloseDates(this.closeDates , this.allHoursAvailable);
        this.createSentence(this.allHoursAvailable);
    }

    recoverAvalaibleDatesRecurring(openDatesRecurring, allDatesAvailable, fromDate, toDate) {
        openDatesRecurring .forEach(function(startDate, TypeDate) {
            let manyDays = false;
            if (TypeDate.substr(0, 5) == "Start") {
                let todayEndDate = openDatesRecurring.get("End" + TypeDate.substr(5,6));
                let workDate = startDate;
                while (moment(workDate).isSameOrBefore(toDate)) {
                    if (moment(workDate).isSameOrBefore(toDate) && moment(workDate).isSameOrAfter(fromDate)) {
                        if (!moment(workDate).isSame(todayEndDate, 'day')) {
                            todayEndDate = moment(workDate).hours(17).minutes(0);
                            manyDays = true;
                        }
                        allDatesAvailable.set(moment(workDate), moment(todayEndDate));
                    }
                    if (manyDays && moment(moment(workDate).add(1, 'days')).isSameOrBefore(todayEndDate)) {
                        workDate = moment(workDate).add(1, "days");
                    } else {
                        manyDays = false;
                    }
                    workDate = moment(workDate).add(7, "days");
                    todayEndDate = moment(todayEndDate).add(7, "days");
                }
            }
        })
    }

    recoverAvalaibleDatesUniques(openDatesUniques, allDatesAvailable, fromDate, toDate) {
        openDatesUniques.forEach(function(startDate, TypeDate) {
            if (TypeDate.substr(0, 5) == "Start") {
                let todayEndDate = openDatesUniques.get("End" + TypeDate.substr(5,6));
                let workDate = startDate;
                while  (moment(workDate).isSameOrBefore(openDatesUniques.get("End" + TypeDate.substr(5,6)), 'days')) {
                    if (moment(workDate).isSameOrBefore(toDate) && moment(workDate).isSameOrAfter(fromDate)) {
                        if (!moment(workDate).isSame(todayEndDate, 'day')) {
                            todayEndDate = moment(workDate).hours(17).minutes(0);
                        }
                        allDatesAvailable.set(moment(workDate), moment(todayEndDate));
                    }
                    workDate = moment(workDate).add(1, "days");
                    todayEndDate = openDatesUniques.get("End" + TypeDate.substr(5,6));
                }
            }
        })
    }

    createAllHoursAvailable(allDatesAvailable, allHoursAvailable) {
        allDatesAvailable.forEach(function(endDateAvailable, startDateAvailable) {
            allHoursAvailable = functions.completeAllHoursAvailable(startDateAvailable, endDateAvailable, allHoursAvailable);
        });
        return allHoursAvailable;
    }

    removeCloseDates(closeDates, allHoursAvailable) {
        console.log(allHoursAvailable);
        closeDates.forEach(function(startDate, TypeDate) {
            if (TypeDate.substr(0, 5) == "Start") {
                allHoursAvailable = functions.removeAllHoursInavailable(startDate, closeDates.get("End" + TypeDate.substr(5,6)), allHoursAvailable);
            }
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
        sentence += "\n We are not available any other time !\n";
        console.log(sentence);
    }
};

exports.Event = new Event;