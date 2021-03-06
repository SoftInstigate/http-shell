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

import { Registrar, Store, Table } from "@kui-shell/core";
// import Debug from "debug";

// const debug = Debug("plugins/plugin-http-shell/get-auth");

const getHeadersCmd = async () => {
  let _headers = Store().getItem("headers");

  if (!_headers) {
    _headers = "[]";
  }

  const headers = JSON.parse(_headers);

  const t: Table = {
    header: { name: "header", attributes: [{ value: "value" }] },
    body: [],
  };

  for(var i = 0; i < headers.length; i++) {
    t.body.push({name: headers[i]['k'], attributes: [{ value: headers[i]['v'] }]})
  }

  return t;
};

export default async (registrar: Registrar) => {
  registrar.listen("/h/get/headers", getHeadersCmd, {
    noAuthOk: true,
  });
};
