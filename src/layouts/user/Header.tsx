import { AppBar, Badge, Box, Drawer, ListItemButton, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IconButtonGradient from "../../components/common/IconButtonGradient";
import MenuIcon from '@mui/icons-material/Menu';
import { ExpandLess, ExpandMore, Notifications } from "@mui/icons-material";
import { primaryGradient } from "../../theme";
import { userMenu } from "../common/Menu";
import SearchInput from "../../components/admin/search-input/SearchInput";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavBar from "../common/NavBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/Store";




const Header = () => {
    const location = useLocation();
    const listCart = useSelector((state: RootState)=> state.cart.items);
    const isMobile: boolean = useMediaQuery('(max-width:600px)');
    const isMedium: boolean = useMediaQuery('(max-width:1150px)');
    const [openChildItem, setOpenChildItem] = useState<{ [key: string]: boolean }>({});
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const handleClick = (title: string) => {
        setOpenChildItem(prev => ({ ...prev, [title]: !prev[title] }));
    };
    const DrawerList = (
        <NavBar items={userMenu}></NavBar>
    );
    return (
        <AppBar elevation={0} color="secondary" sx={{
            display: 'flex',
            width: '100%',
            gap: '60px',
            alignItems: 'center',
            flexDirection: 'row',
            padding: '10px',
            pl: isMobile ? 1 : 6,
            pr: isMobile ? 2 : 6,
            backgroundColor: "background.paper"
        }}>

            <Box sx={{ flex: isMobile ? 1 : '', display: 'flex', alignItems: 'center' }}>
                {isMedium || isMobile ? <Box>
                    <IconButtonGradient onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButtonGradient>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </Box> : <></>}
                <img src="anh logo" alt={"logo"} width={"55px"} height={"55px"} />
            </Box>
            {!isMobile && !isMedium ? <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                alignItems: 'center',
                padding: '10px',
            }}>
                {userMenu.map((item: any, index: number) => {
                    const isOpen = openChildItem[item.title] || false;
                    return (
                        <ListItemButton key={index} component={Link} to={item.href} sx={{
                            display: "flex",
                            ':hover': {
                                background: primaryGradient,
                                color: 'white'
                            },
                            background: location.pathname.startsWith(item.href) ? primaryGradient : 'none',
                            color: location.pathname.startsWith(item.href) ? 'white' : 'none',
                            textDecoration: 'none',
                            pl: 1, pr: 1,

                        }} onClick={() => handleClick(item.title)}>
                            <Typography>{item.title}</Typography>
                            {item.child ? isOpen ? <ExpandLess /> : <ExpandMore /> : <></>}
                        </ListItemButton>
                    )
                })}
            </Box> : <></>}
            {!isMobile && <Box sx={{ flex: 1 }}>
                <SearchInput placeholder="search text here" />
            </Box>}
            <Box sx={{
                display: 'flex',
                gap: '15px',
            }}>
                <Tooltip title="giỏ hàng">
                    <IconButtonGradient onClick={() => navigate('/cart')}>
                        <Badge badgeContent={listCart.length} color="primary">
                            <ShoppingCartIcon fontSize="small" />
                        </Badge>
                    </IconButtonGradient>
                </Tooltip>
                <Tooltip title="thông báo">
                    <IconButtonGradient>
                        <Badge badgeContent={4} color="primary">
                            <Notifications fontSize="small" />
                        </Badge>
                    </IconButtonGradient>
                </Tooltip>
                <Tooltip title="tài khoản">
                    <IconButtonGradient>
                        <AccountCircleIcon />
                    </IconButtonGradient>
                </Tooltip>
            </Box>
        </AppBar>
    );

}
export default Header;