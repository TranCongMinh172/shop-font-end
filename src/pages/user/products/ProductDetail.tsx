import { Box, Button, Container, Rating, Typography, useMediaQuery } from "@mui/material";
import { ProductImageModel } from "../../../model/product-image.model";

import { useEffect, useState } from "react";
import { ProductModel } from "../../../model/product.model";
import { convertPrice } from "../../../utils/convert-price";
import { ColorModel } from "../../../model/color.model";
import DoneIcon from '@mui/icons-material/Done';
import { SizeModel } from "../../../model/size.model";
import QuantityProduct from "../../../components/user/quantity-products/QuantityProduct";
import { getProductById } from "../../../services/product.service";
import { ResponseSuccess } from "../../../dto/responses/response.success";
import { ProductResponse } from "../../../dto/responses/product-response";
import { ProductDetailModel } from "../../../model/product-detail.model";
import { useParams } from "react-router-dom";
import { addCartLoacalStorage } from "../../../utils/cart-handle";
import { useDispatch } from "react-redux";
import { updateCartState } from "../../../redux/reducers/cart-reducer";
import ListImage from "../list-image/ListImage";


type SizeColorProps = {
    text: string;
    changeActive: (index: number) => void;
    index: number;
    activeIndex: number;
}
const SizeColorBox = ({ text, changeActive, index, activeIndex }: SizeColorProps) => {
    return (
        <Box sx={{
            p: 1,
            background: '#fff',
            textAlign: 'center',
            color: 'black',
            borderRadius: '10px',
            position: 'relative',
            cursor: 'pointer',
            '&:hover': {
                background: '#f0f0f0',
            }
        }}
            onClick={() => changeActive(index)}
        >
            <Typography>{text}</Typography>
            {index === activeIndex && <Box sx={{
                position: 'absolute',
                top: 0,
                right: 0
            }}>
                <DoneIcon />
            </Box>}
        </Box>
    )
}

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const isMobile: boolean = useMediaQuery('(max-width:600px)');
    const [productImages, setProductImages] = useState<ProductImageModel[]>([]);
    const [productDetails, setProductDetails] = useState<ProductDetailModel[]>([]);
    const [product, setProduct] = useState<ProductModel>();
    const [colors, setColors] = useState<ColorModel[]>([]);
    const [sizes, setSizes] = useState<SizeModel[]>([]);
    const [activeColor, setActiveColor] = useState<number>(0);
    const [activeSize, setActiveSize] = useState<number>(0);
    const [quantityInStock, setQuantityInStock] = useState<number>(0);
    const [buyQuantity, setBuyQuantity] = useState<number>(1);
    const changeActiveColor = (index: number) => {
        setActiveColor(index);

    }
    const changeActiveSize = (index: number) => {
        setActiveSize(index);
    }
    const setBuyQuantityProp = (value: number) => {
        setBuyQuantity(value);
    }

    useEffect(() => {
        (
            async () => {
                try {
                    const response: ResponseSuccess<ProductResponse> = await getProductById(Number(id));
                    setProduct(response.data.product)
                    setProductImages(response.data.productImages ?? []);
                    setProductDetails(response.data.productDetails ?? []);
                    let uniqueColors: ColorModel[] = [];
                    response.data.productDetails?.forEach((productDetail: ProductDetailModel) => {
                        if (productDetail.color) {
                            const filter: ColorModel[] = uniqueColors.filter((color: ColorModel) => color.id === productDetail.color?.id)
                            if (filter.length <= 0) {
                                uniqueColors.push(productDetail.color);
                            }
                        }
                    });
                    setColors(uniqueColors);

                    let uniqueSizes: SizeModel[] = [];
                    response.data.productDetails?.forEach((productDetail: ProductDetailModel) => {
                        if (productDetail.size) {
                            const filter: SizeModel[] = uniqueSizes.filter((size: SizeModel) => size.id === productDetail.size?.id)
                            if (filter.length <= 0) {
                                uniqueSizes.push(productDetail.size);
                            }
                        }
                    });
                    setSizes(uniqueSizes);
                } catch (error) {
                    console.log(error);
                }

            }
        )();
    }, [])


    useEffect(() => {
        const productDetailFilter = getProductDetailByColorAndSize();
        setQuantityInStock(productDetailFilter?.quantity ?? 0);

    }, [activeColor, activeSize, productDetails])

    const getProductDetailByColorAndSize = (): ProductDetailModel | undefined => {
        const productDetailFilter: ProductDetailModel[] = productDetails.filter((productDetail: ProductDetailModel) => {
            return productDetail.color?.id === colors[activeColor].id && productDetail.size?.id === sizes[activeSize].id;
        })
        if (productDetailFilter.length > 0) {
            return productDetailFilter[0];

        }


    }

    const addCart = () => {
        const productDetail = getProductDetailByColorAndSize();
        if (productDetail) {
            addCartLoacalStorage({
                productDetail: productDetail,
                quantity: buyQuantity,
            });
            dispatch(updateCartState());
            alert('Thêm vào giỏ hàng thành công');
        }
    }

    return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
  
        }}>
            <Box sx={{
                display: 'flex',
                gap: '50px',
                flexWrap: 'wrap'
            }}>
                <ListImage images={productImages} />
                <Box sx={{width:'45%', flexGrow:1}}>
                    <Typography variant="h5">
                        {product?.productName}
                    </Typography>
                    <Typography>
                        {product?.provider?.providerName}
                    </Typography>
                    <Typography>
                        {convertPrice(product?.productPrice)}
                    </Typography>
                    {product?.avgRating ? <Box>
                        <Rating name="read-only" value={product.avgRating} readOnly />
                        <Typography>{product.numberOfRating + ' đánh giá'}</Typography>
                    </Box> :
                        <Typography>Chưa có đánh giá</Typography>}
                    <Box>
                        <Box>
                            <Typography>
                                Màu sắc:
                            </Typography>
                            {colors.map((color: ColorModel, index: number) => {
                                return (
                                    <SizeColorBox key={color.id} text={color.name ?? ''} changeActive={changeActiveColor}
                                        index={index} activeIndex={activeColor} />
                                )
                            })}
                        </Box>
                        <Box>
                            <Typography>
                                Kích thước:
                            </Typography>
                            {sizes.map((size: SizeModel, index: number) => (
                                <SizeColorBox key={size.id} text={size.numberSize?.toString() ?? size.textSize ?? ''}
                                    changeActive={changeActiveSize} index={index} activeIndex={activeSize} />
                            ))}
                        </Box>
                        <Box>
                            <Typography>
                                Số lượng trong kho: {quantityInStock?.toString()}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography>
                                Số lượng:
                            </Typography>
                            <QuantityProduct quantity={buyQuantity} setQuantity={setBuyQuantityProp} maxValue={quantityInStock} />
                        </Box>
                        <Box>
                            <Button variant="contained" color="primary" onClick={addCart} >
                                Thêm vào giỏ hàng
                            </Button>
                            <Button variant="contained" color="secondary">
                                Mua ngay
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Typography variant="h6">Mô tả sản phẩm</Typography>
            <Box>
                <Box>

                </Box>
                <Box>
                    <Box>

                    </Box>
                    <Box></Box>
                </Box>
            </Box>
            <Typography sx={{ mt: 2 }} variant="h6">Đánh giá</Typography>
            <Box></Box>
            <Typography sx={{ mt: 2 }} variant="h6">Các sản phẩm tương tự</Typography>
            <Box></Box>
        </Container>
    )
}
export default ProductDetail;