import React, { useContext } from "react";

import { DataContext } from "../Data Context/Top_context";

function Top_text() {
  const { loading_top, setLoading_top } = useContext(DataContext);

  return (
    <div id="top-50" className="top-torrent-text">
      <h1>Top 25</h1>
  
      <img

      draggable="false"
        src={process.env.PUBLIC_URL + "/images/refresh.png"}
        onClick={async () => {
          setLoading_top(false);
          let refresh = await fetch(
            "https://torrent-app-v2.herokuapp.com/refresh"
          );

          setTimeout(() => {
            window.location.reload(false);
          }, 3000);
        }}

        className="fas fa-sync refresh-icon"
      ></img>

    </div>
  );
}

export default Top_text;
