import { Arguments, Registrar } from "@kui-shell/core";
// import Debug from "debug";

// const debug = Debug("plugins/restheart-shell/test");

const test = (args: Arguments) => `argv ${args.argv}
  argvNoOptions ${args.argvNoOptions}
  command ${args.command}
  parsedOptions ${JSON.stringify(args.parsedOptions)}`;

const usage = {};

export default async (registrar: Registrar) => {
  registrar.listen("/test", test, {
    usage,
    noAuthOk: true
  });
};
