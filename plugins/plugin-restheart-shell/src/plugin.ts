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
  Arguments,
  Registrar,
  MultiModalResponse,
  Store,
  Table,
  UsageError
} from "@kui-shell/core";
import Debug from "debug";
import { setAuthUsage, setUrlUsage, getUsage } from "./usage";

const debug = Debug("plugins/restheart-shell");
const unirest = require("unirest");

export default async (registrar: Registrar) => {
  registrar.listen(
    "/test",
    (args: Arguments) => `argv ${args.argv}
argvNoOptions ${args.argvNoOptions}
command ${args.command}
parsedOptions ${JSON.stringify(args.parsedOptions)}`
  );

  // const setAuth =  async
  const setAuth = ({ argvNoOptions: args }: Arguments) => {
    debug("setAuth invoked");
    if (!args || args.length < 4) {
      throw new UsageError({ usage: setAuthUsage });
    } else {
      Store().setItem("id", args[2]);
      Store().setItem("pwd", args[3]);

      return "ok";
    }
  };

  registrar.listen("/set/auth", setAuth, {
    usage: setAuthUsage
  });

  registrar.listen("/get/auth", () => {
    const t: Table = {
      header: { name: "property", attributes: [{ value: "value" }] },
      body: [
        { name: "id", attributes: [{ value: `${Store().getItem("id")}` }] },
        {
          name: "password",
          attributes: [{ value: `${Store().getItem("pwd")}` }]
        }
      ]
    };

    return t;
  });

  registrar.listen(
    "/set/url",
    ({ argvNoOptions: args }: Arguments) => {
      if (!args || args.length < 3) {
        throw new UsageError({ usage: setUrlUsage });
      } else {
        Store().setItem("url", args[2]);

        return "ok";
      }
    },
    { usage: setUrlUsage }
  );

  registrar.listen("/get/url", () => {
    const t: Table = {
      header: { name: "property", attributes: [{ value: "value" }] },
      body: [
        { name: "url", attributes: [{ value: `${Store().getItem("url")}` }] }
      ]
    };

    return t;
  });

  registrar.listen("/get", ({ argvNoOptions: args }: Arguments) => {
    if (!args || args.length < 2) {
      throw new UsageError({ usage: getUsage });
    } else {
      const uri = args[1];
      const urlPrefix = Store().getItem("url-prefix");

      if (!urlPrefix) {
        return 'url prefix not set. use "set url-prefix"';
      }

      return unirest
        .get(`${urlPrefix}${uri}`)
        .headers({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        .auth(Store().getItem("id"), Store().getItem("pwd"))
        .send({ parameter: 23, foo: "bar" })
        .then((response: { body: any }) =>
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
  });
};
