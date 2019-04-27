import React, { RefObject, createRef } from "react";
import { CONTEXT } from "zoid/dist/zoid";

import LoginWithAzimuth from "./LoginWithAzimuth";

export class LoginButton extends React.Component<any> {
  ref: RefObject<HTMLDivElement>;
  parent: any;

  constructor(props) {
    super(props);

    this.ref = createRef<HTMLDivElement>();
  }

  componentDidMount() {
    this.parent = LoginWithAzimuth(this.props);
    this.parent.render(this.ref.current, CONTEXT.POPUP);
  }

  componentWillUpdate(nextProps) {
    this.parent.updateProps(nextProps);
  }

  render() {
    return <div ref={this.ref} />;
  }
}
