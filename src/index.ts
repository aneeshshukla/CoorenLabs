import { createApp } from "./app";
import { PORT, validateConfig } from "./core/config";
import { Logger } from "./core/logger";
import { isDeno } from "./core/runtime";

import { remapManager } from "./core/remapManager";

validateConfig();
await remapManager.init();

const app = await createApp();

if (isDeno) {
  // @ts-expect-error - Deno global
  Deno.serve({ port: PORT }, app.fetch);
} else {
  app.listen(PORT);
}

Logger.info(`Started at http://localhost:${PORT}`);
