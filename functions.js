
const moment = require('moment');

exports.completeAllDateAvailable =
function completeAllDateAvailable(allDatesAvailable, startDate, endDate, fromDate, toDate) {
    while(moment(startDate).isSameOrBefore(endDate)) {
        if (moment(startDate).isSameOrBefore(toDate) && moment(startDate).isSameOrAfter(fromDate)) {
            let tmpEndDate = endDate;
            if (!moment(startDate).isSame(moment(endDate), 'day')) {
                tmpEndDate = moment(startDate).hours(17).minutes(0);
                manyDays = true;
            }
            allDatesAvailable.set(moment(startDate), moment(tmpEndDate));
        }
        startDate = moment(startDate).add(1, "days");
    }
    return allDatesAvailable;
}

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

function forOnDate(startDateDelete, endDateDelete, allHoursAvailable) {
    if (moment(startDateDelete).isSame(moment(endDateDelete))) {
        endDateDelete = moment(endDateDelete).add(30, 'minutes');
    }
    while (moment(startDateDelete).isSameOrBefore(moment(endDateDelete))) {
        allHoursAvailable.forEach(dateAvailable => {
            if (moment(dateAvailable).isSame(moment(startDateDelete))) {
                allHoursAvailable.splice(allHoursAvailable.indexOf(dateAvailable), 1);
            }
        });
        startDateDelete = moment(startDateDelete).add(30, 'minutes');
    }
    return allHoursAvailable;
}