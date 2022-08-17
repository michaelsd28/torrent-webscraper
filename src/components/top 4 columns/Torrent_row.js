import React from "react";
import "../../Styles/index.css";

function Torrent_row({ tTitle, tMagnet, tSeed, topName }) {
  return (
    <div className="col-md-auto top-torrent-row-format">
      <table className="rwd-table">
        <thead>
          <tr>
            <th style={{ color: "#90e0ef" }}>Top {topName}</th>
            <th>Link</th>
            {/* <th>Seed</th> */}
          </tr>
        </thead>
        {tTitle && (
          <tbody>
            {tTitle.map((item, index) => {
              if (index < 26) {
                return (
                  <tr key={index} className="custom-counter">
                    <td>
                      <li>
                        {" "}
                        <small className="list-top-torrent">
                          {index + 1}
                        </small>{" "}
                        {item.substring(0, 50)}{" "}
                      </li>
                    </td>
                    <td>
                      <a href={tMagnet[index]}>
                        <img
                          className="magnet-style"
                          src={process.env.PUBLIC_URL + "/images/magnet.png"}
                        />
                      </a>
                    </td>
                    {/* <td>{tSeed[index]}</td> */}
                  </tr>
                );
              }
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default Torrent_row;
