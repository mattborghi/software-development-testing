import mysql from "mysql2/promise";
import { Issue } from "./types";

export async function getIssues(query: string) {
  try {
    const db = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    } as mysql.ConnectionOptions);

    const [result] = await db.query(query);

    await db.end();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createIssue(query: string, params: Issue) {
  try {
    const db = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    } as mysql.ConnectionOptions);

    const [result] = await db.query(query, [
      params.name,
      params.email,
      params.description,
    ]);

    await db.end();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}
