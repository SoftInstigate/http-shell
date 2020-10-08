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
  MultiModalResponse,
  userDataDir,
} from "@kui-shell/core";
import { postUsage as usage } from "../usage";

import { post, Response } from "superagent";
import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

const userData = join(userDataDir(), "restheart-shell-local-storage.json");

import Debug from "debug";

const debug = Debug("plugins/restheart-shell/post");

const postCmd = async ({
  argvNoOptions: args,
  REPL,
}: Arguments): Promise<MultiModalResponse | string> => {
  if (!args || args.length < 3) {
    throw new UsageError({ usage: usage });
  } else {
    const uri = args[1];
    const urlPrefix = Store().getItem("url");

    const file = args[2];

    if (!urlPrefix) {
      return 'url not set. use "set url"';
    }

    const uriSlashPrefixed = uri.length > 0 && uri[0] === "/";
    const urlTrailingSlash = urlPrefix[urlPrefix.length - 1] === "/";

    const url =
      uriSlashPrefixed && urlTrailingSlash
        ? `${urlPrefix.substring(urlPrefix.length - 1)}${uri}`
        : !uriSlashPrefixed && !urlTrailingSlash
        ? `${urlPrefix}/${uri}`
        : `${urlPrefix}${uri}`;

    let body = readFileSync(file).toString();

    return post(url)
      .accept("application/json")
      .set("Content-Type", "application/json")
      .auth(Store().getItem("id"), Store().getItem("pwd"))
      .send(body)
      .then((res: Response) => {
        debug(res);
        const ret: MultiModalResponse = {
            metadata: { name: `🐱 POST ${url}` },
            kind: "Response",
            modes: [
              {
                mode: "Status",
                content: `Status: ${res.status}\n\nStatus Text: ${res['statusText']}`,
                contentType: "text/markdown",
              },
            ],
          };

          if (res.body) {
            ret.modes.push({
                mode: "Body",
                content: JSON.stringify(res.body, null, 2),
                contentType: "json",
              });
          }

          ret.modes.push({
            mode: "Headers",
            content: res.headers ? JSON.stringify(res.headers, null, 2): '',
            contentType: "json",
          });

          return ret;
      })
      .catch((error) => {
        const ret: MultiModalResponse = {
          metadata: { name: `🐱 GET ${urlPrefix}${uri}` },
          kind: "Error",
          modes: [
            {
              mode: "Status",
              content: `Status: ${error.status}\n\nStatus Text: ${error.response.statusText}`,
              contentType: "text/markdown",
            },
          ],
        };

        if (error.body) {
          ret.modes.push({
            mode: "Response body",
            content: error.body ? JSON.stringify(error.body, null, 2) : "",
            contentType: "json",
          });
        }

        ret.modes.push({
          mode: "Details",
          content: JSON.stringify(error, null, 2),
          contentType: "json",
        });

        return ret;
      });
  }
};

export default async (registrar: Registrar) => {
  registrar.listen("/post", postCmd, {
    usage: usage,
    noAuthOk: true,
  });
};
