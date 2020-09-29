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
  // unwireToStandardEvents
} from "@kui-shell/core";
import { TextWithIconWidget } from "@kui-shell/plugin-client-common";
import { Icons } from "@kui-shell/plugin-client-common"

interface Props {
  className?: string;
}

interface State {
  url: string
}

export default class CurrentUrlWidget extends React.PureComponent<Props, State> {
  private readonly handler = this.reportCurrentUrl.bind(this);

  public constructor(props: Props) {
    super(props);

    this.state = {
      url: Store().getItem("url") ? Store().getItem("url") : "no URL set"
    };
  }

  /**
   * Check the current working directory
   *
   */
  private async reportCurrentUrl() {
    this.setState({
      url: Store().getItem("url") ? Store().getItem("url") : "no URL set"
    });
  }

  /**
   * Once we have mounted, we immediately check the state,
   * and schedule an update based on standard REPL events.
   *
   */
  public componentDidMount() {
    this.handler();
    wireToStandardEvents(this.handler);
  }

  /** Make sure to unsubscribe! */
  public componentWillUnmount() {
    // unwireToStandardEvents(this.handler);
  }

  public render() {
    return (
      <TextWithIconWidget
        className={this.props.className}
        text={this.state.url}
        viewLevel="normal"
        id="kui--plugin-restheart-shell--current-url-widget"
        title={'The current RESTHeart base URL'}
        textOnclick="get url"
        iconOnclick="get url"
      >
        <Icons icon="Server" />
      </TextWithIconWidget>
    );
  }
}
