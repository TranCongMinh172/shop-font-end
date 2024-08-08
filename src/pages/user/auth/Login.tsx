import { Button, Typography, Box, Link, Divider, Backdrop, CircularProgress } from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomTextField from '../../../components/common/CustomTextField';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { LoginRequestDto } from '../../../dto/requests/login-request.dto';
import { ResponseSuccess } from '../../../dto/responses/response.success';
import { LoginResponse } from '../../../dto/responses/login-response';
import { login, loginWithSocial } from '../../../services/auth.service';
import { saveToken } from '../../../services/token.service';
import { UserModel } from '../../../model/user.model';
import { getUserByEmail, saveUserToLocalStorage } from '../../../services/user.service';
import React, { useState } from 'react';

// Validation schema using Yup
const validationLoginSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Vui lòng nhập email'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
});

const Login = () => {
    const [err,setErr] = useState('');
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
      };
      const handleOpen = () => {
        setOpen(true);
      };
    const handleForgotPassword = () => {
        // Xử lý quên mật khẩu ở đây
    };

    const handleRegister = () => {
        navigate('/auth/register'); // Chuyển hướng đến trang đăng ký
    };

    const handleGoogleLogin = () => {
        loginWithSocial('google');
    };

    const handleFacebookLogin = () => {
        loginWithSocial('facebook');
    };

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationLoginSchema,
        onSubmit: async (values : LoginRequestDto) => {
            try {
                handleOpen();
                const responseToken : ResponseSuccess<LoginResponse> = await login(values);
                saveToken(responseToken.data);
                const resUser : ResponseSuccess<UserModel> = await getUserByEmail(values.email);
                saveUserToLocalStorage(resUser.data);
                console.log(resUser);
                navigate('/'); // Chuyển hướng đến trang chính
            } catch (error) {
                setOpen(false);
                setErr("email hoặc mật khẩu không chính xác ");
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
                // boxShadow: 3,
                backgroundColor: '#fff',
                // opacity: 0.9 // Để nền phía sau hiển thị một chút
            }}
        >
            <Typography variant="h4" gutterBottom color={grey[600]}>Đăng nhập</Typography>
            <Box sx={{ mb: 2 }}>
                <CustomTextField
                    sx={{
                        flex: 1,
                        mb: 2
                    }}
                    fullWidth
                    label="Email"
                    name="email"
                    value={formikLogin.values.email}
                    onChange={(e)=>{formikLogin.handleChange(e); setErr("")}}
                    onBlur={formikLogin.handleBlur}
                    error={formikLogin.touched.email && Boolean(formikLogin.errors.email)}
                    helperText={formikLogin.touched.email && formikLogin.errors.email}
                />
                <CustomTextField
                    sx={{
                        flex: 1
                    }}
                    fullWidth
                    type="password"
                    label="Password"
                    name="password"
                    value={formikLogin.values.password}
                    onChange={(e)=>{formikLogin.handleChange(e); setErr("")}}
                    onBlur={formikLogin.handleBlur}
                    error={formikLogin.touched.password && Boolean(formikLogin.errors.password)}
                    helperText={formikLogin.touched.password && formikLogin.errors.password}
                />
            </Box>
            {err && <Typography color="error">{err}</Typography>}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Login
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link href="#" onClick={handleForgotPassword} sx={{ display: 'block', mb: 1 }}>
                    Forgot Password?
                </Link>
                <Divider sx={{ my: 2 }}>OR</Divider>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<GoogleIcon />}
                    fullWidth
                    onClick={handleGoogleLogin}
                    sx={{ mb: 1 }}
                >
                    Login with Google
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<FacebookIcon />}
                    fullWidth
                    onClick={handleFacebookLogin}
                >
                    Login with Facebook
                </Button>
            </Box>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link href="#" onClick={handleRegister}>
                    Don't have an account? Register
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

export default Login;
