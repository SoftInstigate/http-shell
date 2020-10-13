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

import { Registrar } from '@kui-shell/core';
import setauth from './lib/cmds/set-auth';
import seturl from './lib/cmds/set-url';
import geturl from './lib/cmds/get-url';
import getauth from './lib/cmds/get-auth';
import get from './lib/cmds/get';
import post from './lib/cmds/post';
import put from './lib/cmds/put';
import patch from './lib/cmds/patch';
import del from './lib/cmds/delete';
import options from './lib/cmds/options';
import setheader from './lib/cmds/set-header';
import getheaders from './lib/cmds/get-headers';
import helpshell from './lib/cmds/help-http-shell';
import resetheaders from './lib/cmds/reset-headers';
import resetauth from './lib/cmds/reset-auth';
import { toplevelUsage } from './lib/usage'

// import Debug from "debug";

// const debug = Debug("plugins/plugin-http-shell");

export default async (registrar: Registrar) => {
  const usage  = { usage: toplevelUsage.available }

  await Promise.all([
    helpshell(registrar),
    setauth(registrar),
    resetauth(registrar),
    getauth(registrar),
    seturl(registrar),
    geturl(registrar),
    get(registrar),
    post(registrar),
    put(registrar),
    patch(registrar),
    del(registrar),
    options(registrar),
    setheader(registrar),
    getheaders(registrar),
    resetheaders(registrar),
  ]);
};
