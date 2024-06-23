import {IconButton, styled} from "@mui/material";
import { primaryGradient } from "../../theme";


const IconButtonGradient = styled(IconButton)({
        ':hover':{
            background: primaryGradient,
            color:"white",
            transition: 'background 0.3 ease-in-out',
        }
})
export  default IconButtonGradient;