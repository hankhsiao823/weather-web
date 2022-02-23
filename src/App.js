import "./App.css";
import React, { useEffect, useState } from "react";
import Weather from "./pages/Weather";
import { CircularProgress, Container, Box, useTheme } from "@mui/material";
import language from "./language.json";

export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [address, setAddress] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (navigator.geolocation) {
        var position = navigator.geolocation;
        var option = {
          enableAcuracy: false,
          maximumAge: 0,
          timeout: 600000,
        };
        position.getCurrentPosition(successCallback, errorCallback, option);
      } else {
        alert("此瀏覽器不支援地理定位功能!");
      }
      function successCallback(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      }
      function errorCallback(error) {
        var errorTypes = {
          0: "不明原因錯誤",
          1: "使用者拒絕提供位置資訊",
          2: "無法取得位置資訊",
          3: "位置查詢逾時",
        };
        alert(errorTypes[error.code]);
        //alert(error.message);  //測試時用
      }

      // navigator.geolocation.getCurrentPosition(function (position) {
      //   setLat(position.coords.latitude);
      //   setLong(position.coords.longitude);
      // });

      await fetch(
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
        });
    }

    async function fetchMapData(data) {
      const lg = language.find(
        (item) => item.LangCultureName.indexOf(data.sys.country) >= 0
      );
      await fetch(
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
        });
    }

    fetchData();
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
