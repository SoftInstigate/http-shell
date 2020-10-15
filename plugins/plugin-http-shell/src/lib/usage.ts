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
  header: "opens a dialog to sets the basic authentication credentials to use in further requests",
  example: "set auth",
  detailedExample: [
    {
      command: "set auth",
      docs: 'opens a dialog to sets the basic authentication credentials to use in further requests'
    }
  ]
  // optional: []
};

export const setUrlUsage: UsageModel = {
  title: "set url <url>",
  header: "sets the base-url for requests",
  example: "set url http://127.0.0.1:8080",
  detailedExample: [
    {
      command: "set url http://127.0.0.1:8080",
      docs: "sets the base-url as on localhost port 8080"
    }
  ],
  required: [
    { name: "url", docs: "the URL of API endpoint", file: false, positional: true }
  ]
};

export const setHeaderUsage: UsageModel = {
  title: "set header <name> <value>",
  header: "sets the header for requests",
  example: "set header Content-Type application/json",
  detailedExample: [
    {
      command: "set header Content-Type application/json",
      docs: "sets the Content-Type request header"
    }
  ],
  required: [
    { name: "name", docs: "the name of the header to set", file: false, positional: true },
    { name: "value", docs: "the value of the header", file: false, positional: true }
  ]
};

export const getHeadersUsage: UsageModel = {
  title: "get headers",
  header: "prints the headers",
  example: "get headers",
  detailedExample: [
    {
      command: "get headers",
      docs: "prints the headers"
    }
  ],
  required: [
  ]
};

export const resetHeadersUsage: UsageModel = {
  title: 'reset headers',
  header: 'cleart all the headers that were previously setset via command "set header"',
  example: 'reset headers',
  detailedExample: [
    {
      command: 'reset headers',
      docs: 'cleart all the headers that were previously setset via command "set header"'
    }
  ],
  required: [
  ]
};

export const getUsage: UsageModel = {
  title: "get <uri>",
  header: "executes a GET request",
  example: "get messages",
  detailedExample: [
    {
      command: "get messages",
      docs:
        'executes the request GET <base-url>/messages, where base-url is set via the command "set url"'
    }
  ],
  required: [
    {
      name: "url",
      docs: "the URI of the resource to get",
      file: false,
      positional: true
    }
  ]
};

export const optionsUsage: UsageModel = {
  title: "options <uri>",
  header: "executes an OPTIONS request",
  example: "options messages",
  detailedExample: [
    {
      command: "options messages",
      docs:
        'executes the request OPTIONS <base-url>/messages, where base-url is set via the command "set url"'
    }
  ],
  required: [
    {
      name: "url",
      docs: "the URI of the resource to inquiry",
      file: false,
      positional: true
    }
  ]
};

export const deleteUsage: UsageModel = {
  title: "delete <uri>",
  header: "executes a DELETE request",
  example: "delete messages",
  detailedExample: [
    {
      command: "delete messages",
      docs:
        'executes the request DELETE <base-url>/messages, where base-url is set via the command "set url"'
    }
  ],
  required: [
    {
      name: "url",
      docs: "the URI of the resource to DELETE",
      file: false,
      positional: true
    }
  ]
};

export const postUsage: UsageModel = {
  title: "post <uri> <file>",
  header: "executes a POST request",
  example: "get messages newMessage.json",
  detailedExample: [
    {
      command: "post /coll data.json",
      docs:
        'executes the request POST <base-url>/messages, where base-url is set via the command "set url" sending the content of the file newMessage.json as the request body'
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
  ]
};

export const putUsage: UsageModel = {
  title: "put <uri> <file>",
  header: "executes a PUT request",
  example: "put messages/id message.json",
  detailedExample: [
    {
      command: "put messages/id message.json",
      docs:
        'executes the request PUT <base-url>/messages/id, where base-url is set via the command "set url" sending the content of the file message.json as the request body'
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
  ]
};

export const patchUsage: UsageModel = {
  title: "patch <uri> <file>",
  header: "executes a PATCH request",
  example: "patch messages/id message.json",
  detailedExample: [
    {
      command: "patch messages/id message.json",
      docs:
        'executes the request PATCH <base-url>/messages/id, where base-url is set via the command "set url" sending the content of the file message.json as the request body'
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
  ]
};

/**
 * Usage model for the HTTP Shell plugin
 *
 */
export const toplevelUsage: UsageModel = {
  title: "HTTP Shell",
  header: "Commands to execute HTTP Shell requests",
  available: [
    { command: "set auth", docs: "sets the basic authentication credentials" },
    { command: "set url", docs: "sets the base-url" },
    { command: "get url", docs: "prints the base-url" },
    { command: "get <uri>", docs: "executes the GET request to url=<base-url>+<uri>" },
    { command: "post <uri> <file>", docs: "executes the POST request to url=<base-url>+<uri>" }
  ]

  // children: { a: { route: '/set/auth', usage: setAuthUsage } }
};

export function errorMsg(model: UsageModel): string {
    return `      ${model.header}
      usage: ${model.title}
      example:
      > ${model.detailedExample[0].command}
      ${model.detailedExample[0].docs}`
}