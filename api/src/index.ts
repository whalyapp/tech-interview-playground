import { runExpressServer } from "./express/server";
import { runGraphqlServer } from "./graphql/server";

(async () => {
  await runGraphqlServer();
  await runExpressServer();
})();
