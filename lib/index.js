"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntervalStartDate = exports.groupDataInTimeIntervals = exports.IntervalEnum = void 0;
var sales_dto_1 = require("./dto/sales.dto");
var sales_dto_2 = require("./dto/sales.dto");
Object.defineProperty(exports, "IntervalEnum", { enumerable: true, get: function () { return sales_dto_2.IntervalEnum; } });
function groupDataInTimeIntervals(details) {
    var data = details.data, interval = details.interval;
    if (data.length === 0)
        return [];
    var startDate = details.startDate || new Date(data[0].t);
    var endDate = new Date(data[0].t);
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var datum = data_1[_i];
        if (+new Date(datum.t) > +endDate) {
            endDate = new Date(datum.t);
        }
        if (+new Date(datum.t) < +startDate) {
            startDate = new Date(datum.t);
        }
    }
    // set date to interval start
    startDate = getIntervalStartDate(startDate, interval);
    var intervals = [
        {
            startDate: startDate,
            endDate: getIntervalEndDate(startDate, interval),
            data: [],
        },
    ];
    var currentStartDate = intervals[0].endDate;
    while (currentStartDate < endDate) {
        var currentEndDate = getIntervalEndDate(currentStartDate, interval);
        intervals.push({
            startDate: currentStartDate,
            endDate: currentEndDate,
            data: [],
        });
        currentStartDate = currentEndDate;
    }
    for (var _a = 0, data_2 = data; _a < data_2.length; _a++) {
        var sale = data_2[_a];
        for (var _b = 0, intervals_1 = intervals; _b < intervals_1.length; _b++) {
            var _interval = intervals_1[_b];
            if (new Date(sale.t) >= _interval.startDate &&
                new Date(sale.t) < _interval.endDate) {
                _interval.data.push(sale);
                break;
            }
        }
    }
    return intervals;
}
exports.groupDataInTimeIntervals = groupDataInTimeIntervals;
function getIntervalEndDate(startDate, interval) {
    switch (interval) {
        case sales_dto_1.IntervalEnum.YEARLY:
            return new Date(startDate.getFullYear() + 1, 0, 1, 1, 0, 0);
        case sales_dto_1.IntervalEnum.MONTHLY:
            return new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1, 1, 0, 0);
        case sales_dto_1.IntervalEnum.WEEKLY:
            return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7, 1, 0, 0);
        case sales_dto_1.IntervalEnum.DAILY:
            return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1, 1, 0, 0);
    }
}
function getIntervalStartDate(startDate, interval) {
    switch (interval) {
        case sales_dto_1.IntervalEnum.YEARLY:
            return new Date(startDate.getFullYear(), 0, 1, 1, 0, 0);
        case sales_dto_1.IntervalEnum.MONTHLY:
            return new Date(startDate.getFullYear(), startDate.getMonth(), 1, 1, 0, 0);
        case sales_dto_1.IntervalEnum.WEEKLY:
            return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - startDate.getDay(), 1, 0, 0);
        case sales_dto_1.IntervalEnum.DAILY:
            return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 1, 0, 0);
    }
}
exports.getIntervalStartDate = getIntervalStartDate;
