"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTransfer = void 0;
/**
 * Type check for a kConnection connection
 */
function isTransfer(connection) {
    return connection.origin !== undefined;
}
exports.isTransfer = isTransfer;
