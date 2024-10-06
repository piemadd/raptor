import { TransferPatternIndex } from "./results/StringResults";
import { Pool } from "mysql2/promise";
/**
 * Access to the transfer_patterns table in a mysql compatible database
 */
export declare class TransferPatternRepository {
    private readonly db;
    constructor(db: Pool);
    /**
     * Store every transfer pattern in the tree
     */
    storeTransferPatterns(patterns: TransferPatternIndex): Promise<void>;
    private retryQuery;
    /**
     * Create the transfer pattern table if it does not already exist
     */
    initTables(): Promise<void>;
}
