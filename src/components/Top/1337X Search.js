import React, { useContext } from "react";
import { DataContext } from "../Data Context/Top_context";
import {  useHistory } from "react-router-dom";
import { ButtonBase } from "@material-ui/core";
import { B1337x_button } from "../../Styles/buttons-syles";
const ip = "https://torrent-app-v2.herokuapp.com/"
const link = ip+ "1337x-search/"

function X1337_SEARCH() {
  
  const { setSearch, input_value, setSearch_link, setLoading } =
    useContext(DataContext);



  const history = useHistory();

  const pirateSearch = () => {
    let path = "pirate-search";
    history.push(path);
  };



  return (
    <ButtonBase className="b1337x-search-button"
    style={B1337x_button}
      onClick={() => {
        setSearch(input_value)
        setSearch_link(link)
        setLoading(false)
      }}
    >
      <a onClick={pirateSearch}>
      <div id="X1337-search">
   
        <img src={process.env.PUBLIC_URL + '/images/1337-X-logo.png'}   alt="1337x"  ></img>
      </div>
      </a>
    </ButtonBase>
  );
}

export default X1337_SEARCH;
