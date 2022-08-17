import React from "react";
import { devideString } from "./Methods/Nyaa Type";

function Torrent_search_table({ value }) {
  const new_nyaa_type = devideString(value);


  return (
    <div className="search-table-wrapper">
      <div style={{ paddingTop: "-250px" }} className="search-table-container">
      
        <table className="search-table">
          <tr>
            <th>
       
              <p>
                <img
                  src={process.env.PUBLIC_URL + "/images/table/type.png"}
                  alt="type"
                />
              </p>{" "}
              <text>Type</text>{" "}
            </th>
            <th>
              <p>
              <img
                  src={process.env.PUBLIC_URL + "/images/table/torrent.png"}
                  alt="type"
                />
              </p>{" "}
              <text>Torrent </text>{" "}
            </th>
            <th>
              <p>
              <img
                  src={process.env.PUBLIC_URL + "/images/table/link.png"}
                  alt="type"
                />
              </p>{" "}
              <text> Link </text>{" "}
            </th>
            <th>
              {" "}
              <p>
  <img
                  src={process.env.PUBLIC_URL + "/images/table/health.png"}
                  alt="type"
                />
              </p>{" "}
              <text>health </text>{" "}
            </th>
          </tr>

          {value.movies.map((item, index) => {
            return (
              <tr>
                <td className="table-type" data-th="Movie Title">
                  {new_nyaa_type.type[index]} <br></br>{" "}
                  {value.subtype
                    ? value.subtype[index]
                    : new_nyaa_type.subtype[index]}{" "}
                </td>
                <td className="title-td" key={index} data-th="Movie Title">
                  {item.substring(0, 80)} <br></br>{" "}
                  <small className="small-size">{value.size[index]} &emsp;&emsp;</small>{"   "}<img className="play-torrent" src={process.env.PUBLIC_URL+"/images/table/play.png"}  alt="play"/> 
                </td>
                <td key={index + 100} className="magnet-search-table">
                  <a key={index + 200} href={value.magnet[index]}>
                    <img src={process.env.PUBLIC_URL + "/images/magnet.png"} />
                  </a>
                </td>

                <td style={{color:"#7dd87d"}} key={index + 300} className="table-seeds">
                  {value.seeds[index]}{" "}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Torrent_search_table;
