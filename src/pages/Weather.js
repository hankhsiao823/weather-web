import { Box, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Weather({ data, address }) {
  const [nowTime, setNowTime] = useState();
  let iconcode = data.weather[0].icon;
  let icon = `http://openweathermap.org/img/wn/${iconcode}@2x.png`

  useEffect(() => {
    const time = new Date();
    setNowTime(
      `${time.getFullYear()}年${
        time.getMonth() + 1
      }月${time.getDate()}日${time.getHours()}時${time.getMinutes()}分`
    );
  }, [data]);

  console.log(data);
  return (
    <Card sx={{ width: 400 }} p={4}>
      <Grid container>
        <Grid
          item
          xs={12}
          p={1}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ fontWeight: "bold" }}
            >
              {address.results[8].formatted_address}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ fontWeight: "bold" }}
            >
              {nowTime}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Box
            p={0}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Typography variant="h3" color="textPrimary">
              氣溫: {(data.main.temp - 273.15).toFixed(0)}
              <span>&#176;</span>C
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1" color="textPrimary">
                最高溫: {(data.main.temp_max - 273.15).toFixed(0)}
                <span>&#176;</span>C
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                最低溫: {(data.main.temp_min - 273.15).toFixed(0)}
                <span>&#176;</span>C
              </Typography>
            </Box>
          </Box>
          <Box p={0} sx={{width: 100, height: 100}}>
            <img
              src={icon}
              alt="weather"
              // style={{ width: 100, height: 100 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="row" p={1}>
            <Typography variant="subtitle1" color="textPrimary">
              濕度:{data.main.humidity}%
            </Typography>

            <Typography variant="subtitle1" color="textPrimary" sx={{ mx: 2 }}>
              氣壓: {data.main.pressure}帕
            </Typography>

            <Typography variant="subtitle1" color="textPrimary">
              風力: {data.wind.speed}公里/時
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
