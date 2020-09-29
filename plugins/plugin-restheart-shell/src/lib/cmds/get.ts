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

import {
  Registrar,
  Arguments,
  Store,
  UsageError,
  MultiModalResponse
} from "@kui-shell/core";
import { getUsage as usage } from "../usage";
const unirest = require("unirest");
// import Debug from "debug";

// const debug = Debug("plugins/restheart-shell/get-auth");

const getCmd = async ({ argvNoOptions: args }: Arguments) => {
  if (!args || args.length < 2) {
    throw new UsageError({ usage: usage });
  } else {
    const uri = args[1];
    const urlPrefix = Store().getItem("url");

    if (!urlPrefix) {
      return 'url not set. use "set url"';
    }

    return unirest
      .get(`${urlPrefix}${uri}`)
      .headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
      .auth(Store().getItem("id"), Store().getItem("pwd"))
      .then((response: { body: unknown }) =>
        JSON.stringify(response.body, null, 2)
      )
      .then((body: string) => {
        console.log(body);
        return body;
      })
      .then((body: string) => {
        const ret: MultiModalResponse = {
          metadata: { name: `🐱 GET ${urlPrefix}${uri}` },
          kind: "Top",
          modes: [
            {
              mode: "Response",
              content: body,
              contentType: "json"
            },
            {
              mode: "Request",
              content: `url: ${urlPrefix}${uri}\nid: ${Store().getItem(
                "id"
              )}, password: ${Store().getItem("pwd")}`,
              contentType: "text/markdown"
            }
          ]
        };

        return ret;
      });
  }
};

export default async (registrar: Registrar) => {
  registrar.listen("/get", getCmd, {
    usage: usage,
    noAuthOk: true
  });
};
