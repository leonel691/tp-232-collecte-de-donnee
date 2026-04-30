import { app } from "./app.js";
import { connectDb } from "./db/connect.js";
import { env } from "./config/env.js";

async function start() {
  await connectDb();
  app.listen(env.PORT, () => {
    console.log(`API running on http://localhost:${env.PORT}`);
  });
}

start().catch((e) => {
  console.error("Startup error:", e);
  process.exit(1);
});
