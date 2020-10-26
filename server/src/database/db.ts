import { Pool, QueryResult } from "pg";
import config from "./config";
import parentLogger from "../../utils/logger";

const log = parentLogger.child({ module: "postgres" });

class Database {
    private pool: Pool;

    constructor() {
        this.pool = new Pool(config);
        this.pool.on("error", (err, client) => {
            log.error("Unexpected error on idle PostgreSQL client.", err);
            process.exit(-1);
        });
    }

    public async query(text: string, params?: any): Promise<QueryResult<any>> {
        const client = await this.pool.connect();
        try {
            let queryRes = await client.query(text, params);
            client.release();
            return queryRes;
        } catch (e) {
            log.info("async query error");
            client.release();
            throw (e);
        }
    }
}

export default new Database();
