import { Button, Typography, Box, Link, Backdrop, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomTextField from '../../../components/common/CustomTextField';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { RegisterRequestDto } from '../../../dto/requests/register-request.dto';
import React, { useState } from 'react';
import { register } from '../../../services/auth.service';

// Validation schema using Yup
const validationLoginSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Vui lòng nhập email'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
    name: yup.string().required('Vui lòng nhập tên'),
    phoneNumber: yup.string().required('Vui lòng nhập số điện thoại'),
});

const Signup = () => {
    const [open, setOpen] = React.useState(false);
    const [errorEmail, setErrorEmail] = useState("");
    const handleClose = () => {
        setOpen(false);
      };
    //   const handleOpen = () => {
    //     setOpen(true);
    //   };
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/auth/login'); // Chuyển hướng đến trang đăng nhập
    };

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
            phoneNumber: ''
        },
        validationSchema: validationLoginSchema,
        onSubmit: async (values: RegisterRequestDto) => {
            try {
                setOpen(true)
               await register(values); 
               navigate('/auth/verify-email', { state: { email: formikLogin.values.email } });
            } catch (error) {
                setErrorEmail("Email đã được sử dụng");
            }
        },
    });

    return (
        <Box
            component="form"
            onSubmit={formikLogin.handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                borderRadius: 2,
                backgroundColor: '#fff'
            }}
        >
            <Typography variant="h4" gutterBottom color={grey[600]}>ĐĂNG KÝ</Typography>
            <Box >
                {errorEmail ? <Typography>{errorEmail}</Typography>: ''}
                <CustomTextField
                    sx={{
                        flex: 1,
                        mb: 1
                    }}
                    fullWidth
                    label="Email"
                    name="email"
                    value={formikLogin.values.email}
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    error={formikLogin.touched.email && Boolean(formikLogin.errors.email)}
                    helperText={formikLogin.touched.email && formikLogin.errors.email}
                />
                <CustomTextField
                    sx={{
                        flex: 1,
                        mb: 1
                    }}
                    fullWidth
                    type="password"
                    label="Password"
                    name="password"
                    value={formikLogin.values.password}
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    error={formikLogin.touched.password && Boolean(formikLogin.errors.password)}
                    helperText={formikLogin.touched.password && formikLogin.errors.password}
                />
                <CustomTextField
                    sx={{
                        flex: 1,
                        mb: 1
                    }}
                    fullWidth
                    type="text"
                    label="Name"
                    name="name"
                    value={formikLogin.values.name}
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    error={formikLogin.touched.name && Boolean(formikLogin.errors.name)}
                    helperText={formikLogin.touched.name && formikLogin.errors.name}
                />
                <CustomTextField
                    sx={{
                        flex: 1,
                        mb: 1
                    }}
                    fullWidth
                    type="tel"
                    label="Phone"
                    name="phoneNumber"
                    value={formikLogin.values.phoneNumber}
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    error={formikLogin.touched.phoneNumber && Boolean(formikLogin.errors.phoneNumber)}
                    helperText={formikLogin.touched.phoneNumber && formikLogin.errors.phoneNumber}
                />
            </Box>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Đăng ký
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link href="#" onClick={handleLogin}>
                    Bạn đã có tài khoản? Đăng nhập
                </Link>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
};

export default Signup;
