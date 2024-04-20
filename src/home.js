import React, { useEffect, useState } from "react";
import "./style.css";

import axios from "axios";
function Home() {
  const [data, setData] = useState({
    celcious: 25,
    name: "Pune",
    img: "",
  });

  const [name, setName] = useState("");

  const handleClick = () => {
    if (name !== "") {
      const apikey = "b2435e809b29a55c7c6c8a81af4198dc";
      const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apikey}&&units=metric`;

      // const apiurl =
      //   "https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=b2435e809b29a55c7c6c8a81af4198dc&&units=metric";
      axios
        .get(apiurl)
        .then((res) => {
          let imgPath = "../imges/clear.png";
          if (res.data.weather[0].main == "Clouds") {
            imgPath = "../imges/cloud.png";
          } else if (res.data.weather[0].main == "Clear") {
            imgPath = "../imges/clear.png";
          } else if (res.data.weather[0].main == "Rain") {
            imgPath = "../imges/rain.png";
          } else if (res.data.weather[0].main == "Drizzle") {
            imgPath = "../imges/drizzle.png";
          } else if (res.data.weather[0].main == "Mist") {
            imgPath = "../imges/snow.png";
          } else {
            imgPath = "../imges/cloud.png";
          }
          setData({
            ...data,
            celcious: res.data.main.temp,
            name: res.data.name,
            img: imgPath,
          });
        })
        .catch((err) => "Not Found");
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <div className="sear">
          <input
            type="text"
            placeholder="search for city"
            name="search"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button>
            <img
              src="../imges/search.png"
              alt="?"
              id="s"
              onClick={handleClick}
            ></img>
          </button>
        </div>
        <div className="windinfo">
          <img src={data.img} className="icon"></img>
          <h1 className="temp">{data.celcious}°C </h1>
          <h2 className="city">{data.name}</h2>
        </div>
        <div className="time">
            
        </div>
      </div>
    </div>
  );
}
export default Home;
