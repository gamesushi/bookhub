import yargs from "yargs";
import { hideBin } from "yargs/helpers";
yargs(hideBin(process.argv))
  .command("test", "Test command", {}, async () => {
    throw new Error("This is a test error");
  })
  .parse();
