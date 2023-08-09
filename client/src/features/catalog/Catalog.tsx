import {useEffect,useState } from "react";
import { Product } from "../../models/product";
import ProductList from "./ProductList";

const Catalog = () =>{
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:5137/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <>
            <ProductList products={products} />
        </>
    )
}

export default Catalog;



