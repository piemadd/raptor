import { ConnectionIndex } from "../../raptor/ScanResults";
import { Interchange } from "../../raptor/RaptorAlgorithm";
/**
 * Store the kConnection results as an index where the key is the journey origin and destination and the value is a Set
 * of change points.
 */
export declare class StringResults {
    private readonly interchange;
    private results;
    constructor(interchange: Interchange);
    /**
     * Extract the path from each kConnection result and store it in an index
     */
    add(kConnections: ConnectionIndex): number;
    /**
     * Return the results
     */
    finalize(): TransferPatternIndex;
    private getPath;
}
/**
 * Origin + destination.
 */
export type JourneyPatternKey = string;
/**
 * Comma separated list of transfer points. The origin and destination stops are omitted.
 */
export type JourneyPattern = string;
/**
 * Transfer pattern strings indexed by their journey key.
 */
export type TransferPatternIndex = Record<JourneyPatternKey, Set<JourneyPattern>>;
