import "./App.css";
import React from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";

export default function ThemeProvider({ children }) {

  const [modoType,setModoType ] = React.useState();

  React.useEffect(()=>{
    const day = new Date();
    let time = day.getHours();

    function modoChange(){
      if (time > 5 && time < 17) {
        setModoType("light")
      }else{
        setModoType("dark")
      }
    }
    return modoChange()
  })

  const theme = React.useMemo(() =>
    createTheme({
      palette: {
        mode: modoType,
        ...( modoType === "light"
            ? {
                primary:{main: "#5EBFA4"},
              }
            : {
                primary: {main: "#4A4A68"},
              }
        ),
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
    }),[modoType]
  );
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
