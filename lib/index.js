"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupDataInTimeIntervals = void 0;
var sales_dto_1 = require("./dto/sales.dto");
__exportStar(require("./dto/sales.dto"), exports);
function groupDataInTimeIntervals(details) {
    var data = details.data, interval = details.interval;
    var startDate = details.startDate;
    if (data.length === 0)
        return [];
    if (!startDate) {
        startDate = data.reduce(function (earliest, sale) {
            return new Date(sale.t) < earliest
                ? new Date(sale.t)
                : earliest;
        }, new Date(data[0].t));
    }
    var endDate = data.reduce(function (latest, sale) {
        return new Date(sale.t) > latest
            ? new Date(sale.t)
            : latest;
    }, new Date(data[0].t));
    var intervals = [
        {
            startDate: startDate,
            endDate: getEndDate(startDate, interval),
            data: [],
        },
    ];
    var currentStartDate = intervals[0].endDate;
    while (currentStartDate < endDate) {
        var currentEndDate = getEndDate(currentStartDate, interval);
        intervals.push({
            startDate: currentStartDate,
            endDate: currentEndDate,
            data: [],
        });
        currentStartDate = currentEndDate;
    }
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var sale = data_1[_i];
        for (var _a = 0, intervals_1 = intervals; _a < intervals_1.length; _a++) {
            var _interval = intervals_1[_a];
            if (new Date(sale.t) >=
                _interval.startDate &&
                new Date(sale.t) <
                    _interval.endDate) {
                _interval.data.push(sale);
                break;
            }
        }
    }
    return intervals;
}
exports.groupDataInTimeIntervals = groupDataInTimeIntervals;
function getEndDate(startDate, interval) {
    switch (interval) {
        case sales_dto_1.IntervalEnum.YEARLY:
            return new Date(startDate.getFullYear() + 1, 0, 1);
        case sales_dto_1.IntervalEnum.MONTHLY:
            return new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
        case sales_dto_1.IntervalEnum.WEEKLY:
            return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);
        case sales_dto_1.IntervalEnum.DAILY:
            return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);
    }
}
