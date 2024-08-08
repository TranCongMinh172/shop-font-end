import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputLabel-root': {
        color: 'gray', // Màu chữ của label
    },
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'transparent', // Đảm bảo không có màu nền gây ra hiệu ứng
        '& fieldset': {
            borderColor: 'gray', // Màu border khi không có lỗi
        },
        '&:hover fieldset': {
            borderColor: 'gray', // Màu border khi hover
        },
        '&.Mui-focused fieldset': {
            borderColor: 'blue', // Màu border khi trường được chọn
        },
        '& .MuiInputBase-input': {
            color: 'black', // Màu chữ của input
            backgroundColor: 'transparent', // Đảm bảo không có màu nền gây ra hiệu ứng
            textDecoration: 'none', // Đảm bảo không có gạch chân
            WebkitAppearance: 'none', // Loại bỏ các kiểu mặc định của trình duyệt
            MozAppearance: 'none',
            appearance: 'none',
            '&:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 100px transparent inset', // Xóa hiệu ứng shadow
                WebkitTextFillColor: 'black', // Đặt màu chữ mặc định khi autofill
                caretColor: 'black', // Đặt màu con trỏ văn bản mặc định
            },
        },
    },
}));

export default CustomTextField;
