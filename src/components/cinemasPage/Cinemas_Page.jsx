import React from "react";

import Cinemas from "./Cinemas";

let cinemasArr = require("../allCinema.json");
class Cinemas_Page extends React.Component {
  render() {
    return <Cinemas cinemas={cinemasArr} />;
  }
}
export default Cinemas_Page;