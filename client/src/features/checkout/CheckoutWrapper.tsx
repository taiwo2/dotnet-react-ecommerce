import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import agent from "../../api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../basket/BasketSlice";
import LoadingComponent from "../../layout/LoadingComponent";


const stripePromise = loadStripe('pk_test_51OFDyqCqe8WH6bfY5R8m9ZGSNRRncoBgnwxDRsPb9qXzyChvjVYB3fcc1A1zF4RKyuRbDXY8XneTy4vALDNIh4og00ZjdpQhbY');

const  CheckoutWrapper = () =>{
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Payments.createPaymentIntent()
            .then(response => dispatch(setBasket(response)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [dispatch]);

    if (loading) return <LoadingComponent message='Loading checkout' />

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}
export default CheckoutWrapper;