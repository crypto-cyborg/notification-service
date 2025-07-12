import { Hono } from "hono";

const port = process.env["API_PORT"] || 3000;

const app = new Hono();

app.get("/healthcheck", (c) => {
  return c.json({ status: "ok" });
});

export default {
  port,
  fetch: app.fetch,
};
