import * as React from "react";
import * as brc from "../src";
import { getBackgroundUrl } from "../src/Image";
import OriginalStyleGuideRenderer from "react-styleguidist/lib/rsg-components/StyleGuide/StyleGuideRenderer";

export default class StyleGuideRenderer extends React.Component {
  componentDidMount() {
    this.patchGlobal();
  }

  componentDidUpdate() {
    this.patchGlobal();
  }

  patchGlobal() {
    // TODO: find a better way to make examples work without an "export default" in the component file
    Object.keys(brc).forEach(k => {
      if (k !== "__es6Module") {
        global[k] = brc[k];
      }
    });
    global["getBackgroundUrl"] = getBackgroundUrl;
  }

  render() {
    return <OriginalStyleGuideRenderer {...this.props} />;
  }
}
