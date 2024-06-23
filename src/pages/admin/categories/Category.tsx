import { Alert, Box, Button, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from "@mui/material";
import { pinkGradient } from "../../../theme";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ButtonGradient from "../../../components/common/ButtonGradient.tsx";
import CreateCategoryDialog from "../../../components/admin/dialogs/categories/CreateCategoryDialog.tsx";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { CategoryModel } from "../../../model/category.model.ts";
import { getAllCategories } from "../../../services/category.service.ts";
import { ResponseSuccess } from "../../../dto/responses/response.success.ts";
import { Status } from "../../../model/enum/status.enum.ts";
import UpdateCategoryDialog from "../../../components/admin/dialogs/categories/UpdateCategoryDialog.tsx";
import DeleteCategoryDialog from "../../../components/admin/dialogs/categories/DeleteCategoryDialog.tsx";

const Category = () => {
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');
    const [openDelete, setOpenDelete] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [category, setCategory] = useState<CategoryModel>({});
    const [openAlert, setOpenAlert] = useState({
        show: false,
        status: '',
        message: ''
    });
    const handleClose = () => {
        setOpen(false);
    }
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    }
    const handleCloseDelete = () => {
        setOpenDelete(false);
    }

    const showAlert = (status: string, message: string) => {
        setOpenAlert(
            {
                show: true,
                status: status,
                message: message
            }
        )
    }

    const addCategory = (category: CategoryModel) => {
        setCategories(prev => [...prev, category]);
    }
    const updateCategory = (category: CategoryModel) => {
        setCategories(prev => {
            const oldCategory = prev.filter((item) => category.id === item.id);
            const index = prev.indexOf(oldCategory[0]);
            prev[index] = category;
            return prev;
        });
    }
    const deleteCategory = (category: CategoryModel) => {
        setCategories(prev => prev.filter((item) => item.id !== category.id));
    }

    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<CategoryModel[]> = await getAllCategories();
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])
    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', mb: 2 }}>
                <Typography component="span" sx={{ flexGrow: 1 }}>Danh sách loại sản phẩm</Typography>
                <ButtonGradient size="small" sx={{
                    background: pinkGradient,
                    color: "#fff",
                    fontSize: 10
                }} onClick={() => setOpen(true)}>Thêm loại sản phẩm <AddIcon /> </ButtonGradient>
            </Box>
            <TableContainer component={Paper}>
                <Table size={isMobile ? 'small' : 'medium'} aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Id</TableCell>
                            <TableCell >Tên loại sản phẩm</TableCell>
                            <TableCell >Trạng thái</TableCell>
                            <TableCell align="center">Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category: CategoryModel) => (
                            <TableRow key={category.id} sx={{
                                ':hover': {
                                    backgroundColor: 'secondary.main'
                                }
                            }}>
                                <TableCell >{category.id}</TableCell>
                                <TableCell >{category.categoryName}</TableCell>
                                <TableCell >
                                    {category.status === Status.ACTIVE ?
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center', gap: '5px'
                                        }}><FiberManualRecordIcon fontSize="small" color="success" />Hoạt động</Box> :
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center', gap: '5px'
                                        }}><FiberManualRecordIcon fontSize="small" color="error" />Ngưng hoạt động</Box>}</TableCell>
                                <TableCell align="center">
                                    <Button sx={{

                                        height: '20px',
                                        fontSize: '9px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        ml: 1
                                    }} color={'success'} variant="contained" onClick={() => {
                                        setCategory(category);
                                        setOpenUpdate(true);
                                    }}>Cập nhật</Button>
                                    <Button sx={{
                                        width: '70px',
                                        height: '20px',
                                        fontSize: '9px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        ml: 1
                                    }} className="btn-action-table" variant="contained" color="error" onClick={() => {
                                        setCategory(category);
                                        setOpenDelete(true);
                                    }} >Xóa</Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openAlert.show && <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={openAlert.show} autoHideDuration={3000} onClose={() => setOpenAlert({
                    show: false,
                    status: '',
                    message: ''
                })}>
                <Alert
                    severity={openAlert.status === 'success' ? 'success' : 'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {openAlert.message}
                </Alert>
            </Snackbar>}
            {open && <CreateCategoryDialog open={open} handleClose={handleClose} showAlert={showAlert} addCategory={addCategory} />}
            {openUpdate && <UpdateCategoryDialog showAlert={showAlert} updateCategory={updateCategory} open={openUpdate} handleClose={handleCloseUpdate} category={category} />}
            {openDelete && <DeleteCategoryDialog showAlert={showAlert} open={openDelete} handleClose={handleCloseDelete} category={category} deleteCategory={deleteCategory} />}

        </Box>
    )
}
export default Category;