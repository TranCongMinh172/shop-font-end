import { Button, Typography, Box, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomTextField from '../../../components/common/CustomTextField';
import { useLocation, useNavigate } from 'react-router-dom';
import type { VerifyEmail } from '../../../dto/requests/verify-email';
import { verifyEmail } from '../../../services/auth.service';
import { saveToken } from '../../../services/token.service';
import { ResponseSuccess } from '../../../dto/responses/response.success';
import { LoginResponse } from '../../../dto/responses/login-response';
import { getUserByEmail, saveUserToLocalStorage } from '../../../services/user.service';
import { UserModel } from '../../../model/user.model';

const validationLoginSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Vui lòng nhập email'),
    otp: yup.string().required('Vui lòng nhập OTP'),  // updated this to match the form fields
});

const VerifyEmail = () => {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();

    const backToRegister = () => {
        navigate('/auth/register');
    }

    const formikLogin = useFormik({
        initialValues: {
            email: state?.email || '',
            otp: '',
        },
        validationSchema: validationLoginSchema,
        onSubmit: async (values: VerifyEmail) => {
            try {
                console.log("Form values:", values);
                const res: ResponseSuccess<LoginResponse> = await verifyEmail(values);
                saveToken(res.data);
                const resUser: ResponseSuccess<UserModel> = await getUserByEmail(values.email);
                saveUserToLocalStorage(resUser.data);
                navigate('/'); // Chuyển hướng đến trang chính
            } catch (error) {
                console.error("Error during form submission:", error);
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
                backgroundColor: '#fff',
            }}>
            <Typography variant="h4" gutterBottom color={'gray'}>Xác thực email</Typography>
            <Box sx={{ mb: 2 }}>
                <CustomTextField
                    sx={{
                        display: 'none'
                    }}
                    fullWidth
                    label="Email"
                    name="email"
                    value={formikLogin.values.email}
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    error={formikLogin.touched.email && Boolean(formikLogin.errors.email)}
                    helperText={
                        (formikLogin.touched.email && typeof formikLogin.errors.email === 'string'
                            ? formikLogin.errors.email
                            : '') || ''
                    }
                />

                <CustomTextField
                    sx={{
                        flex: 1,
                        mb: 2
                    }}
                    fullWidth
                    label="Otp"
                    name="otp"
                    value={formikLogin.values.otp}
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    error={formikLogin.touched.otp && Boolean(formikLogin.errors.otp)}
                    helperText={formikLogin.touched.otp && formikLogin.errors.otp}
                />
            </Box>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Xác nhận
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link href="#" onClick={backToRegister}>
                    Quay lại trang Đăng ký?
                </Link>
            </Box>
        </Box>
    );
};

export default VerifyEmail;
