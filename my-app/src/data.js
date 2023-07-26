/*import React,{ useState } from "react";
import Papa from "papaparse";
const  LiveData = () =>
{
  let URL_SHEET = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSGtrWsWr1Q8h2BVNB97M8P4J9xiU3R-aBGJOGg3Yj5Y2XJWPgTTYWSuM0v6ZZoWs5I8ZkYGKnVVN1G/pub?output=csv"
  const [data, setData] = useState({});
  Papa.parse(URL_SHEET, {
    download: true,
    header: true,
    complete: (results) => {
      setData(results.data);
    },
  });
  let list_live_id = Array.from(data);
  console.log(list_live_id);
  return (
    <div className="home">
      <ul>
        {movies.map((data) => (
          <li key={data.LiveName}>
            {data.LiveName} -  ({data.IdLive}) 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LiveData;
import React, { useState } from "react";
import Papa from "papaparse";

const LiveData = () => {
  const [data, setData] = useState({});
  Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vSGtrWsWr1Q8h2BVNB97M8P4J9xiU3R-aBGJOGg3Yj5Y2XJWPgTTYWSuM0v6ZZoWs5I8ZkYGKnVVN1G/pub?output=csv", {
    download: true,
    header: true,
    complete: (results) => {
      setData(results.data);
    },
  });
  const movies = Array.from(data);
  return (
    <ul>
      {movies.map((data) => (
        <li key={data.movie}>
          {data.movie} ({data.year}) - Rating {data.rating}
        </li>
      ))}
    </ul>
  );
};
export default LiveData;
*/