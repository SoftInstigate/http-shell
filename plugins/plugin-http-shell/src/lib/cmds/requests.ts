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
import { errorMsg } from '../usage'
const { BrowserWindow } = require("electron");

import Debug from "debug";

const debug = Debug("plugins/plugin-http-shell/requests");

interface UrlRequest {
  (url: string): SuperAgentRequest;
  (url: string): SuperAgentRequest;
}

export async function urlFile(
  { argvNoOptions: args }: Arguments,
  req: UrlRequest,
  usage: UsageModel
): Promise<MultiModalResponse | string> {
  if (!args || args.length < 3) {
    const error = new UsageError({ message: errorMsg(usage), usage: usage });
    debug('error', error);

    throw error;
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

    if (!headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    if (!headers["Accept"]) {
      headers["Accept"] = "application/json";
    }

    const _req = req(url);

    if (Store().getItem("id") && Store().getItem("pwd")) {
      _req.auth(Store().getItem("id"), Store().getItem("pwd"));
    }

    return _req
      .set(headers)
      .send(body)
      .on("error", (err) => {
        debug("error", err);
      })
      .then((res: Response) => {
        const method = res["req"]
          ? res["req"]["method"]
            ? res["req"]["method"]
            : ""
          : "";

        //debug(res);

        const ret: MultiModalResponse = {
          metadata: { name: `🐱 ${method} ${url}` },
          kind: "Response",
          modes: [
            {
              mode: "Status",
              content: `Status: ${res.status}\n\nStatus Text: ${res['statusText']}`,
              contentType: "text/markdown",
            },
          ],
        };

        const _ct = res.headers['Content-Type']
          ? res.headers['Content-Type']
          : res.headers['content-type']
            ? res.headers['content-type']
            : 'json';

        const ct = _ct === 'application/json' || _ct === 'application/hal+json' ? 'json' : _ct;

        if (res.text) {
          ret.modes.push({
            mode: "Body",
            content: ct === 'json' ? JSON.stringify(res.body, null, 2) : res.text,
            contentType: ct
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
        const win = new BrowserWindow();
        win.webContents.openDevTools();

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
          modes: [],
        };

        if (error.status) {
          ret.modes.push({
            mode: "Status",
            content: `Status: ${error.status}\n\nStatus Text: ${error.response ? error.response['statusText'] : ''}`,
            contentType: "text/markdown",
          });
        } else {
          ret.modes.push({
            mode: "Status",
            content:
              "Connection refused\n\n" +
              "Possible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the server HTTPS certificate is invalid, etc.\n\n" +
              "More information could be in the console log (for Mac `Options+Command+I`, other OS: `Ctrl+Alt+I`)",
            contentType: "text/markdown",
          });
        }

        if (error["body"]) {
          ret.modes.push({
            mode: "Response body",
            content: JSON.stringify(error["body"], null, 2),
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
  req: UrlRequest,
  usage: UsageModel
): Promise<MultiModalResponse | string> {
  if (!args || args.length < 2) {
    throw new UsageError({ message: errorMsg(usage), usage: usage });
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

    if (!headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    if (!headers["Accept"]) {
      headers["Accept"] = "application/json";
    }

    const _req = req(url);

    if (Store().getItem("id") && Store().getItem("pwd")) {
      _req.auth(Store().getItem("id"), Store().getItem("pwd"));
    }

    return _req
      .set(headers)
      .on("error", (err) => {
        debug("error", err);
      })
      .then((res: Response) => {
        debug(res);

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

        const _ct = res.headers['Content-Type']
          ? res.headers['Content-Type']
          : res.headers['content-type']
            ? res.headers['content-type']
            : 'json';

            const ct = _ct === 'application/json' || _ct === 'application/hal+json' ? 'json' : _ct;

        if (res.text) {
          ret.modes.push({
            mode: "Body",
            content: ct === 'json' ? JSON.stringify(res.body, null, 2) : res.text,
            contentType: ct
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
          modes: [],
        };

        if (error.status) {
          ret.modes.push({
            mode: "Status",
            content: `Status: ${error.status}\n\nStatus Text: ${error.response ? error.response['statusText'] : ''}`,
            contentType: "text/markdown",
          });
        } else {
          ret.modes.push({
            mode: "Status",
            content:
              "Connection refused\n\n" +
              "Possible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the server HTTPS certificate is invalid, etc.\n\n" +
              "More information could be in the console log (for Mac `Options+Command+I`, other OS: `Ctrl+Alt+I`)",
            contentType: "text/markdown",
          });
        }

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
