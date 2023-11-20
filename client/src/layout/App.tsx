import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState,useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { getCookie } from "../app/utils/utils";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import { fetchBasketAsync, setBasket } from "../features/basket/BasketSlice";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../app/store/configureStore";
import { fetchCurrentUser } from "../features/account/accountSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';


  const initApp = useCallback(async () => {
    try {
        await dispatch(fetchCurrentUser());
        await dispatch(fetchBasketAsync());
      
    } catch (error) {
      console.log(error);
    }
  },[dispatch]);

  // useEffect(() => {
  //   const buyerId = getCookie('buyerId');
  //   dispatch(fetchCurrentUser)
  //   if (buyerId) {
  //     agent.Basket.get()
  //       .then(basket => dispatch(setBasket(basket)))
  //       .catch(error => console.log(error))
  //       .finally(() => setLoading(false));
  //   } else {
  //     setLoading(false);
  //   }
  // }, [dispatch]);

  useEffect(()  => {
   initApp().then(() => setLoading(false));
  }, [initApp])

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