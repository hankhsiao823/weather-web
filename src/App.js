import "./App.css";
import React, { useEffect, useState } from "react";
import Weather from "./pages/Weather";
import { CircularProgress, Container } from "@mui/material";
import { Box } from "@mui/system";
import language from "./language.json";

export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [address, setAddress] = useState();
  const [data, setData] = useState([]);
  const params = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  useEffect(() => {
    async function fetchData() {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(
        `http://${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&APPID=${process.env.REACT_APP_API_KEY}`,
        params
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          fetchMapData(result);
        });
    }

    async function fetchMapData(data) {
      const lg = language.find(
        (item) => item.LangCultureName.indexOf(data.sys.country) >= 0
      );
      await fetch(
        `https://${process.env.REACT_APP_MAP_API_URL}/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_MAP_API_KEY}&language=${lg}`,
        params
      )
        .then((res) => res.json())
        .then((result) => {
          setAddress(result);
        });
    }

    fetchData();
  }, [lat, long]);

  const WeatherComponent = React.memo(Weather);

  return (
    <Box>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {data.main !== undefined && address !== undefined ? (
          <Weather data={data} address={address} />
        ) : (
          <CircularProgress />
        )}
      </Container>
    </Box>
  );
}
