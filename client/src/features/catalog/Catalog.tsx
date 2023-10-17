import React from "react";
import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from "../../api/agent";
import LoadingComponent from "../../layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll)
  const [loading, setLoading] = useState(true);
  const {productsLoaded,status} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync())
  }, [productsLoaded]);

  if (status.includes('pending')) return <LoadingComponent message="Loading products..." />;
  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;
