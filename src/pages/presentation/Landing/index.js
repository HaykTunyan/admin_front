import React, { Fragment } from "react";
import AppBar from "./AppBar";
import Introduction from "./Introduction";
import Demos from "./Demos";
import Integrations from "./Integrations";
import Features from "./Features";
import FAQ from "./FAQ";
import JoinUs from "./JoinUs";

const Presentation = () => {
  return (
    <Fragment>
      <AppBar />
      <Introduction />
      <Demos />
      <Integrations />
      <Features />
      <FAQ />
      <JoinUs />
    </Fragment>
  );
};

export default Presentation;
