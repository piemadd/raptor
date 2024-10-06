"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferPatternRepository = void 0;
/**
 * Access to the transfer_patterns table in a mysql compatible database
 */
class TransferPatternRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    /**
     * Store every transfer pattern in the tree
     */
    async storeTransferPatterns(patterns) {
        const journeys = [];
        for (const journey in patterns) {
            for (const pattern of patterns[journey]) {
                journeys.push([journey, pattern]);
            }
        }
        if (journeys.length > 0) {
            await this.retryQuery("INSERT IGNORE INTO transfer_patterns VALUES ?", [journeys]);
        }
    }
    async retryQuery(sql, data, numRetries = 3) {
        try {
            await this.db.query(sql, data);
        }
        catch (err) {
            if (numRetries > 0) {
                await this.retryQuery(sql, data, numRetries - 1);
            }
            else {
                console.error(err);
            }
        }
    }
    /**
     * Create the transfer pattern table if it does not already exist
     */
    async initTables() {
        await this.db.query(`
      CREATE TABLE IF NOT EXISTS transfer_patterns (
        journey char(6) NOT NULL,
        pattern varchar(255) NOT NULL,
        PRIMARY KEY (journey,pattern)
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1
     `);
    }
}
exports.TransferPatternRepository = TransferPatternRepository;
