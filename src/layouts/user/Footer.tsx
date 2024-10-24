import { Typography, Box, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { GradientBox } from "../../gradient/GradientColor";

const Footer = () => {
    return (
        <GradientBox sx={{
            height: 'auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 3,
        }}>
            <Typography variant="h6" sx={{color: 'white', mb: 2}}>Minh Chibi Shop</Typography>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
            }}>
                <IconButton component={Link} href="https://facebook.com/hoanganh.1511.02" target="_blank" sx={{color: 'white'}}>
                    <Facebook />
                </IconButton>
                <IconButton component={Link} href="https://twitter.com" target="_blank" sx={{color: 'white'}}>
                    <Twitter />
                </IconButton>
                <IconButton component={Link} href="https://instagram.com" target="_blank" sx={{color: 'white'}}>
                    <Instagram />
                </IconButton>
                <IconButton component={Link} href="https://www.linkedin.com/in/anh-ho%C3%A0ng-a580342b7/" target="_blank" sx={{color: 'white'}}>
                    <LinkedIn />
                </IconButton>
            </Box>
            <Typography sx={{color: 'white', mb: 1}}>© 2024 Trần Công Minh Shop. All rights reserved.</Typography>
            <Typography sx={{color: 'white', mb: 1}}>Contact me: <Link href="mailto:minhboy172@gmail.com" sx={{color: 'white'}}>minhboy172@gmail.com</Link></Typography>
            <Typography sx={{color: 'white', mb: 1}}>Mobile phone: <Link href="#" sx={{color: 'white'}}>0961263780</Link></Typography>
            <Typography sx={{color: 'white'}}>Address: Quận 12, Ho Chi Minh City, Viet Nam</Typography>
        </GradientBox>
    );
}

export default Footer;
