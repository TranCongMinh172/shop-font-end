import {
    Avatar, Box, Button, Container, FormControl, IconButton, InputAdornment,
    InputLabel, MenuItem, Select, TextField, Typography, Grid, Divider
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { VisuallyHiddenInput } from "../../admin/products/CreateProduct";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

import AlertCustom from "../../../components/common/AlertCustom";
import { Gender, UserModel } from "../../../model/user.model";
import { changePassword, getUserFromLocalStorage, saveUserToLocalStorage, updateUser, uploadAvt } from "../../../services/user.service";
import { ResponseSuccess } from "../../../dto/responses/response.success";
import { UserUpdateDto } from "../../../dto/requests/user-update.dto";
import { ChangePasswordRequest } from "../../../dto/requests/change-password-request";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Profile = () => {
    const user: UserModel | null = getUserFromLocalStorage();
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState<string>(user?.name || "");
    const [phoneNumber, setPhoneNumber] = useState<string>(user?.phoneNumber || "");
    const [gender, setGender] = useState<string>(user?.gender || "");
    const [avt, setAvt] = useState<string>(user?.avatarUrl || "");
    const [street, setStreet] = useState<string>(user?.address?.street || "");
    const [district, setDistrict] = useState<string>(user?.address?.district || "");
    const [city, setCity] = useState<string>(user?.address?.city || "");
    const [dob, setDob] = useState<Dayjs | null>(dayjs(user?.dateOfBirth ? user?.dateOfBirth.toString() : '01-01-1990'));
    const [errName, setErrName] = useState<string>("");
    const [oldPwd, setOldPwd] = useState<string>("");
    const [newPwd, setNewPwd] = useState<string>("");
    const [confirmPwd, setConfirmPwd] = useState<string>("");
    const [errOldPwd, setErrOldPwd] = useState<string>("");
    const [errNewPwd, setErrNewPwd] = useState<string>("");
    const [errConfirmPwd, setErrConfirmPws] = useState<string>("");
    const [openAlert, setOpenAlert] = useState({
        show: false,
        status: '',
        message: ''
    });

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            try {
                const response: ResponseSuccess<string> = await uploadAvt(files[0]);
                setAvt(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        document.title = "Tài khoản của tôi";
    }, []);

    const updateInfo = async () => {
        if (name === "") {
            setErrName("Vui lòng nhập tên");
            return;
        } else {
            try {
                let gd: Gender | null = null;
                if (gender === "MALE") gd = Gender.MALE;
                else if (gender === "FEMALE") gd = Gender.FEMALE;

                dob?.add(1, 'day');
                const userUpdateDto: UserUpdateDto = {
                    name,
                    avatarUrl: avt,
                    addressDto: { street, district, city },
                    phoneNumber,
                    gender: gd,
                    dateOfBirth: dob?.add(1, 'day').toDate(),
                };
                const response: ResponseSuccess<UserModel> = await updateUser(user?.email || "", userUpdateDto);
                saveUserToLocalStorage(response.data);
                setOpenAlert({ show: true, status: 'success', message: 'cập nhật thành công' });
            } catch (error) {
                setOpenAlert({ show: true, status: 'error', message: 'cập nhật thất bại' });
                console.log(error);
            }
        }
    };

    const colseAlert = () => setOpenAlert({ show: false, status: '', message: '' });

    const changePwd = async () => {
        if (oldPwd === "") setErrOldPwd("Vui lòng nhập mật khẩu");
        if (newPwd === "") setErrNewPwd("Vui lòng nhập mật khẩu mới");
        if (confirmPwd === "") setErrConfirmPws("Vui lòng nhập xác nhận mật khẩu");
        if (confirmPwd !== newPwd) setErrConfirmPws("Mật khẩu không khớp");

        try {
            const changePwdRequest: ChangePasswordRequest = {
                email: user?.email || "",
                oldPassword: oldPwd,
                newPassword: newPwd,
            };
            await changePassword(changePwdRequest);
            setOpenAlert({ show: true, status: 'success', message: 'Thay đổi mật khẩu thành công' });
        } catch (error) {
            console.log(error);
            setErrOldPwd("Mật khẩu không đúng");
        }
    };

    return (
        <Container>
            {openAlert.show && <AlertCustom alert={openAlert} colseAlert={colseAlert} />}

            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Thông tin cá nhân</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mb: 4 }}>
                <Avatar alt={name} src={avt} sx={{ width: 100, height: 100, mb: 2, boxShadow: 3 }} />
                <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
                    Thay ảnh đại diện
                    <VisuallyHiddenInput type="file" accept="image/*" onChange={handleChangeImage} />
                </Button>
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Họ tên" fullWidth value={name} onChange={(e) => setName(e.target.value)} error={!!errName} helperText={errName} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Email" fullWidth value={user?.email} InputProps={{ readOnly: true }} />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Số điện thoại" fullWidth type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Giới tính</InputLabel>
                        <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <MenuItem value="MALE">Nam</MenuItem>
                            <MenuItem value="FEMALE">Nữ</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Ngày sinh"
                    value={dob}
                    onChange={(newValue: Dayjs | null) => setDob(newValue)}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            sx: { mb: 3 },
                        },
                    }}
                />
            </LocalizationProvider>
            <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1 }}>Địa chỉ</Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                    <TextField label="Tên đường" fullWidth value={street} onChange={(e) => setStreet(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField label="Quận/huyện" fullWidth value={district} onChange={(e) => setDistrict(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField label="Tỉnh/thành phố" fullWidth value={city} onChange={(e) => setCity(e.target.value)} />
                </Grid>
            </Grid>

            <Button fullWidth variant="contained" color="success" onClick={updateInfo} sx={{ mb: 4 }}>Cập nhật thông tin</Button>

            <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1 }}>Thay đổi mật khẩu</Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField type={showPassword ? "text" : "password"} label="Mật khẩu cũ" fullWidth value={oldPwd} onChange={(e) => setOldPwd(e.target.value)} error={!!errOldPwd} helperText={errOldPwd}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField type={showPassword ? "text" : "password"} label="Mật khẩu mới" fullWidth value={newPwd} onChange={(e) => setNewPwd(e.target.value)} error={!!errNewPwd} helperText={errNewPwd}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField type={showPassword ? "text" : "password"} label="Xác nhận mật khẩu mới" fullWidth value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} error={!!errConfirmPwd} helperText={errConfirmPwd}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }} />
                </Grid>
            </Grid>

            <Button fullWidth variant="contained" color="warning" onClick={changePwd} sx={{ mt: 3 }}>Đổi mật khẩu</Button>
        </Container>
    );
};

export default Profile;
