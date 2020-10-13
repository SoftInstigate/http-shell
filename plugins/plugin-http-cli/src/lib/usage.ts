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

export const setHeaderUsage: UsageModel = {
  title: "set header <name> <value>",
  header: "sets the header url for restheart requests",
  example: "set header If-None-Match 5f7ef3816413c95851fcbcfe",
  detailedExample: [
    {
      command: "set url http://127.0.0.1:8080",
      docs: "sets the base url for RESTHEart running on localhost port 8080"
    }
  ],
  required: [
    { name: "name", docs: "the name of the header to set", file: false, positional: true },
    { name: "value", docs: "the value of the header", file: false, positional: true }
  ],
  parents: [{ command: "restheart" }]
};

export const getHeadersUsage: UsageModel = {
  title: "set headers",
  header: "prints the headers",
  example: "get headers",
  detailedExample: [
    {
      command: "get headers",
      docs: "prints the headers"
    }
  ],
  required: [
  ],
  parents: [{ command: "restheart" }]
};

export const resetHeadersUsage: UsageModel = {
  title: "reset headers",
  header: "clear the headers",
  example: "reset headers",
  detailedExample: [
    {
      command: "reset headers",
      docs: "clears the headers"
    }
  ],
  required: [
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

export const optionsUsage: UsageModel = {
  title: "options",
  header: "executes an OPTIONS request",
  example: "options <uri>",
  detailedExample: [
    {
      command: "options /coll",
      docs:
        'executes the request OPTIONS <base-url>+<uri>, where base url is set via the command "set url"'
    }
  ],
  required: [
    {
      name: "url",
      docs: "the URI of the resource to inquiry",
      file: false,
      positional: true
    }
  ],
  parents: [{ command: "restheart" }]
};

export const deleteUsage: UsageModel = {
  title: "delete",
  header: "executes a DELETE request",
  example: "delete <uri>",
  detailedExample: [
    {
      command: "delete /coll",
      docs:
        'executes the request DELETE <base-url>+<uri>, where base url is set via the command "set url"'
    }
  ],
  required: [
    {
      name: "url",
      docs: "the URI of the resource to DELETE",
      file: false,
      positional: true
    }
  ],
  parents: [{ command: "restheart" }]
};

export const postUsage: UsageModel = {
  title: "post",
  header: "executes a POST request",
  example: "get <uri> <file>",
  detailedExample: [
    {
      command: "post /coll data.json",
      docs:
        'executes the request POST <base-url>+<uri>, where base url is set via the command "set url" sending the content of the file data.json as the request body'
    }
  ],
  required: [
    {
      name: "url",
      docs: "the URI of the resource to POST",
      file: false,
      positional: true
    },
    {
      name: "file",
      docs: "the file containing the request body to POST",
      file: false,
      positional: true
    }
  ],
  parents: [{ command: "restheart" }]
};

export const putUsage: UsageModel = {
  title: "put",
  header: "executes a PUT request",
  example: "put <uri> <file>",
  detailedExample: [
    {
      command: "put /coll data.json",
      docs:
        'executes the request PUT <base-url>+<uri>, where base url is set via the command "set url" sending the content of the file data.json as the request body'
    }
  ],
  required: [
    {
      name: "url",
      docs: "the URI of the resource to PUT",
      file: false,
      positional: true
    },
    {
      name: "file",
      docs: "the file containing the request body to PUT",
      file: false,
      positional: true
    }
  ],
  parents: [{ command: "restheart" }]
};

export const patchUsage: UsageModel = {
  title: "patch",
  header: "executes a PATCH request",
  example: "patch <uri> <file>",
  detailedExample: [
    {
      command: "patch /coll/id data.json",
      docs:
        'executes the request PATCH <base-url>+<uri>(id), where base url is set via the command "set url" sending the content of the file data.json as the request body'
    }
  ],
  required: [
    {
      name: "url",
      docs: "the URI of the resource to PATCH",
      file: false,
      positional: true
    },
    {
      name: "file",
      docs: "the file containing the request body to PATCH",
      file: false,
      positional: true
    }
  ],
  parents: [{ command: "restheart" }]
};

/**
 * Usage model for the HTTP Cli plugin
 *
 */
export const toplevelUsage: UsageModel = {
  title: "HTTP Cli",
  header: "Commands to execute HTTP Cli requests",
  available: [
    { command: "set auth", docs: "sets the basic authentication credentials" },
    {
      command: "get auth",
      docs: "prints the basic authentication credentials"
    },
    { command: "set url", docs: "sets the base url" },
    { command: "get url", docs: "prints the base url" },
    { command: "get <uri>", docs: "executes the GET request to url=<base-url>+<uri>" },
    { command: "post <uri> <file>", docs: "executes the POST request to url=<base-url>+<uri>" }
  ]

  // children: { a: { route: '/set/auth', usage: setAuthUsage } }
};