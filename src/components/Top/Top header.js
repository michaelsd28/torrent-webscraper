import React, { useContext } from "react";
import Search_bar from "./Search bar";
import Pirate_bay_search from "./Pirate Search";
import Nyaa_Search from "./Nyaa Search";
import "bootstrap/dist/css/bootstrap.min.css";
import X1337_SEARCH from "./1337X Search";
import { DataContext } from "../Data Context/Top_context";

import { Link, useHistory } from "react-router-dom";

function Top_header() {
  const { setLoading } = useContext(DataContext);

  const history = useHistory();

  const goHome = () => {
    let path = `/`;
    history.push(path);
  };

  return (
    <>
      {/* bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <a
          style={{ margin: "0 20px 0 10px" }}
          className="navbar-brand"
          href="/"
        >
          {" "}
          <img
            className="go-back-img "
            src={process.env.PUBLIC_URL + "/images/pirate home.png"}
            alt="Pirate Png"
          ></img>
        </a>
        <div style={{ position: "relative", top: 10, left: -10 }}>
          <Search_bar />
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          style={{ position: "relative" }}
          className="collapse navbar-collapse"
          id="navbarNavAltMarkup"
        >
          <div
            style={{ position: "relative", top: 5 }}
            className="navbar-nav links-container-nav"
          >
            <a className="nav-item nav-link" href="#">
              {" "}
            </a>
            <a className="nav-item nav-link active" href="#">
              {" "}
              <Pirate_bay_search /> <span className="sr-only">(current)</span>
            </a>
            <a className="nav-item nav-link" href="#">
              {" "}
              <Nyaa_Search />
            </a>
            <a className="nav-item nav-link" href="#">
              {" "}
              <X1337_SEARCH />
            </a>
          </div>
        </div>
      </nav>

      {/* bootstrap */}

      <div className="go-back-img-wrapper">
        <a href="/"></a>
      </div>
    </>
  );
}

export default Top_header;
