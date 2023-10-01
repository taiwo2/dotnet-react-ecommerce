import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Basket } from "../../app/models/basket";
import LoadingComponent from "../../layout/LoadingComponent";
import agent from "../../api/agent";

const BasketPage = () => {
  const [loading, setLoading] = useState(false);
  const [basket, setBasket] = useState<Basket | null>();

  useEffect(() => {
    agent.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally( () => setLoading(false))
  }, []);
  if (loading) return <LoadingComponent message="Loading Basket ...." />;
  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;  
  return (
    <>
    
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
        
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
