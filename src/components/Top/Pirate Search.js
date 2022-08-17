import React, { useContext } from "react";
import { DataContext } from "../Data Context/Top_context";
import { useHistory } from "react-router-dom";
import { ButtonBase } from "@material-ui/core";
import { pirate_button } from "../../Styles/buttons-syles";
const ip = "https://torrent-app-v2.herokuapp.com/";
const link = ip + "pirate-search/";

// piratehat.png
function Pirate_bay_search() {
  const history = useHistory();



  const { setSearch, input_value, setSearch_link, setLoading } =
    useContext(DataContext);

  return (
    <ButtonBase className="pirate-search-button" 

    style={pirate_button}
    onClick={() => {
      setSearch(input_value);
      setSearch_link(link);
      setLoading(false);
    }}
    
    >
      <div
        onClick={() => {
          setSearch(input_value);
          setSearch_link(link);
          setLoading(false);
        }}
      >
        <div>
          <div id="pirate-bay">
            <h5>
              PirateBay
            <img src={process.env.PUBLIC_URL + '/images/piratehat.png'}></img>
            </h5>
          </div>
        </div>
      </div>
    </ButtonBase>
  );
}

export default Pirate_bay_search;
