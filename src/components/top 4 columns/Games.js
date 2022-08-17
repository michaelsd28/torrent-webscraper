/* eslint-disable react/jsx-pascal-case */
import React, {  useContext } from "react";
import Torrent_row from "./Torrent_row";
import { DataContext } from "../Data Context/Top_context";
import 'bootstrap/dist/css/bootstrap.min.css';

function Games() {

    const { data_games } = useContext(DataContext);




    return (
      <div id="games-row" className="games-row">

   
      <img style={{padding:"0 0 0 10px"}} src={process.env.PUBLIC_URL + '/images/controller2.png'}   alt="1337x"/>


      <Torrent_row
          tTitle={data_games.games}
          tSeed={data_games.seeds}
          tMagnet={data_games.magnet}
          topName={"Games"}
        />
      
        </div>
    )
}

export default Games
