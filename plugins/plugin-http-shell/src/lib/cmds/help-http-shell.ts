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
​
 import { Registrar, NavResponse } from "@kui-shell/core";
 import { toplevelUsage as usage } from '../usage'
// import Debug from "debug";

// const debug = Debug("plugins/plugin-http-shell/test");
​
const resp: NavResponse = {
  apiVersion: 'kui-shell/v1',
  kind: 'NavResponse',
  breadcrumbs: [{ label: "Help" }, { label: "HTTP Shell" }],
  menus: [
      {
        label: "Available commands",
        items: [
          { mode: 'Authentication',
            contentType: "text/markdown",
            content: `
#### set auth
Opens a dialog to sets the basic authentication credentials to use in further requests
​
#### reset auth
Clear the basic authentication credentials
`
          },
          { mode: 'Configuration',
            contentType: "text/markdown",
            content: `
#### set url <url>
Sets the base url to use in further requests. If <url> does not include the protocol, http is assumed. If <url> only specifies the port (e.g. :8080), localhost is assumed
> e.g. [\`h set url http://127.0.0.1:8080\`](#kuiexec?command=h%20set%20url%20http%3A%2F%2F127.0.0.1%3A8080)
​
#### [get url](#kuiexec?command=h%20get%20url)
Prints the base url
​
#### edit <file>
Opens <file> for editing. Tip, hit key F1 for list of editor commands
> e.g. [\`edit body.json\`](#kuiexec?command=edit%20body.json)
`
          },
          { mode: 'Access Methods',
            contentType: "text/markdown",
            content: `
#### get <uri>
Executes the GET request to url=<base-url>+<uri>
> e.g. \`h get /messages\`
​
#### post <uri> <file>
Executes the request POST <base-url>+<uri>, sending the content of <file> as the request body
> e.g. [\`h post /messages msg.json\`](#kuiexec?command=h%20post%20%2Fmessages%20msg.json)
​
#### put <uri> <file>
Executes the request PUT <base-url>+<uri>, sending the content of <file> as the request body
> e.g. [\`h put /messages/foo msg.json\`](#kuiexec?command=h%20put%20%2Fmessages%2Ffoo%20msg.json)
​
#### patch <uri> <file>
Executes the request PATCH <base-url>+<uri>, sending the content of <file> as the request body
> e.g. [\`h patch /messages msg.json\`](#kuiexec?command=h%20patch%20%2Fmessages%20msg.json)

#### delete <uri>
Executes the DELETE request to url=<base-url>+<uri>
​
#### set header <name> <value>
Set the header <name> to <value>
> e.g. \`h set header Authorization "Bearer 5f7f35efcb800f2502f95cb5"\`
​
#### [get headers](#kuiexec?command=h%20get%20headers)
Prints the current set headers
​
#### [clear headers](#kuiexec?command=h%20reset%20headers)
Clears the headers
`
          }
        ]
      }
    ]
  };

export default async (registrar: Registrar) => {
  registrar.listen("/help/http-shell", () => resp, { usage: usage });
};
