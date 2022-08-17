import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../Data Context/Top_context";
import Torrent_search_table from "../Top/Torrent search table";
import { filterDATA } from "./Filter data";
import Loading from "../Animation/Loading";
import PageControl from "../Top/PageControl";
import GoTop from "../top 4 columns/GoTop";

import "../../Styles/index.css";
import TorrentSearch_TableM from "../Mobile/TorrentSearch_TableM";

function Pirate_bay_search() {
  const {
    search,
    search_link,
    loading,
    setLoading,
    mobileData,
    setMobileData
  } = useContext(DataContext);
  const [data, setData] = useState(JSON.parse(localStorage.getItem("data")));
  const [didMount, setDidMount] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth );
  const [filter, setFilter] = useState(
    JSON.parse(localStorage.getItem("data"))
  );

  const [width, setWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    setDidMount(true);


    window.addEventListener("resize", (e) => {
      setWidth(window.innerWidth.toString());
    });




    async function fetchTop_Torrent() {

      const response = await fetch(`${search_link}${search}`);
      const json_Response = await response.json();

      setData(json_Response);
      setMobileData(json_Response);

      setFilter(json_Response);
      localStorage.setItem("data", JSON.stringify(json_Response));
      setLoading(true);
    }

    fetchTop_Torrent();

    // window.scrollTo(0, 0);

    return () => setDidMount(false);
  }, [search, search_link, loading ]);

  if (!loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="container table-result">
        <div className="row justify-content-center">
          <form className="row justify-content-center col-12">
            <div className="filter-container">
              <input
                className="input-filter "
                onKeyUp={(e) => {
                  const newDATA = data.movies
                    ? data
                    : JSON.parse(localStorage.getItem("data"));

                  setFilter(filterDATA(newDATA, e.target.value));
                }}
                type="search"
              />
              <img
                src={process.env.PUBLIC_URL + "/images/filter.png"}
                alt="filter"
              />
            </div>
          </form>
  
          {    parseInt(width) > 800  ? (<Torrent_search_table value={filter} />) : (<TorrentSearch_TableM MData={filter}/>)}
        </div>
        <div>
          <PageControl />{" "}
          <div>
            {" "}
            <GoTop />{" "}
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default Pirate_bay_search;
