import React, {  useContext } from "react";
import Torrent_row from "./Torrent_row";
import { DataContext } from "../Data Context/Top_context";
import 'bootstrap/dist/css/bootstrap.min.css';
function Anime() {


  const { data_anime } = useContext(DataContext);


    return (
      <div id="anime-row" className="anime-row ">
      <img  src={process.env.PUBLIC_URL + '/images/ninja.png'}    alt="img"/>
      <Torrent_row
          tTitle={data_anime.anime}
          tSeed={data_anime.seeds}
          tMagnet={data_anime.magnet}
          topName={"Anime"}
        />
        </div>
    )
}

export default Anime
