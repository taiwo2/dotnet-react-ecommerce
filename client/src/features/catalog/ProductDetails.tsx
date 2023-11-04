import React from "react";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NotFound from "../../errors/NotFound";
import LoadingComponent from "../../layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/BasketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector(state => productSelectors.selectById(state,id!))

  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const { basket, status } = useAppSelector(state => state.basket);
  const {status: productStatus} = useAppSelector(state => state.catalog)
  const dispatch = useAppDispatch();
  
  if (product === undefined) return;
  const productID = product.id
  const item = basket && basket!.items.find(i => i.productId === productID);

  

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if(!product && id) dispatch((fetchProductAsync(parseInt(id))));

  }, [id,item,product,dispatch]);

 

  const handleInputChange = (e: any) =>{
    if (e.target.value >= 0)
        setQuantity(parseInt(e.target.value));
} 
  const handleUpdateCart = ()=> {
    if (!item || quantity > (item && item.quantity)) {
        const updatedQuantity = item ? quantity - item.quantity : quantity;
        dispatch(addBasketItemAsync({productId: product.id!, quantity: updatedQuantity}))
    } else {
        const updatedQuantity = item.quantity - quantity;
        dispatch(removeBasketItemAsync({productId: product.id!, quantity: updatedQuantity}))
    }
  }
  if (productStatus.includes('pending')) return  <LoadingComponent message="Loading product..." />

  if (!product) return <NotFound />

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputChange}
              variant={'outlined'}
              type={'number'}
              label={'Quantity in Cart'}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton 
              disabled={(item &&item.quantity === quantity )|| (!item && quantity === 0)}
              loading={status.includes('pendin')}
              onClick={handleUpdateCart}
              sx={{ height: '55px' }}
              color={'primary'}
              size={'large'}
              variant={'contained'}
              fullWidth>
              {item ? 'Update Quantity' : 'Add to Cart'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
