import React, { useEffect } from "react";
import "../../Styles/Mobile.css";
import GoTop from "../top 4 columns/GoTop";
import PageControl from "../Top/PageControl";
import { DataContext } from "../Data Context/Top_context";

function TorrentSearch_TableM({ MData }) {
  const { mobileData, setMobileData } = React.useContext(DataContext);

  const [width, setWidth] = React.useState(window.innerWidth);

  const [data, setData] = React.useState(
    JSON.parse(localStorage.getItem("data"))
  );

  useEffect(() => {
    if (mobileData.movies) {
      setData(mobileData);
    }
  }, [data]);

  return (
    <>
      <div className="container tableMobile-container">
        <table className="table table-hover table-dark table-mobile table-borderless table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Link</th>
              <th>Seed</th>
            </tr>
          </thead>
          <tbody>
            {MData.movies &&
              MData.movies.map((title, index) => (
                <tr key={index}>
                  <td
                    style={{
                      maxWidth: "10rem",
                      width: "10rem",
                      textOverflow: "ellipsis",
                      overflow: "hidden"
                    }}
                  >
                    {title}
                  </td>
                  <td>
                    <a href={MData.magnet[index]}>
                      {" "}
                      <img
                        style={{
                          height: "20px"
                        }}
                        src="images/mobile/magnet.png"
                      />
                    </a>
                  </td>
                  <td
                  style={{
                    color: "green"
                  }}
                  
                  >{MData.seeds[index]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TorrentSearch_TableM;
