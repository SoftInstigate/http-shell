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
  title: "h set url <url>",
  header: "sets the base-url for requests",
  example: "h set url http://127.0.0.1:8080",
  detailedExample: [
    {
      command: "h set url https://example.com",
      docs: "sets the base-url to https://example.com"
    },
    {
      command: "h set url 127.0.0.1:8080",
      docs: "sets the base-url to http://127.0.0.1:8080"
    },
    {
      command: "h set url :8080",
      docs: "sets the base-url to http://127.0.0.1:8080"
    }
  ],
  required: [
    { name: "url", docs: "the base-url to use in further requests", file: false, positional: true }
  ]
};

export const setHeaderUsage: UsageModel = {
  title: "h set header <name> <value>",
  header: "sets the header for requests",
  example: "h set header Content-Type application/json",
  detailedExample: [
    {
      command: "h set header Content-Type application/json",
      docs: "sets the Content-Type request header"
    }
  ],
  required: [
    { name: "name", docs: "the name of the header to set", file: false, positional: true },
    { name: "value", docs: "the value of the header", file: false, positional: true }
  ]
};

export const getHeadersUsage: UsageModel = {
  title: "h get headers",
  header: "prints the headers",
  example: "h get headers",
  detailedExample: [
    {
      command: "h get headers",
      docs: "prints the headers"
    }
  ],
  required: [
  ]
};

export const resetHeadersUsage: UsageModel = {
  title: 'h reset headers',
  header: 'cleart all the headers that were previously setset via command "set header"',
  example: 'h reset headers',
  detailedExample: [
    {
      command: 'h reset headers',
      docs: 'cleart all the headers that were previously setset via command "set header"'
    }
  ],
  required: [
  ]
};

export const getUsage: UsageModel = {
  title: "h get <uri>",
  header: "executes a GET request",
  example: "h get messages",
  detailedExample: [
    {
      command: "h get messages",
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
  title: "h options <uri>",
  header: "executes an OPTIONS request",
  example: "h options messages",
  detailedExample: [
    {
      command: "h options messages",
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
  title: "h delete <uri>",
  header: "executes a DELETE request",
  example: "h delete messages",
  detailedExample: [
    {
      command: "h delete messages",
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
  title: "h post <uri> <file>",
  header: "executes a POST request",
  example: "h post messages newMessage.json",
  detailedExample: [
    {
      command: "h post /coll data.json",
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
  title: "h put <uri> <file>",
  header: "executes a PUT request",
  example: "h put messages/id message.json",
  detailedExample: [
    {
      command: "h put messages/id message.json",
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
  title: "h patch <uri> <file>",
  header: "executes a PATCH request",
  example: "h patch messages/id message.json",
  detailedExample: [
    {
      command: "h patch messages/id message.json",
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
    { command: "h set auth", docs: "sets the basic authentication credentials" },
    { command: "h set url", docs: "sets the base-url" },
    { command: "h get url", docs: "prints the base-url" },
    { command: "h get <uri>", docs: "executes the GET request to url=<base-url>+<uri>" },
    { command: "h post <uri> <file>", docs: "executes the POST request to url=<base-url>+<uri>" }
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