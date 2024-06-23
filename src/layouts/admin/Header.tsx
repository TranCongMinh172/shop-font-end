import { AppBar, Avatar, Badge, Box, Drawer, Tooltip, useColorScheme, useMediaQuery } from "@mui/material";
import SearchInput from "../../components/admin/search-input/SearchInput";
import IconButtonGradient from "../../components/common/IconButtonGradient";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Notifications } from "@mui/icons-material";
import { deepPurple } from "@mui/material/colors";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

import { adminMenu } from "../common/Menu.tsx";
import NavBar from "../common/NavBar.tsx";



const Header = () => {
    const isMobile: boolean = useMediaQuery("(max-width: 600px)");
    const { mode, setMode } = useColorScheme();
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const DrawerList = (
       <NavBar items={adminMenu}/>
    );
    return (
        <AppBar sx={{
            display: "flex", flexDirection: 'row', p: 1, alignItems: "center",
            justifyContent: 'space-between', backgroundColor: "background.paper"
        }}>
            {isMobile ? <><img src="https://thuthuatnhanh.com/wp-content/uploads/2022/06/anh-meo-Anh-long-ngan-khom-lung-bat-chuot.jpg" alt={"logo"} width={"55px"} height={"55px"} /></> :
                <Box sx={{ width: '40%', display: "flex", alignItems: 'center' }}>
                    <Box sx={{ mr: 20 }}>
                        <img src="https://thuthuatnhanh.com/wp-content/uploads/2022/06/anh-meo-Anh-long-ngan-khom-lung-bat-chuot.jpg" alt={"logo"} width={"55px"} height={"55px"} />
                    </Box>
                    <SearchInput placeholder="Nhập nội dung cần tìm" />
                </Box>}
            <Box sx={{
                display: "flex", width: isMobile ? '65%' : '15%', justifyContent: 'space-evenly',
                alignItems: "center"
            }}>
                <Tooltip title={mode === 'light' ? "giao diện tối" : "giao diện sáng"}>
                    <IconButtonGradient type="button" aria-label="mode"
                        onClick={() => {
                            setMode(mode === 'light' ? 'dark' : 'light');
                        }}
                    >
                        {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                    </IconButtonGradient>
                </Tooltip>
                <Tooltip title={"Thông báo"}>
                    <IconButtonGradient type="button" aria-label="message">
                        <Badge badgeContent={4} color="primary">
                            <Notifications fontSize={"small"} />
                        </Badge>
                    </IconButtonGradient>
                </Tooltip>
                <Tooltip title={"Tài khoản"}>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
                </Tooltip>
                {isMobile ? <Box>
                    <IconButtonGradient onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButtonGradient>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </Box> : <></>}
            </Box>
        </AppBar>

    );


}
export default Header;