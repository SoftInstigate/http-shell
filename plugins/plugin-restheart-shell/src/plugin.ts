/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { Registrar, MultiModalResponse, Store } from "@kui-shell/core";

const unirest = require("unirest");

export default async (kui: Registrar) => {
  kui.listen(
    "/test",
    (req: {
      argv: any;
      argvNoOptions: any;
      command: any;
      parsedOptions: any;
    }) => `argv ${req.argv}
argvNoOptions ${req.argvNoOptions}
command ${req.command}
parsedOptions ${JSON.stringify(req.parsedOptions)}`
  );

  kui.listen("/signin", (req: { argvNoOptions: string | any }) => {
    if (!req.argvNoOptions || req.argvNoOptions.length < 3) {
      return "usage: login id pwd";
    } else {
      Store().setItem("id", req.argvNoOptions[1]);
      Store().setItem("pwd", req.argvNoOptions[2]);

      return `credentials set`;
    }
  });

  kui.listen("/set/url-prefix", (req: { argvNoOptions: string | any }) => {
    if (!req.argvNoOptions || req.argvNoOptions.length < 3) {
      return "usage: set url-prefix <url>";
    } else {
      Store().setItem("url-prefix", req.argvNoOptions[2]);

      return `url prefix set as ${req.argvNoOptions[2]}`;
    }
  });

  kui.listen("/get", (req: { argvNoOptions: string | any }) => {
    if (!req.argvNoOptions || req.argvNoOptions.length < 2) {
      return "usage: get <uri>";
    } else {
      const uri = req.argvNoOptions[1];
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
            metadata: { name: "🐱" },
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
