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
import {
  Store,
  wireToStandardEvents,
  unwireToStandardEvents
} from "@kui-shell/core";
import { TextWithIconWidget } from "@kui-shell/plugin-client-common";
import { Icons } from "@kui-shell/plugin-client-common"
import Debug from "debug";
import emitter from '../lib/utils/Emitter';
const debug = Debug("plugins/plugin-http-shell/basic-auth-widget");

interface Props {
}

interface State {
  id: string
}

export default class BasicAuthenticationWidget extends React.PureComponent<Props, State> {
  private readonly handler = this.currentId.bind(this);

  public constructor(props: Props) {
    super(props);

    this.state = {
      id: Store().getItem("id") ? Store().getItem("id") : "not set"
    };
  }

  /**
   * Check the current basic auth id
   *
   */
  private async currentId() {
    this.setState({
      id: Store().getItem("id") ? Store().getItem("id") : "not set"
    });
  }

  /**
   * Once we have mounted, we immediately check the state,
   * and schedule an update based on standard REPL events.
   *
   */
  public componentDidMount() {
    emitter.on('/current/id/change', (e) => this.currentId());
    this.handler();
    //wireToStandardEvents(this.handler);
  }

  /** Make sure to unsubscribe! */
  public componentWillUnmount() {
    emitter.off('/current/id/change');
    //unwireToStandardEvents(this.handler);
  }

  public render() {
    return (
      <TextWithIconWidget
        text={this.state.id}
        viewLevel="normal"
        id="kui--plugin-http-shell--current-id-widget"
        title={'Basic Authentication'}
        textOnclick="set auth"
        iconOnclick="set auth"
      >
        <Icons icon="At" />
      </TextWithIconWidget>
    );
  }
}
