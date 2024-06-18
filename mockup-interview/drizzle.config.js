/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:eUkI27wdgLmx@ep-green-queen-a55yoys9.us-east-2.aws.neon.tech/neondb?sslmode=require',
  }
};
