import { app } from "./app.js";
import { connectDb } from "./db/connect.js";
import { env } from "./config/env.js";

async function start() {
  await connectDb();
  app.listen(env.PORT, "0.0.0.0", () => {
    console.log(`API running on port ${env.PORT}`);
  });
}

start().catch((e) => {
  console.error("Startup error:", e);
  process.exit(1);
});
