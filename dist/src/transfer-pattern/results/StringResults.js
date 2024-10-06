"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringResults = void 0;
const ResultsFactory_1 = require("../../results/ResultsFactory");
/**
 * Store the kConnection results as an index where the key is the journey origin and destination and the value is a Set
 * of change points.
 */
class StringResults {
    interchange;
    results = {};
    constructor(interchange) {
        this.interchange = interchange;
    }
    /**
     * Extract the path from each kConnection result and store it in an index
     */
    add(kConnections) {
        let nextDepartureTime = Number.MAX_SAFE_INTEGER;
        for (const destination in kConnections) {
            for (const k in kConnections[destination]) {
                const [path, departureTime] = this.getPath(kConnections, k, destination);
                if (path.length >= 1) {
                    const [origin, ...tail] = path;
                    const journeyKey = origin > destination ? destination + origin : origin + destination;
                    const pathString = origin > destination ? tail.reverse().join(",") : tail.join(",");
                    this.results[journeyKey] = this.results[journeyKey] || new Set();
                    this.results[journeyKey].add(pathString);
                    nextDepartureTime = Math.min(nextDepartureTime, departureTime + 1);
                }
            }
        }
        return nextDepartureTime;
    }
    /**
     * Return the results
     */
    finalize() {
        return this.results;
    }
    getPath(kConnections, k, finalDestination) {
        const path = [];
        let departureTime = Number.MAX_SAFE_INTEGER;
        for (let destination = finalDestination, i = parseInt(k, 10); i > 0; i--) {
            const connection = kConnections[destination][i];
            const origin = (0, ResultsFactory_1.isTransfer)(connection) ? connection.origin : connection[0].stopTimes[connection[1]].stop;
            departureTime = (0, ResultsFactory_1.isTransfer)(connection)
                ? departureTime - connection.duration - this.interchange[connection.destination]
                : connection[0].stopTimes[connection[1]].departureTime;
            path.unshift(origin);
            destination = origin;
        }
        return [path, departureTime];
    }
}
exports.StringResults = StringResults;
