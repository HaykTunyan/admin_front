import React, { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import AdvancedTable from "../../components/AdvancedTable";

const Default = () => {
  return (
    <Fragment>
      <Helmet title="Dashbord" />
      <AdvancedTable />
    </Fragment>
  );
};

export default Default;
