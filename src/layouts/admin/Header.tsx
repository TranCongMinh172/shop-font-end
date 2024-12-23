import {
    AppBar,
    Avatar,
    Box,
    Menu,
    MenuItem,
    useMediaQuery
} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButtonGradient from "../../components/common/IconButtonGradient.tsx";
import { useState } from "react";
import NavBar from "../common/NavBar.tsx";
import Tooltip from '@mui/material/Tooltip';
import { adminMenu } from "../common/Menu.tsx";
import { getToken } from "../../services/token.service.ts";
import { lougout, removeLocalStorage } from "../../services/auth.service.ts";
import { useNavigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../../services/user.service.ts";
import { UserModel } from "../../model/user.model.ts";
import { LoginResponse } from "../../dto/responses/login-response.ts";
import SearchInput from "../../components/admin/search-input/SearchInput.tsx";


const Header = () => {
    const isMobile: boolean = useMediaQuery('(max-width:600px)');
    // const {mode, setMode} = useColorScheme();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const user: UserModel | null = getUserFromLocalStorage();

    const DrawerList = (
        <NavBar items={adminMenu}></NavBar>
    );

    const handleClickAvatar = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        const token: LoginResponse | null = getToken();
        if (token) {
            try {
                await lougout(token.accessToken);
                removeLocalStorage();
                navigate("/auth/login");
            } catch (error) {
                console.log(error);
            }
        }
    }

    return <AppBar sx={{
        display: "flex", flexDirection: 'row', p: 1, alignItems: "center",
        justifyContent: 'space-between', backgroundColor: "background.paper"
    }}>
        {isMobile ? <></> :
            <Box sx={{ width: '40%', display: "flex", alignItems: 'center' }}>
               
                <SearchInput placeHolder={"Nhập nội dung cần tìm"} />
            </Box>}
        <Box sx={{
            display: "flex", width: isMobile ? '65%' : '15%', justifyContent: 'space-evenly',
            alignItems: "center"
        }}>
        
            <><Tooltip title={user ? user.name : "tài khoản"}>
                <IconButtonGradient onClick={handleClickAvatar}>
                    <Avatar alt={user?.name} src={user?.avatarUrl} sx={{
                        width: 23,
                        height: 23,
                    }} />
                    <></>
                </IconButtonGradient>
            </Tooltip>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => navigate('/profile')}>Thông tin cá nhân</MenuItem>
                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </Menu>
            </>
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
}

export default Header;