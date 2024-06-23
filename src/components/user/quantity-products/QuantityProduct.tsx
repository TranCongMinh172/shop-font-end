import { Box, Button, TextField } from "@mui/material";
import { CartItemModel } from "../../../model/cart-item.model";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';



type Props = {
    quantity: number,
    setQuantity: (quantity: number) => void
    maxValue: number,
    cartItem?: CartItemModel
}
const QuantityProduct = ({ quantity, setQuantity, maxValue, cartItem }: Props) => {

    const increasement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if (maxValue > quantity) {
            setQuantity(quantity + 1);
        }
    }
    const decreasement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }

    }
    return (
        <Box>
            <Button onClick={(e) => decreasement(e)}>
                <RemoveIcon />
            </Button>
            <TextField variant="outlined" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            <Button onClick={(e) => increasement(e)} >
                <AddIcon />
            </Button>
        </Box>
    );
}
export default QuantityProduct;