import React from "react";
import classes from "./App.module.css";

import Layout from "./routes/layout/Layout";

const App: React.FC = () => {
  return (
    <div className={classes.App}>
      <Layout />
    </div>
  );
};

export default App;
