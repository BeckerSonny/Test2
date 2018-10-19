const moment = require('moment');

exports.completeAllHoursAvailableRecurringWithDelete =
function completeAllHoursAvailableRecurringWithDelete(earlyDateAvailable, startDateDelete, endDateDelete, endDateAvailable, toDate, allHoursAvailable) {
    while(moment(earlyDateAvailable).isSameOrBefore(toDate, 'days')) {
        let newEarlyDateAvailable = earlyDateAvailable;
        while (moment(newEarlyDateAvailable).isBefore(moment(endDateAvailable))) {
            if (moment(newEarlyDateAvailable).isBefore(moment(startDateDelete)) ||
            (moment(newEarlyDateAvailable).isAfter(moment(endDateDelete)))) {
                allHoursAvailable.set(moment(newEarlyDateAvailable, "YYYY-MM-DD"), moment(newEarlyDateAvailable).hours() + ":" + moment(newEarlyDateAvailable).minutes());
            }
            newEarlyDateAvailable = moment(newEarlyDateAvailable).add(30, 'minutes');
        }
        earlyDateAvailable = moment(earlyDateAvailable).add(7, 'days');
        endDateAvailable = moment(endDateAvailable).add(7, 'days');
        startDateDelete = moment(startDateDelete).add(7, 'days');
        endDateDelete = moment(endDateDelete).add(7, 'days');
    }
    return allHoursAvailable;
}

exports.completeAllHoursAvailableRecurring =
function completeAllHoursRecurringAvailable(earlyDateAvailable, endDateAvailable, toDate, allHoursAvailable) {
    while (moment(earlyDateAvailable).isSameOrBefore(toDate, 'days')) {
        while (moment(earlyDateAvailable).isBefore(moment(endDateAvailable))) {
            allHoursAvailable.set(moment(earlyDateAvailable, "YYYY-MM-DD"), moment(earlyDateAvailable).hours() + ":" + moment(earlyDateAvailable).minutes());
            earlyDateAvailable = moment(earlyDateAvailable).add(30, 'minutes');
        }
        earlyDateAvailable = moment(earlyDateAvailable).add(7, 'days');
        endDateAvailable = moment(endDateAvailable).add(7, 'days');
    }
    return allHoursAvailable;
}

exports.completeAllHoursAvailableWithDelete =
function completeAllHoursAvailableWithDelete(earlyDateAvailable, startDateDelete, endDateDelete, endDateAvailable, allHoursAvailable) {
    while (moment(earlyDateAvailable).isBefore(moment(endDateAvailable))) {
        if (moment(earlyDateAvailable).isBefore(moment(startDateDelete)) ||
        (moment(earlyDateAvailable).isAfter(moment(endDateDelete)))) {
            allHoursAvailable.set(moment(earlyDateAvailable, "YYYY-MM-DD"), moment(earlyDateAvailable).hours() + ":" + moment(earlyDateAvailable).minutes());
            //console.log("All Hours Available ===========> ", allHoursAvailable);
        }
        earlyDateAvailable = moment(earlyDateAvailable).add(30, 'minutes');
    }
    return allHoursAvailable;
}

exports.completeAllHoursAvailable =
function completeAllHoursAvailable(earlyDateAvailable, endDateAvailable, allHoursAvailable) {
    while (moment(earlyDateAvailable).isBefore(moment(endDateAvailable))) {
        allHoursAvailable.set(moment(earlyDateAvailable, "YYYY-MM-DD"), moment(earlyDateAvailable).hours() + ":" + moment(earlyDateAvailable).minutes());
        earlyDateAvailable = moment(earlyDateAvailable).add(30, 'minutes');
    }
    return allHoursAvailable;
}