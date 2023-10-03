import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BasketTable from "./BasketTable";
import { useStoreContext } from "../../app/context/StoreContext";

const BasketPage = () => {
  const {basket}= useStoreContext()
 ;
  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;  
  return (
    <>
      <BasketTable 
            items={basket.items}
             />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          {/* <BasketSummary /> */}
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BasketPage;
