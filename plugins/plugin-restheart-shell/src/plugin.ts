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
// import Debug from "debug";
import test from './lib/cmds/test';
import setauth from './lib/cmds/set-auth';
import seturl from './lib/cmds/set-url';
import geturl from './lib/cmds/get-url';
import getauth from './lib/cmds/get-auth';
import get from './lib/cmds/get';
import post from './lib/cmds/post';
import helprestheart from './lib/cmds/help-restheart';
import { toplevelUsage } from './lib/usage'

// const debug = Debug("plugins/restheart-shell");

export default async (registrar: Registrar) => {
  const usage  = { usage: toplevelUsage.available }

  Promise.all([
    helprestheart(registrar),
    test(registrar),
    setauth(registrar),
    seturl(registrar),
    geturl(registrar),
    getauth(registrar),
    get(registrar),
    post(registrar)
  ]);
};
