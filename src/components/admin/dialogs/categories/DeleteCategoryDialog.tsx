import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import { CategoryModel } from "../../../../model/category.model";
import { deleteCategoryApi } from "../../../../services/category.service";

type Props = {
    open: boolean;
    handleClose: () => void;
    deleteCategory: (category: CategoryModel) => void;
    category: CategoryModel;
    showAlert: (status: string, message: string) => void
}

const DeleteCategoryDialog = ({open, handleClose, deleteCategory, category, showAlert} : Props) => {
    const handleDelete = async () => {
        try {
            await deleteCategoryApi(category.id);
            deleteCategory(category);
            showAlert('success', 'Xóa thành công');
            handleClose();
        } catch (error) {
            showAlert('error', 'Xóa thất bại');
            handleClose();
        }
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">
                {"Bạn có chắc muốn xóa ?"}
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleDelete} autoFocus>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteCategoryDialog;