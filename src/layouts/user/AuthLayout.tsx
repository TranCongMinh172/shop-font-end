import { Container, Box, } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = {
    children?: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
    const uniqueKey = Date.now();
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url("https://wallpaperaccess.com/full/318902.jpg")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <Container maxWidth="xs" >
                <Box sx={{ backgroundColor: 'white', borderRadius: 2,  }} >
                 
                        <motion.div
                            key={uniqueKey}
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.5 }}
                        >
                            {children}
                        </motion.div>
        
                </Box>
            </Container>

        </Box>
    );
};

export default AuthLayout;
