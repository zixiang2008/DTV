/**
 * database.js - sql.js compatible database layer
 * Works in both local (Node.js) and Netlify Functions (serverless) environments
 */
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'dtv.db');

let dbInstance = null;

/**
 * Compatibility wrapper to match better-sqlite3 API surface
 * so that server.js can use db.prepare(sql).run/get/all seamlessly
 */
class SqlJsWrapper {
    constructor(sqlDb) {
        this._db = sqlDb;
    }

    pragma(pragma) {
        // sql.js doesn't support pragmas in the same way; safe to ignore
        try { this._db.run(`PRAGMA ${pragma}`); } catch (e) { /* ignore */ }
    }

    exec(sql) {
        this._db.run(sql);
    }

    prepare(sql) {
        const db = this._db;
        return {
            run: function (...params) {
                db.run(sql, params);
                const rowid = db.exec("SELECT last_insert_rowid() as id");
                const changes = db.exec("SELECT changes() as c");
                return {
                    lastInsertRowid: rowid[0]?.values[0]?.[0] || 0,
                    changes: changes[0]?.values[0]?.[0] || 0
                };
            },
            get: function (...params) {
                let stmt;
                try {
                    stmt = db.prepare(sql);
                    if (params.length > 0) stmt.bind(params);
                    if (stmt.step()) {
                        return stmt.getAsObject();
                    }
                    return undefined;
                } finally {
                    if (stmt) stmt.free();
                }
            },
            all: function (...params) {
                const results = [];
                let stmt;
                try {
                    stmt = db.prepare(sql);
                    if (params.length > 0) stmt.bind(params);
                    while (stmt.step()) {
                        results.push(stmt.getAsObject());
                    }
                    return results;
                } finally {
                    if (stmt) stmt.free();
                }
            }
        };
    }

    /** Persist the database to disk (local dev only) */
    save() {
        try {
            const data = this._db.export();
            fs.writeFileSync(DB_PATH, Buffer.from(data));
        } catch (e) {
            // In serverless, writing to disk is not supported; silently ignore
        }
    }
}

/**
 * Initialize and return the wrapped database instance
 * @returns {Promise<SqlJsWrapper>}
 */
async function getDatabase() {
    if (dbInstance) return dbInstance;

    const SQL = await initSqlJs();
    let rawDb;

    // Try to load existing database from disk (local dev)
    try {
        if (fs.existsSync(DB_PATH)) {
            const buffer = fs.readFileSync(DB_PATH);
            rawDb = new SQL.Database(buffer);
        }
    } catch (e) {
        // Ignore - will create a new in-memory database
    }

    if (!rawDb) {
        rawDb = new SQL.Database();
    }

    dbInstance = new SqlJsWrapper(rawDb);
    return dbInstance;
}

module.exports = { getDatabase };
