import {Pool, QueryResult} from 'pg';
import config from './config';

class Database {
    private pool : Pool;

    constructor() {
        this.pool = new Pool(config);
        this.pool.on("error", (err, client) => {
            console.error('Unexpected error on idle PostgreSQL client.', err);
            process.exit(-1);
        });
    }

    public async query(text: string, params?:any) : Promise<QueryResult<any>> {
        const client = await this.pool.connect();
        try {
          let queryRes = await client.query(text, params);
          client.release();
          return queryRes;
        } catch (e){
          console.log('async query error');
          client.release();
          throw (e);
        }
    } 
}
  
export default new Database();
