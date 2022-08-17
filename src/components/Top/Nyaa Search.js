import React, { useContext } from "react";
import "../../Styles/Mobile.css";
import { DataContext } from "../Data Context/Top_context";
import { useHistory } from "react-router-dom";
import { ButtonBase } from "@material-ui/core";
import { nyaa_button } from "../../Styles/buttons-syles";

const ip = "https://torrent-app-v2.herokuapp.com/";
const link = ip + "nyaa-search/";

function Nyaa_Search() {
  const history = useHistory();

  const pirateSearch = () => {
    let path = "pirate-search";
    history.push(path);
  };

  const { setSearch, input_value, setSearch_link, setLoading } =
    useContext(DataContext);

  return (
    <ButtonBase
      style={nyaa_button}
      className="nyaa-search-button"
      onClick={() => {
        setSearch(input_value);
        setSearch_link(link);
        setLoading(false);
      }}
    >
      <a onClick={pirateSearch}>
      <div id="">
        <h5 style={{ color: "black" }}>
          Nyaa <img src={process.env.PUBLIC_URL + "/images/cat.png"}></img>
        </h5>
      </div>
      </a>
    </ButtonBase>
  );
}

export default Nyaa_Search;
