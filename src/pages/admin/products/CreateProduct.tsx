import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import * as yup from 'yup';
import { getAllCategories } from "../../../services/category.service";
import { CategoryModel } from "../../../model/category.model";
import { ResponseSuccess } from "../../../dto/responses/response.success";
import { useFormik } from "formik";
import { ProviderModel } from "../../../model/privoder.model";
import { getAllProviders } from "../../../services/provider.service";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ProductDetailDto } from "../../../dto/requests/product-detail";
import { ColorModel } from "../../../model/color.model";
import { SizeModel } from "../../../model/size.model";
import { getAllColors } from "../../../services/color.service";
import { getAllSizes } from "../../../services/size.service";
import { ProductDto } from "../../../dto/requests/productDto";
import { ProductModel } from "../../../model/product.model";
import { createproductApi } from "../../../services/product.service";
import { createProductDetails } from "../../../services/product-detail.service";


const VisuallyHiddenInput = styled('input')({
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const validationProductSchema = yup.object({
    productName: yup.string().required('Vui lòng nhập tên sản phẩm'),
    productPrice: yup.number().min(1, 'Giá phải lớn hơn 0').required('Vui lòng nhập giá'),
    categoryId: yup.string().required('Vui lòng chọn loại sản phẩm'),
    providerId: yup.string().required('Vui lòng chọn nhà cung cấp'),
});

const validationProductDetailSchema = yup.object({
    colorId: yup.string().required('Vui lòng chọn màu sắc'),
    sizeId: yup.string().required('Vui lòng chọn kích thước'),
    quantity: yup.number().min(1, 'Số lượng phải lớn hơn 0').required('Vui lòng nhập số lượng'),
});
const CreateProduct = () => {
    const [categories, setCategories] = useState<CategoryModel[]>([])
    const [providers, setProviders] = useState<ProviderModel[]>([])
    const [images, setIamges] = useState<File[]>([]);
    const [urls, setUrls] = useState<string[]>([]);
    const [productDetailDtos, setProductDetailDtos] = useState<ProductDetailDto[]>([]);
    const [colors, setColors] = useState<ColorModel[]>([]);
    const [sizes, setSizes] = useState<SizeModel[]>([]);
    const isMobile = useMediaQuery('(max-width:600px)');


    const formik = useFormik({
        initialValues: {
            productName: '',
            productPrice: 0,
            categoryId: '',
            providerId: '',
            productDescription: '',
        },
        validationSchema: validationProductSchema,
        onSubmit: async (values: ProductDto, { resetForm }) => {
            const formData = new FormData();
            formData.append('productName', values.productName ? values.productName : '');
            formData.append('thumbnail', values.thumbnail ? values.thumbnail.toString() : '1');
            formData.append('productPrice', values.productPrice ? values.productPrice.toString() : '0');
            formData.append('productDescription', values.productDescription ? values.productDescription : '');
            formData.append('categoryId', values.categoryId ? values.categoryId.toString() : '0');
            formData.append('providerId', values.providerId ? values.providerId.toString() : '0');
            images.forEach((image) => {
                formData.append(`images`, image, image.name);
            });
            const response: ResponseSuccess<ProductModel> = await createproductApi(formData);
            const productId = response.data.id;
            const productDetails = productDetailDtos.map((dto: ProductDetailDto) => {
                return {...dto, productId: productId};
            })
            for (const productDetailDto of  productDetails) {
                await createProductDetails(productDetailDto);
            }
            resetForm();
        },
    });

    const formikProductDetail = useFormik({
        initialValues: {
            sizeId: '',
            colorId: '',
            quantity: 0,
        },
        validationSchema: validationProductDetailSchema,
        onSubmit: (values: ProductDetailDto, { resetForm }) => {
            setProductDetailDtos([...productDetailDtos, values]);
            resetForm();
        },
    });

    useEffect(() => {
        (async () => {
            const responseCategory: ResponseSuccess<CategoryModel[]> = await getAllCategories();
            setCategories(responseCategory.data)
            const responseProvider: ResponseSuccess<ProviderModel[]> = await getAllProviders();
            setProviders(responseProvider.data);
            const responseSizes: ResponseSuccess<SizeModel[]> = await getAllSizes();
            setSizes(responseSizes.data);
            const responseColors: ResponseSuccess<ColorModel[]> = await getAllColors();
            setColors(responseColors.data);
        })();
    }, []);
    const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setIamges([...images, ...Array.from(files)]);
            const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
            setUrls(prev => [...prev, ...imageUrls]);
        }
    }
    const addProductDetail = () => {
        formikProductDetail.handleSubmit();
    }
    const handleSubmit = () => {
        formik.handleSubmit();
    }
    return (
        <Box component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                p: 2
            }}
            noValidate
            autoComplete="off"
        >
            <Typography component="span" sx={{ flexGrow: 1 }}>

                Thêm sản phẩm
            </Typography>

            <Box sx={{ mt: 2, }}>
                <Typography component="span" sx={{ flexGrow: 1, pl: 3 }}>
                    Thông tin sản phẩm
                </Typography>
                <Box sx={{
                    p: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <TextField
                        sx={{
                            // flexBasis: '200px',
                            display: 'flex',
                            flexGrow: 1
                        }}
                        id="product-name"
                        label="Tên sản phẩm"
                        name="productName"
                        value={formik.values.productName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.productName && Boolean(formik.errors.productName)}
                        helperText={formik.touched.productName && formik.errors.productName}
                    />
                    <TextField
                        sx={{
                            flexBasis: '200px',
                            display: 'flex',
                            flexGrow: 1
                        }}
                        id="product-price"
                        label="Giá"
                        type="number"
                        name="productPrice"
                        value={formik.values.productPrice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.productPrice && Boolean(formik.errors.productPrice)}
                        helperText={formik.touched.productPrice && formik.errors.productPrice}
                    />
                </Box>
                <Box sx={{
                    p: 2, pl: 3, display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px'

                }}>
                    <FormControl sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}>
                        <InputLabel id="categories">Loại sản phẩm</InputLabel>
                        <Select
                            labelId="categories"
                            id="categories"
                            label="Loại sản phẩm"
                            name="categoryId"
                            value={formik.values.categoryId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                        >
                            {categories.map((category: CategoryModel) => (
                                <MenuItem key={category.id} value={category.id}>{category.categoryName}</MenuItem>
                            ))}
                        </Select>
                        {formik.touched.categoryId && formik.errors.categoryId && (
                            <Typography color="error">{formik.errors.categoryId}</Typography>
                        )}
                    </FormControl>
                    <FormControl sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}>
                        <InputLabel id="providers">Nhà cung cấp</InputLabel>
                        <Select
                            labelId="providers"
                            id="providers"
                            label="Nhà cung cấp"
                            name="providerId"
                            value={formik.values.providerId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.providerId && Boolean(formik.errors.providerId)}
                        >
                            {providers.map((provider: ProviderModel) => (
                                <MenuItem key={provider.id} value={provider.id}>{provider.providerName}</MenuItem>
                            ))}
                        </Select>
                        {formik.touched.providerId && formik.errors.providerId && (
                            <Typography color="error">{formik.errors.providerId}</Typography>
                        )}
                    </FormControl>
                </Box>
                <Box sx={{ p: 2, display: 'flex' }}>
                    <TextField
                        sx={{
                            // flexBasis: '200px',
                            display: 'flex',
                            flexGrow: 1
                        }}
                        id="outlined-multiline-static"
                        label="Mô tả"
                        name="productDescription"
                        value={formik.values.productDescription}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        multiline
                        rows={4}
                    />
                </Box>
                <Box sx={{ p: 2, pl: 3 }}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload ảnh
                        <VisuallyHiddenInput type="file" accept={"image/*"} multiple onChange={handleChangeImages} />
                    </Button>
                </Box>
                <Box sx={{
                    display: 'flex',
                    p: 2,
                    flexWrap: 'wrap',
                    gap: 12
                }}>
                    {urls.map((url: string, index: number) => (
                        <img src={url} alt="test" key={index} style={{
                            flexBasis: '100px',
                            maxWidth: '200px',
                            flexGrow: 1
                        }} />
                    ))}
                </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Typography component="span" sx={{ flexGrow: 1, pl: 3 }}>
                    Chi tiết sản phẩm
                </Typography>
                <Box sx={{
                    p: 2, pl: 3, display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px'

                }}>
                    <FormControl sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}>
                        <InputLabel id="colors">Màu sắc</InputLabel>
                        <Select
                            labelId="colors"
                            id="colors"
                            label="Màu sắc"
                            name="colorId"
                            value={formikProductDetail.values.colorId}
                            onChange={formikProductDetail.handleChange}
                            onBlur={formikProductDetail.handleBlur}
                            error={formikProductDetail.touched.colorId && Boolean(formikProductDetail.errors.colorId)}
                        >
                            {colors.map((color: ColorModel) => (
                                <MenuItem key={color.id} value={color.id}>{color.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}>
                        <InputLabel id="sizes">Kích thước</InputLabel>
                        <Select
                            labelId="sizes"
                            id="sizes"
                            label="Kích thước"
                            name="sizeId"
                            value={formikProductDetail.values.sizeId}
                            onChange={formikProductDetail.handleChange}
                            onBlur={formikProductDetail.handleBlur}
                            error={formikProductDetail.touched.sizeId && Boolean(formikProductDetail.errors.sizeId)}
                        >
                            {sizes.map((size: SizeModel) => (
                                <MenuItem key={size.id} value={size.id}>{size.textSize ?? size.numberSize}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{
                    p: 2, display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <TextField
                        sx={{ flex: 1 }}
                        id="product-price"
                        label="Số lượng"
                        type="number"
                        name="quantity"
                        value={formikProductDetail.values.quantity}
                        onChange={formikProductDetail.handleChange}
                        onBlur={formikProductDetail.handleBlur}
                        error={formikProductDetail.touched.quantity && Boolean(formikProductDetail.errors.quantity)}
                        helperText={formikProductDetail.touched.quantity && formikProductDetail.errors.quantity}
                    />
                </Box>
                <Box sx={{ p: 2, pl: 3 }}>
                    <Button variant="contained" onClick={addProductDetail}>Thêm</Button>
                </Box>
                <TableContainer component={Paper} sx={{ p: 2 }}>
                    <Table size={isMobile ? 'small' : 'medium'} aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Màu sắc</TableCell>
                                <TableCell >Kích thước</TableCell>
                                <TableCell >Số lượng</TableCell>
                                <TableCell align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productDetailDtos.map((productDetailDto: ProductDetailDto, index: number) => (
                                <TableRow key={index} sx={{
                                    ':hover': {
                                        backgroundColor: 'secondary.main'
                                    }
                                }}>
                                    <TableCell >{colors.filter(color => productDetailDto.colorId === color.id)[0].name}</TableCell>
                                    <TableCell >{sizes.filter(size => productDetailDto.sizeId === size.id)[0].numberSize ??
                                        sizes.filter(size => productDetailDto.sizeId === size.id)[0].textSize
                                    }</TableCell>
                                    <TableCell>{productDetailDto.quantity}</TableCell>
                                    <TableCell align="center">
                                        <Button sx={{

                                            height: '20px',
                                            fontSize: '9px',
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                            ml: 1
                                        }} color={'success'} variant="contained" onClick={() => {

                                        }}>Cập nhật</Button>
                                        <Button sx={{

                                            height: '20px',
                                            fontSize: '9px',
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                            ml: 1
                                        }} className="btn-action-table" variant="contained" color="error" onClick={() => {

                                        }} >Xóa</Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained" color="success" onClick={handleSubmit}>Hoàn tất</Button>
            </Box>
        </Box>
    );
}
export default CreateProduct;