import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "url";
import cors from "@fastify/cors";
import { dirname } from "path";
import path from "path";

// import internal modules
import authRoutes from "./app/api/auth/routes.js";
import pg_database from "./app/db/postgres.js";
import routes from "./app/routes/v1/index.js";
import uploadFileRoutes from "./app/api/upload_file/routes.js";
/*
    Register External packages, routes, database connection
*/

export default (app) => {
  app.register(fastifyStatic, {
    root: path.join(dirname(fileURLToPath(import.meta.url)), "public"),
    prefix: "/public/",
  });
  app.register(fastifyMultipart);
  app.register(cors, { origin: "*" });
  app.register(pg_database);
  app.register(routes, { prefix: "v1" });
  app.register(authRoutes, { prefix: "v1/auth" });
  app.register(uploadFileRoutes, { prefix: "v1/upload" });
};
