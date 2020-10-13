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
  Registrar,
  Arguments,
  MultiModalResponse,
} from "@kui-shell/core";
import { postUsage as usage } from "../usage";

import { post } from "superagent";
import { urlFile } from './requests';

const postCmd = async (args: Arguments): Promise<MultiModalResponse | string> => {
    return urlFile(args, post, usage);
};

export default async (registrar: Registrar) => {
  registrar.listen("/post", postCmd, {
    usage: usage,
    noAuthOk: true,
  });
};
