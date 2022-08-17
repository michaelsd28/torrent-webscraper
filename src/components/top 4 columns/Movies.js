import React, { useContext } from "react";
import Torrent_row from "./Torrent_row";
import "../../Styles/Nested-rows.css";
import { DataContext } from "../Data Context/Top_context";
import 'bootstrap/dist/css/bootstrap.min.css';
function Movies() {


  const { data_movies  } = useContext(DataContext);

  return (
    <div id="movies-row" className="movies-row  list-class  ">
      <img src={process.env.PUBLIC_URL + '/images/movies2.png'}   alt="1337x"/>

      {data_movies.movies && (
        <Torrent_row
          tTitle={data_movies.movies}
          tSeed={data_movies.seeds}
          tMagnet={data_movies.magnet}
          topName={"Movies"}
        />
      )}
    </div>
  );
}

export default Movies;
