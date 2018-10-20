const moment = require('moment');

exports.completeAllHoursAvailableRecurringWithDelete =
function completeAllHoursAvailableRecurringWithDelete(earlyDateAvailable, startDateDelete, endDateDelete, endDateAvailable, toDate, allHoursAvailable) {
    while(moment(earlyDateAvailable).isSameOrBefore(toDate, 'days')) {
        let newEarlyDateAvailable = earlyDateAvailable;
        while (moment(newEarlyDateAvailable).isBefore(moment(endDateAvailable))) {
            if (moment(newEarlyDateAvailable).isBefore(moment(startDateDelete)) ||
            (moment(newEarlyDateAvailable).isAfter(moment(endDateDelete).add(30, 'minutes')))) {
                allHoursAvailable.push(moment(newEarlyDateAvailable, "YYYY-MM-DD"));
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
            allHoursAvailable.push(moment(earlyDateAvailable, "YYYY-MM-DD"));
            earlyDateAvailable = moment(earlyDateAvailable).add(30, 'minutes');
        }
        earlyDateAvailable = moment(earlyDateAvailable).add(7, 'days');
        endDateAvailable = moment(endDateAvailable).add(7, 'days');
    }
    return allHoursAvailable;
}

exports.removeAllHoursInavailable =
function removeAllHoursInavailable(startDateDelete, endDateDelete, allHoursAvailable) {
    while (moment(startDateDelete).isSameOrBefore(moment(endDateDelete).add(30, 'minutes'))) {
        allHoursAvailable.forEach(dateAvailable => {
            if (moment(dateAvailable).isSame(moment(startDateDelete))) {
                allHoursAvailable.splice(allHoursAvailable.indexOf(dateAvailable), 1);
            }
        });
        startDateDelete = moment(startDateDelete).add(30, 'minutes');
    }
    return allHoursAvailable;
}