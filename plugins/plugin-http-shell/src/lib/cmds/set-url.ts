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
  if (!args || args.length < 4) {
    throw new UsageError({ message: errorMsg(usage), usage: usage });
  } else {
    const url = `${args[3]}`;

    if (url.startsWith('http://') ||  url.startsWith('https://')) {
      Store().setItem("url", url);
      return url;
    } else if (url.length > 2 && url[0] === ':' && !isNaN(Number(url.substring(1)))) {
      Store().setItem("url", `http://localhost${url}`);
      return `http://localhost${url}`
    } else if (url.length > 0 && url[0] !== ':') {
      Store().setItem("url", `http://${url}`);
      return `http://${url}`;
    } else {
      return 'invalid URL';
    }
  }
};

export default async (registrar: Registrar) => {
  registrar.listen('/h/set/url', setUrlCmd, {
    usage: usage,
    noAuthOk: true
  });
};
