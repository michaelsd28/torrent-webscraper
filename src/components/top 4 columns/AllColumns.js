import React, { useContext } from "react";
import { DataContext } from "../Data Context/Top_context";
import { Movies, Anime, Games, Shows } from "./index";
import Top_text from "../Top/Top text";
import Loading from "../Animation/Loading";
import GoTop from "./GoTop";
import Footer from "../Footer";


function AllColumns() {
  const { loading_top } = useContext(DataContext);

  if (loading_top) {
    return (
      <>
        <Top_text />
        <div id="all-columns justify-content-md-center"  className="">
          <div className="row rwo-all-columns justify-content-md-center">
          <Movies/>
          <Shows />
          <Anime />
          <Games />
          </div>
        </div>

  
          <div  >
    
  
        </div>
        {/* <div className="four">4</div> */}
        <Footer/>
      </>
    );
  } else {
    return <Loading />;
  }
}

export default AllColumns;
