"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferPatternQuery = void 0;
const DateUtil_1 = require("./DateUtil");
/**
 * Uses the Raptor algorithm to perform full day range queries and send the results to the repository.
 */
class TransferPatternQuery {
    raptor;
    resultFactory;
    ONE_DAY = 24 * 60 * 60;
    constructor(raptor, resultFactory) {
        this.raptor = raptor;
        this.resultFactory = resultFactory;
    }
    /**
     * Generate generate a full day's set of results and store them using the resultsFactory
     */
    plan(origin, dateObj) {
        const date = (0, DateUtil_1.getDateNumber)(dateObj);
        const dayOfWeek = dateObj.getDay();
        const results = this.resultFactory();
        let time = 1;
        while (time < this.ONE_DAY) {
            const [kConnections] = this.raptor.scan({ [origin]: time }, date, dayOfWeek);
            time = results.add(kConnections);
        }
        return results.finalize();
    }
}
exports.TransferPatternQuery = TransferPatternQuery;
