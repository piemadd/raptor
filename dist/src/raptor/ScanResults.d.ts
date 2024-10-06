import { StopID, Time, Transfer, Trip } from "../gtfs/GTFS";
export declare class ScanResults {
    private readonly bestArrivals;
    private readonly kArrivals;
    private readonly kConnections;
    private k;
    constructor(bestArrivals: Arrivals, kArrivals: ArrivalsByNumChanges, kConnections: ConnectionIndex);
    addRound(): void;
    previousArrival(stopPi: StopID): Time;
    setTrip(trip: Trip, startIndex: number, endIndex: number, interchange: number): void;
    setTransfer(transfer: Transfer, time: Time): void;
    bestArrival(stopPi: StopID): Time;
    getMarkedStops(): string[];
    finalize(): [ConnectionIndex, Arrivals];
}
export type Arrivals = Record<StopID, Time>;
export type ArrivalsByNumChanges = Record<number, Arrivals>;
export type Connection = [Trip, number, number];
export type ConnectionIndex = Record<StopID, Record<number, Connection | Transfer>>;
