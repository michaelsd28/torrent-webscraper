import React,{useContext} from "react";
import Torrent_row from "./Torrent_row";
import { DataContext } from "../Data Context/Top_context";
import 'bootstrap/dist/css/bootstrap.min.css';
function Shows() {



  const {
    data_shows
    } = useContext(DataContext);
  





  return (
    <div id="shows-row" className="shows-row list-class " >
      {/* <img src="https://i.ibb.co/6vB0wcT/Png-Item-1084361.png"></img>{" "} */}
      <img src={process.env.PUBLIC_URL + '/images/shows.png'}   alt="1337x"></img>
    
      <Torrent_row  
      tTitle={data_shows.shows}  
      tMagnet={data_shows.magnet} 
      tSeed={data_shows.seeds}
      topName={"TV Shows"}
      />
      
    </div>
  );
}

export default Shows;
