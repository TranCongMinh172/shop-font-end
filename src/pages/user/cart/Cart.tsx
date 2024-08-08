import { Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/Store";
import { convertPrice } from "../../../utils/convert-price";
import { useState } from "react";
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";

function Cart() {
    const cart = useSelector((state: RootState) => state.cart.items);
    const [totalMoney, setTotalMoney] = useState<number>(0);
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {cart.length > 0 ?
                <>
                    <Box sx={{
                        height: "50vh",
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                      {cart.map((cartItem, index: number)=>(
                        <CartItem key={index} item={cartItem}/>
                      ))}
                    </Box>
                    <Box>
                        <Typography>Tổng tiền: {convertPrice(totalMoney)}</Typography>
                    </Box>
                </> :
                <Box>
                    <CartEmpty/>
                </Box>
            }
        </Container>
    );
}

export default Cart;