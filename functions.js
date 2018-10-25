
const moment = require('moment');

exports.completeAllHoursAvailable =
function completeAllHoursAvailable(startDateAvailable, endDateAvailable, allHoursAvailable) {
    while (moment(startDateAvailable).isSameOrBefore(endDateAvailable)) {
        allHoursAvailable.push(moment(startDateAvailable, "YYYY-MM-DD"));
        startDateAvailable = moment(startDateAvailable).add(30, 'minutes');
    }
    return allHoursAvailable;
}

exports.removeAllHoursInavailable =
function removeAllHoursInavailable(startDateDelete, endDateDelete, allHoursAvailable) {
    allHoursAvailable = forOnDate(startDateDelete, endDateDelete, allHoursAvailable);
    return allHoursAvailable;
}

// exports.removeAllHoursInvailableRecurring =
// function removeAllHoursInvailableRecurring(startDateDelete, endDateDelete, toDate, allHoursAvailable) {
//     
//     return allHoursAvailable;
// }

function forOnDate(startDateDelete, endDateDelete, allHoursAvailable) {
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