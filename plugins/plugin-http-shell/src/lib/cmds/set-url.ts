/*
 * Copyright 2020 SoftInstigate Srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Arguments, Registrar, Store, UsageError } from "@kui-shell/core";

import { setUrlUsage as usage, errorMsg } from "../usage";

// import Debug from "debug";
// const debug = Debug("plugins/plugin-http-shell/set-url");

const setUrlCmd = async ({ argvNoOptions: args }: Arguments) => {
  if (!args || args.length < 3) {
    throw new UsageError({ message: errorMsg(usage), usage: usage });
  } else {
    Store().setItem("url", args[2]);

    return 'ok';
  }
};

export default async (registrar: Registrar) => {
  registrar.listen('/set/url', setUrlCmd, {
    usage: usage,
    noAuthOk: true
  });
};
