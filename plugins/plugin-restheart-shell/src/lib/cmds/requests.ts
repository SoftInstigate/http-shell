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
  Store,
  UsageError,
  MultiModalResponse,
  UsageModel,
} from "@kui-shell/core";

import { Response, ResponseError, SuperAgentRequest } from "superagent";
import { readFileSync } from "fs";

import Debug from "debug";

const debug = Debug("plugins/restheart-shell/write");

interface WriteRequest {
  (url: string): SuperAgentRequest;
}

export async function urlFile(
  { argvNoOptions: args }: Arguments,
  req: WriteRequest,
  usage: UsageModel
): Promise<MultiModalResponse | string> {
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

    const _headers = JSON.parse(
      Store().getItem("headers") ? Store().getItem("headers") : "[]"
    );

    const headers = {};

    for (var i = 0; i < _headers.length; i++) {
      headers[_headers[i]["k"]] = _headers[i]["v"];
    }

    return req(url)
      .accept("application/json")
      .set("Content-Type", "application/json")
      .set(headers)
      .auth(Store().getItem("id"), Store().getItem("pwd"))
      .send(body)
      .then((res: Response) => {
        const method = res["req"]
          ? res["req"]["method"]
            ? res["req"]["method"]
            : ""
          : "";

        // debug(res);
        const ret: MultiModalResponse = {
          metadata: { name: `🐱 ${method} ${url}` },
          kind: "Response",
          modes: [
            {
              mode: "Status",
              content: `Status: ${res.status}\n\nStatus Text: ${res["statusText"]}`,
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
          content: res.headers ? JSON.stringify(res.headers, null, 2) : "",
          contentType: "json",
        });

        return ret;
      })
      .catch((error: ResponseError) => {
        const method = error.response ? error.response["req"]
          ? error.response["req"]["method"]
            ? error.response["req"]["method"]
            : '' : '' : '';

        const ret: MultiModalResponse = {
          metadata: { name: `🔥 ${method} ${url}` },
          kind: "Error",
          modes: [
            {
              mode: "Status",
              content: `Status: ${error.status ? error.status : -1 }\n\nStatus Text: ${error.response? error.response['statusText']: 'Connection refused'}`,
              contentType: "text/markdown",
            },
          ],
        };

        if (error['body']) {
          ret.modes.push({
            mode: "Response body",
            content: JSON.stringify(error['body'], null, 2),
            contentType: "json",
          });
        }

        if (error.response && error.response.headers) {
          ret.modes.push({
            mode: "Headers",
            content: JSON.stringify(error.response.headers, null, 2),
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
}

export async function url(
  { argvNoOptions: args }: Arguments,
  req: WriteRequest,
  usage: UsageModel
): Promise<MultiModalResponse | string> {
  if (!args || args.length < 2) {
    throw new UsageError({ usage: usage });
  } else {
    const uri = args[1];
    const urlPrefix = Store().getItem("url");

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

    const _headers = JSON.parse(
      Store().getItem("headers") ? Store().getItem("headers") : "[]"
    );
    const headers = {};

    for (var i = 0; i < _headers.length; i++) {
      headers[_headers[i]["k"]] = _headers[i]["v"];
    }

    return req(url)
      .accept("application/json")
      .set("Content-Type", "application/json")
      .set(headers)
      .auth(Store().getItem("id"), Store().getItem("pwd"))
      .then((res: Response) => {
        // debug(res);

        const method = res["req"]
          ? res["req"]["method"]
            ? res["req"]["method"]
            : ""
          : "";

        const ret: MultiModalResponse = {
          metadata: { name: `🐱 ${method} ${url}` },
          modes: [],
          kind: "Response",
        };

        if (res.body) {
          ret.modes.push({
            mode: "Body",
            content: JSON.stringify(res.body, null, 2),
            contentType: "json",
          });
        }

        ret.modes.push(
          {
            mode: "Status",
            content: `Status: ${res.status}\n\nStatus Text: ${res["statusText"]}`,
            contentType: "text/markdown",
          },
          {
            mode: "Headers",
            content: res.headers ? JSON.stringify(res.headers, null, 2) : "",
            contentType: "json",
          }
        );

        return ret;
      })
      .catch((error: ResponseError) => {
        debug(JSON.stringify(error));

        const method = error.response
          ? error.response["req"]
            ? error.response["req"]["method"]
              ? error.response["req"]["method"]
              : ""
            : ""
          : "";

        const ret: MultiModalResponse = {
          metadata: { name: `🔥 ${method} ${url}` },
          kind: "Error",
          modes: [
            {
              mode: "Status",
              content: `Status: ${error.status ? error.status: -1 }\n\nStatus Text: ${error.response ? error.response["statusText"]: 'Connection Refused'}`,
              contentType: "text/markdown",
            },
          ],
        };

        if (error.response && error.response.body) {
          ret.modes.push({
            mode: "Response body",
            content: JSON.stringify(error.response.body, null, 2),
            contentType: "json",
          });
        }

        if (error.response && error.response.headers) {
          ret.modes.push({
            mode: "Headers",
            content: JSON.stringify(error.response.headers, null, 2),
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
}
