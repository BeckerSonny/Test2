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
        //console.log("OpenDates ==> ", openDatesRecurring);
    }

    availabilities(fromDate, toDate) {
        fromDate = moment(fromDate, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm");
        toDate = moment(toDate, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm")
        this.recoverAvalaibleDatesRecurring(openDatesRecurring, allDatesAvailable, fromDate, toDate);
        this.recoverAvalaibleDatesUniques(openDatesUniques, allDatesAvailable, fromDate, toDate);
        //allDatesAvailable = this.removeInavailableDatesRecuring(closeDatesRecurring, allDatesAvailable, toDate);
        //allDatesAvailable = this.removeInavailableDatesUniques(closeDatesUniques, allDatesAvailable);
        console.log("Available dates ==> ", allDatesAvailable);
    }

    recoverAvalaibleDatesRecurring(openDatesRecurring, allDatesAvailable, fromDate, toDate) {
        openDatesRecurring.forEach(function(startDate, TypeDate) {
            let manyDays = false;
            if (TypeDate.substr(0, 5) == "Start") {
                let todayEndDate = openDatesRecurring.get("End" + TypeDate.substr(5,6));
                let workDate = startDate;
                while(moment(workDate).isSameOrBefore(toDate)) {
                    /* console.log("Start date ==> ", workDate);
                    console.log("from Date ==> ", fromDate);
                    console.log("Condition 1 ===> ", moment(workDate).isSameOrAfter(fromDate)); */
                    if (moment(workDate).isSameOrBefore(toDate) && moment(workDate).isSameOrAfter(fromDate)) {
                        console.log("Start Date => ", workDate);
                        if (!moment(workDate).isSame(todayEndDate, 'day')) {
                            todayEndDate = moment(workDate).hours(17).minutes(0);
                            manyDays = true;
                        }
                        /* console.log('\n');
                        console.log('Today end date ===> ', todayEndDate);
                        console.log('\n'); */
                        allDatesAvailable.set(workDate, todayEndDate);
                    }
                    if (manyDays && moment(moment(workDate).add(1, 'days')).isSameOrBefore(todayEndDate)) {
                        workDate = moment(workDate).add(1, "days");
                    } else {
                        manyDays = false;
                    }
                    workDate = moment(workDate).add(7, "days");
                    todayEndDate = moment(todayEndDate).add(7, "days");
                    //console.log("Else start date ==> ", workDate)
                }
            }
            //console.log('Coucou ==> ', allDatesAvailable);
        })
    }

    recoverAvalaibleDatesUniques(array, arrayValidates, fromDate, toDate) {
        openDatesRecurring.forEach(function(startDate, TypeDate) {
            if (TypeDate.substr(0, 5) == "Start") {
                let todayEndDate = openDatesRecurring.get("End" + TypeDate.substr(5,6));
                let workDate = startDate;
                while(moment(workDate).isSameOrBefore(toDate)) {
                    /* console.log("Start date ==> ", workDate);
                    console.log("from Date ==> ", fromDate);
                    console.log("Condition 1 ===> ", moment(workDate).isSameOrAfter(fromDate)); */
                    if (moment(workDate).isSameOrBefore(toDate) && moment(workDate).isSameOrAfter(fromDate)) {
                        console.log("Start Date => ", workDate);
                        if (!moment(workDate).isSame(todayEndDate, 'day')) {
                            todayEndDate = moment(workDate).hours(17).minutes(0);
                            manyDays = true;
                        }
                        /* console.log('\n');
                        console.log('Today end date ===> ', todayEndDate);
                        console.log('\n'); */
                        allDatesAvailable.set(workDate, todayEndDate);
                    }
                    workDate = moment(workDate).add(1, "days");
                    //console.log("Else start date ==> ", workDate)
                }
            }
            //console.log('Coucou ==> ', allDatesAvailable);
        })
    }

    removeInavailableDatesRecuring(array, arrayValidates, toDate) {

    }

    removeInavailableDatesUniques(array, arrayValidates) {

    }

    addHoursToDate(startDate, thisEndDate, allDatesAvailable) {
        while(moment(startDate,  "YY/MM/YYYY").getHours) {
            
        }
    }

    /* createSentence(array) {
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
    } */
};

exports.Event;