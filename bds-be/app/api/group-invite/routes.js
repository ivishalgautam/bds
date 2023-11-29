"use strict";

import controller from "./controller.js";

export default async function routes(fastify, options) {
  fastify.get("/invite", {}, controller.get);
  fastify.post("/invite", {}, controller.create);
  fastify.put("/invite/:invitation_id", {}, controller.update);
}
