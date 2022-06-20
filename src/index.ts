import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./Schema";
import cors from "cors";
import { createConnection } from "typeorm";
import { Currency } from "./Entities/Currency";
import { Inventory } from "./Entities/Inventory";
import { KarmaTotal } from "./Entities/KarmaTotal";
import { KarmaPosts } from "./Entities/KarmaPosts";
require("dotenv").config();
import * as discord from "./Discord";
import { Sessions } from "./Entities/Sessions";
import { env } from "../environment";
import { Settings } from "./Entities/Settings";
import { Items } from "./Entities/Items";
import { RandomEvents } from "./Entities/RandomEvents";
import { GlobalSettings } from "./Entities/GlobalSettings";
const enforce = require("express-sslify");

const main = async () => {
  await createConnection({
    type: "mysql",
    host: env.DATABASE_HOST,
    port: parseInt(env.DATABASE_PORT),
    database: env.DATABASE_NAME,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    logging: false,
    synchronize: true,
    entities: [
      Currency,
      Inventory,
      KarmaTotal,
      KarmaPosts,
      Sessions,
      Settings,
      RandomEvents,
      GlobalSettings,
      Items,
    ],
  });

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));

  app.use(
    "/graphql",
    graphqlHTTP((req) => ({
      schema,
      graphiql: env.NODE_ENV === "development",
      context: { authorization: req.headers.authorization },
    }))
  );

  // for testing discord api only.
  if (env.NODE_ENV === "development") app.use("/discord", discord.default);

  app.listen(env.PORT, () => {
    console.log("SERVER RUNNING ON PORT " + env.PORT);
  });
};

main().catch((err) => {
  console.log(err);
});
