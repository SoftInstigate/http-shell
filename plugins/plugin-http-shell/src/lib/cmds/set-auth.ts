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
import Debug from "debug";
import { setAuthUsage as usage } from "../usage";

const debug = Debug("plugins/plugin-http-shell/set-auth");

// const setAuth =  async
const setAuth = ({ argvNoOptions: args }: Arguments) => {
  debug("setAuth invoked");
  if (!args || args.length < 4) {
    throw new UsageError({ usage: usage });
  } else {
    Store().setItem("id", args[2]);
    Store().setItem("pwd", args[3]);

    return "ok";
  }
};

export default async (registrar: Registrar) => {
  registrar.listen("/set/auth", setAuth, {
    usage,
    noAuthOk: true
  });
};
