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

import { Registrar, Arguments, MultiModalResponse } from "@kui-shell/core";
import { putUsage as usage } from "../usage";

import { put } from "superagent";
import { url, urlFile } from "./requests";

const putCmd = async (
  args: Arguments
): Promise<MultiModalResponse | string> => {
  return args.argvNoOptions.length == 2
    ? url(args, put, usage)
    : urlFile(args, put, usage);
};

export default async (registrar: Registrar) => {
  registrar.listen("/h/put", putCmd, {
    usage: usage,
    noAuthOk: true,
  });
};
