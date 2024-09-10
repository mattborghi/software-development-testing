import mysql, {
  Pool,
  PoolConnection,
  PoolOptions,
  QueryResult,
} from "mysql2/promise";

export default class DB {
  private pool: Pool;

  private dbConfig = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
  } as PoolOptions;

  async getDBConnection(): Promise<PoolConnection> {
    if (!this.pool) {
      this.pool = mysql.createPool(this.dbConfig);
      const client = await this.pool.getConnection();
      console.log(
        `---------> √ DB connection has been established! <---------`
      );
      return client;
    } else {
      return this.pool.getConnection();
    }
  }

  async executeQuery(
    query: string,
    args?: any
  ): Promise<QueryResult | undefined> {
    try {
      const client = await this.getDBConnection();
      const [result] = await client.execute(query, args);
      client.release();
      return result;
    } catch (error) {
      console.error("Error executing query:", error);
    }
  }
}
