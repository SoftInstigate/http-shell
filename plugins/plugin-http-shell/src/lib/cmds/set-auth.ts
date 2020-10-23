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

import { Registrar, Store } from "@kui-shell/core";
import { setAuthUsage as usage } from "../usage";
import { default as PasswordForm } from '../../view/PasswordForm'
import emitter from '../utils/Emitter';
import Debug from "debug";
const debug = Debug("plugins/plugin-http-shell/set-auth");

const setAuth = () => {
  return { react: PasswordForm({  cid: Store().getItem("id"),
                                  cpwd: Store().getItem("id"),
                                  id: e => { Store().setItem("id", e); emitter.emit('/current/id/change', e); } ,
                                  pwd: e => Store().setItem("pwd", e)  }) }
};


export default async (registrar: Registrar) => {
  registrar.listen("/h/set/auth", setAuth, {
    usage,
    noAuthOk: true
  });
};
