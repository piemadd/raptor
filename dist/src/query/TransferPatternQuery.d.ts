import { RaptorAlgorithm } from "../raptor/RaptorAlgorithm";
import { StopID } from "../gtfs/GTFS";
import { StringResults, TransferPatternIndex } from "../transfer-pattern/results/StringResults";
/**
 * Uses the Raptor algorithm to perform full day range queries and send the results to the repository.
 */
export declare class TransferPatternQuery {
    private readonly raptor;
    private readonly resultFactory;
    private readonly ONE_DAY;
    constructor(raptor: RaptorAlgorithm, resultFactory: () => StringResults);
    /**
     * Generate generate a full day's set of results and store them using the resultsFactory
     */
    plan(origin: StopID, dateObj: Date): TransferPatternIndex;
}
