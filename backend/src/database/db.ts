import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "perntodo",
  password: "Villaester03-",
  port: 5432,
});

export default pool;
