import React from "react";
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/utils/utils";

interface Props {
    subtotal?: number;
}

const BasketSummary = ({subtotal}: Props) => {
    const { basket } = useAppSelector(state => state.basket);
    // if (subtotal === undefined) return null;
    if (subtotal === null || subtotal === undefined) {
        subtotal = 0;
      }
    if (basket){
        subtotal = basket&&basket.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    }
        // subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const deliveryFee = subtotal > 10000 ? 0 : 500;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{ fontStyle: 'italic' }}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default BasketSummary;