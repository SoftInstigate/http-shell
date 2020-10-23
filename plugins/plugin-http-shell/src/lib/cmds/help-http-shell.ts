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

 import { Registrar, MultiModalResponse } from "@kui-shell/core";
 import { toplevelUsage as usage } from '../usage'
// import Debug from "debug";

// const debug = Debug("plugins/plugin-http-shell/test");

const resp: MultiModalResponse = {
    metadata: { name: "HTTP Shell Help" },
    kind: "Top",
    modes: [
      {
        mode: "Available commands",
        content: `
| command | description | example
|---|---|---|
| h set auth | opens a dialog to sets the basic authentication credentials to use in further requests | > h set auth |
| h reset auth | clear the basic authentication credentials | > h reset auth |
| h set url <url> | sets the base url to use in further requests, if <url> does not include the protocol, http is assumed, if <url> only specifies the port (e.g. :8080), localhost is assumed | > h set url http://127.0.0.1:8080 |
| h get url | prints the base url | > h get url |
| h get <uri> | executes the GET request to url=<base-url>+<uri> | > h get /messages |
| edit <file> | opens <file> for editing. Tip, hit key F1 for list of editor commands | > edit body.json |
| h post <uri> <file> | executes the request POST <base-url>+<uri>, sending the content of <file> as the request body | > h post /messages msg.json |
| h put <uri> <file> | executes the request PUT <base-url>+<uri>, sending the content of <file> as the request body | > h put /messages/foo msg.json |
| h patch <uri> <file> | executes the request PATCH <base-url>+<uri>, sending the content of <file> as the request body | > h patch /messages msg.json |
| h delete <uri> | executes the DELETE request to url=<base-url>+<uri> | > h delete /messages |
| h set header <name> <value> | set the header <name> to <value> | > h set header Authorization "Bearer 5f7f35efcb800f2502f95cb5" |
| h get headers | prints the current set headers | > h get headers |
| h reset headers | clears the headers | > h reset headers |
`,
        contentType: "text/markdown"
      }
    ]
  };

export default async (registrar: Registrar) => {
  registrar.listen("/help/http-shell", () => resp, { usage: usage });
};
