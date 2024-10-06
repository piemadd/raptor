"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
class Service {
    startDate;
    endDate;
    days;
    dates;
    constructor(startDate, endDate, days, dates) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.days = days;
        this.dates = dates;
    }
    runsOn(date, dow) {
        return this.dates[date] || (!this.dates.hasOwnProperty(date) &&
            this.startDate <= date &&
            this.endDate >= date &&
            this.days[dow]);
    }
}
exports.Service = Service;
