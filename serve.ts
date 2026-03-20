import Fastify from "fastify";
import fastifyMiddie from "@fastify/middie";
import fastifyStatic from "@fastify/static";
import fastifyCompress from "@fastify/compress";
import { fileURLToPath } from "node:url";
import { handler as ssrHandler } from "./dist/server/entry.mjs";
import { loadEnv } from "vite";
import { securityHeaders } from "./src/assets/headers.ts";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

const port = Number(env.PORT);

if (isNaN(port)) throw new Error("PORT is not defined in env");

const app = Fastify();

await app.register(fastifyCompress);

await app
  .register(fastifyStatic, {
    root: fileURLToPath(new URL("./dist/client", import.meta.url)),
    cacheControl: false,
    setHeaders: (res, path) => {
      for (const [name, value] of securityHeaders) {
        res.setHeader(name, value);
      }
      if (path.includes("/client/_astro/")) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else {
        res.setHeader("Cache-Control", "public, max-age=86400");
      }
    },
  })
  .register(fastifyMiddie);
app.use(ssrHandler);

app.listen({ port });

console.log(`Server listening on http://localhost:${port}`);
