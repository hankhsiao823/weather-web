import "./App.css";
import React, { useEffect, useState } from "react";
import Weather from "./pages/Weather";
import { CircularProgress, Container, Box, useTheme } from "@mui/material";
import language from "./language.json";

export default function App() {
  const [address, setAddress] = useState();
  const [data, setData] = useState([]);
  const [position, setPosition] = useState({});
  const { lat, long } = position;

  useEffect(() => {
    const fetchData = async () => {
      if (navigator.geolocation) {
        let position = navigator.geolocation;
        let option = {
          enableAcuracy: false,
          maximumAge: 0,
          timeout: 600000,
        };
        position.getCurrentPosition(successCallback, errorCallback, option);
      } else {
        alert("此瀏覽器不支援地理定位功能!");
      }

      function successCallback(position) {
        return setPosition({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }

      function errorCallback(error) {
        var errorTypes = {
          0: "不明原因錯誤",
          1: "使用者拒絕提供位置資訊",
          2: "無法取得位置資訊",
          3: "位置查詢逾時",
        };
        alert(errorTypes[error.code]);
      }

      lat &&
        fetch(
          `https://${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&APPID=${process.env.REACT_APP_API_KEY}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((result) => {
            setData(result);
            fetchMapData(result);
          })
          .catch((e) => console.log(e));
    };

    const fetchMapData = (data) => {
      const lg = language.find(
        (item) => item.LangCultureName.indexOf(data.sys.country) >= 0
      );
      lat &&
        fetch(
          `https://${process.env.REACT_APP_MAP_API_URL}/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_MAP_API_KEY}&language=${lg}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((result) => {
            setAddress(result);
          })
          .catch((e) => console.log(e));
    };

    let timer = setInterval(() => {
      fetchData()
    }, 5*60*1000);

    fetchData();

    return () => clearTimeout(timer);
  }, [lat, long]);

  const WeatherComponent = React.memo(Weather);
  const theme = useTheme();

  return (
    <Box sx={{ background: theme.palette.primary.main }}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {data.main !== undefined && address !== undefined ? (
          <WeatherComponent data={data} address={address} />
        ) : (
          <CircularProgress sx={{ color: "lightblue" }} />
        )}
      </Container>
    </Box>
  );
}
