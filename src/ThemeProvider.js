import "./App.css";
import React from "react";
import { createTheme,ThemeProvider as MuiThemeProvider, } from "@mui/material";

export default function ThemeProvider({ children }) {
  const day = new Date();
  let time = day.getHours();
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: time >5 && time < 17? 'light':'dark',
          // primary: {
          //   main: "#6b3f91",
          // },
          // secondary: {
          //   main: "#D679B0",
          // },
          // info: {
          //   main:"#5EBFA4",
          // },
          // success:{
          //   main:'#84BF04'
          // },
          // error:{
          //   main:'#EF476F',
          // },
          // text: {
          //   main:'#4A4A68',
          //   light:'#fff',
          // },
          // backgorund: {
          //   default:'#F9F9FC'
          // }
        },
        typography: {
          fontFamily: ["Noto Sans TC", "sans-serif"].join(","),
        },
      }),
  );
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
