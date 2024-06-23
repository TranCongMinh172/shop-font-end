import { Box, Button } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
    children?: React.ReactNode;
}
const UserLayout = ({ children }: Props) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: '100vh' }}>
            <Header></Header>
            <Box sx={{flex: 1, marginTop: '85px', display: 'flex',}}>
                {children}
            </Box>
            <Box  sx={{ height: '60px'}}>
                <Footer></Footer>
            </Box>
        </Box>
    );
}
export default UserLayout;