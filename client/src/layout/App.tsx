import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState,useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getCookie } from "../app/utils/utils";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from "../app/context/StoreContext";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const {setBasket} =useStoreContext();
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';

  useEffect(() => {
   const buyerId = getCookie('buyerId')
    if (buyerId){
      agent.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
    }else {
      setLoading(false)
    }
  }, [setBasket])
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === 'light') ? '#eaeaea' : '#121212'
      }
    }
  })
  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message='Loading Basket...'/>

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}  />
      <Container>
      <Outlet />
      </Container>
    </ThemeProvider>
  );
}
export default App;