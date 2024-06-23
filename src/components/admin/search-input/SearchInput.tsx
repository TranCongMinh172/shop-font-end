import { Box, Input } from "@mui/material";
import IconButtonGradient from "../../common/IconButtonGradient.tsx";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
    placeholder?: string;
}

const SearchInput = ({placeholder}:Props)=>{
    return(
        <Box sx={{display: "flex", width:'100%'}}>
            <Input sx={{flex:1}} placeholder={placeholder}></Input>
            <IconButtonGradient  type="button" aria-label="search">
                <SearchIcon/>
            </IconButtonGradient>
        </Box>
    )
        
    
}
export default SearchInput;