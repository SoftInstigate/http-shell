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

import * as React from "react";
import { Form, FormGroup, TextInput, ToastNotification } from 'carbon-components-react';
import Debug from "debug";
const debug = Debug("plugins/plugin-http-shell/password-form");

interface Props {
  cid: string;
  cpwd: string;

  id: Function;
  pwd: Function;
}

export default function PasswordComponentSpi(props: Props): React.ReactElement {
    return <PasswordComponent { ...props } />
}

class PasswordComponent extends React.PureComponent<Props> {
  public render() {
    return (
      <ToastNotification caption="" title="Set basic auth" kind="info" >
        <Form>
          <FormGroup key="" legendText="">
            <TextInput
                id="id"
                labelText="id"
                defaultValue={this.props.cid}
                onChange={e => this.props.id(e.target.value) }
                required
            />
            <TextInput
                id="pwd"
                labelText="password"
                type="password"
                defaultValue={this.props.cpwd}
                onChange={e => this.props.pwd(e.target.value) }
                required
            />
          </FormGroup>
        </Form>
      </ToastNotification>
    )
  }
}