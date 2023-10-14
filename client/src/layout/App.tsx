import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState,useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getCookie } from "../app/utils/utils";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import { setBasket } from "../features/basket/BasketSlice";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../app/store/configureStore";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';

  useEffect(() => {
   const buyerId = getCookie('buyerId')
    if (buyerId){
      agent.Basket.get()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
    }else {
      setLoading(false)
    }
  }, [dispatch])
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