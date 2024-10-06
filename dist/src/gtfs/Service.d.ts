import { DateIndex, DateNumber, DayOfWeek } from "./GTFS";
export declare class Service {
    private readonly startDate;
    private readonly endDate;
    private readonly days;
    private readonly dates;
    constructor(startDate: DateNumber, endDate: DateNumber, days: Record<DayOfWeek, boolean>, dates: DateIndex);
    runsOn(date: number, dow: DayOfWeek): boolean;
}
