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

import { UsageModel } from "@kui-shell/core";

export const setAuthUsage: UsageModel = {
  title: "set auth",
  header: "sets the basic authentication credentials",
  example: "set auth <id> <password>",
  detailedExample: [
    {
      command: "set auth admin secret",
      docs: 'sets the default credentials for restheart user "admin"'
    }
  ],
  required: [
    { name: "id", docs: "the client id", file: false, positional: true },
    {
      name: "pwd",
      docs: "the client password",
      file: false,
      positional: true
    }
  ],
  // optional: []
  parents: [{ command: "restheart" }]
};

export const setUrlUsage: UsageModel = {
  title: "set url",
  header: "sets the base url for restheart requests",
  example: "set url <url>",
  detailedExample: [
    {
      command: "set url http://127.0.0.1:8080",
      docs: "sets the base url for RESTHEart running on localhost port 8080"
    }
  ],
  required: [
    { name: "url", docs: "the URL of RESTHeart", file: false, positional: true }
  ],
  parents: [{ command: "restheart" }]
};

export const getUsage: UsageModel = {
  title: "get",
  header: "executes a GET request",
  example: "get <uri>",
  detailedExample: [
    {
      command: "get /coll",
      docs:
        'executes the request GET <base-url>+<uri>, where base url is set via the command "set url"'
    }
  ],
  required: [
    {
      name: "url",
      docs: "the URI of the resource to get",
      file: false,
      positional: true
    }
  ],
  parents: [{ command: "restheart" }]
};

/**
 * Usage model for the restheart shell plugin
 *
 */
export const toplevelUsage: UsageModel = {
  title: "restheart",
  header: "Commands to execute RESTHeart API requests",
  available: [
    { command: "set auth", docs: "sets the basic authentication credentials" },
    {
      command: "get auth",
      docs: "prints the basic authentication credentials"
    },
    { command: "set url", docs: "sets the base url" },
    { command: "get url", docs: "prints the base url" },
    { command: "get", docs: "executes the GET request to url=<base-url>+<uri>" }
  ]

  // children: { a: { route: '/set/auth', usage: setAuthUsage } }
};
