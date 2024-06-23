import { Box, useMediaQuery } from "@mui/material";
import Header from "./Header.tsx";
import { ReactNode } from "react";

import Footer from "./Footer.tsx";
import NavBar from "../common/NavBar.tsx";
import { adminMenu } from "../common/Menu.tsx";
type Props = {
    children?: ReactNode;
}
const AdminLayout = ({ children }: Props) => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Header></Header>
            <Box sx={{ display: "flex", mt: 9, minHeight: '100vh' }} >
                {isMobile ? <></> : <NavBar items={adminMenu}></NavBar>}
                <Box  sx={{display: 'flex', flexDirection: 'column', flex: 1, borderLeft: '1px solid #e4e4e4',}}>
                    <Box sx={{ flex: 1 }}>{children}</Box>
                    <Box sx={{ height: 100 }}><Footer /></Box>
                </Box>
            </Box>
        </Box>
    );
}
export default AdminLayout;