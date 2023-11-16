import React from "react";

import {
  AppBar,
  Switch,
  Toolbar,
  Typography,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../app/store/configureStore";
import SignedInMenu from "./SigninMenu";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const Header = ({ darkMode, handleThemeChange }: Props) => {
  const { basket } = useAppSelector(state => state.basket);
  const { user } = useAppSelector(state => state.account);
  const itemCount = basket&&basket.items.reduce((sum, item) => sum + item.quantity, 0);

  
  const midLinks = [
    { title: "catalog", path: "/catalog" },
    { title: "about", path: "/about" },
    { title: "contact", path: "/contact" },
  ];

  const rightLinks = [
    { title: "login", path: "/login" },
    { title: "register", path: "/register" },
  ];

  const navStyles = {
    color: "inherit",
    textDecoration: "none",
    typography: "h6",
    "&:hover": {
      color: "grey.500",
    },
    "&.active": {
      color: "text.secondary",
    },
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
            TONAZ
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>
        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        <Box display="flex" alignItems="center">
          <IconButton
            component={Link}
            to={"/basket"}
            size="large"
            sx={{ color: "inherit" }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
            {user ? (
              <SignedInMenu />
              ) : (
                  <List sx={{ display: 'flex' }}>
                      {rightLinks.map(({ title, path }) => (
                          <ListItem
                              component={NavLink}
                              to={path}
                              key={path}
                              sx={navStyles}
                          >
                              {title.toUpperCase()}
                          </ListItem>
                      ))}
                  </List>
              )
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;