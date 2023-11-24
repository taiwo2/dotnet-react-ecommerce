import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState,useEffect, useCallback } from "react";
import { getCookie } from "../app/utils/utils";
import { ToastContainer } from "react-toastify";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import { fetchBasketAsync, setBasket } from "../features/basket/BasketSlice";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../app/store/configureStore";
import { fetchCurrentUser } from "../features/account/accountSlice";
import HomePage from "../features/home/HomePage";
function App() {
  const location = useLocation();
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


  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}  />
      {loading ? <LoadingComponent message="Initialising app..." />
          : location.pathname === '/' ? <HomePage />
          : <Container sx={{mt: 4}}>
              <Outlet />
            </Container>
      }
    </ThemeProvider>
  );
}
export default App;