import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import MessageBox from "../../pages/user/chat/MessageBox";
import { isLogin } from "../../services/user.service";

type Props = {
    children?: React.ReactNode;
}
const UserLayout = ({ children }: Props) => {
    const login: boolean = isLogin();
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: '100vh' }}>
            <Header></Header>
            <Box sx={{ flex: 1, marginTop: '85px', display: 'flex', }}>
                {children}
            </Box>
            <Box sx={{ height: '60px' }}>
            {login &&  <MessageBox/>}
            <Box sx={{ height: '60px' }}><Footer></Footer></Box>
            </Box>
        </Box>
    );
}
export default UserLayout;