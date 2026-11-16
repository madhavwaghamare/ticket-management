import { createApp } from "./app.ts";
import { env } from "./env.ts";

const app = createApp({ serveClient: env.NODE_ENV === "production" });

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT} (${env.NODE_ENV})`);
});
