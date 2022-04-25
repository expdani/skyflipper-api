import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./Schema";
import cors from "cors";
import { createConnection } from "typeorm";
import { Users } from "./Entities/Users";
import { Currency } from "./Entities/Currency";
import { Inventory } from "./Entities/Inventory";
import { KarmaTotal } from "./Entities/KarmaTotal";
import { KarmaPosts } from "./Entities/KarmaPosts";
require("dotenv").config();
import index from "./Discord";
import { Sessions } from "./Entities/Sessions";

const main = async () => {
  await createConnection({
    type: "mysql",
    database: "discordv2",
    username: "root",
    password: "",
    logging: false,
    synchronize: true,
    entities: [Users, Currency, Inventory, KarmaTotal, KarmaPosts, Sessions],
  });

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.use("/discord", index);

  app.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001");
  });
};

main().catch((err) => {
  console.log(err);
});
