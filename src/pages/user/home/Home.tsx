import { Box, Button, Container, Typography, useMediaQuery } from "@mui/material"
import Carousel from "../../../components/user/carousels/Carousel.tsx";
import { ProductModel } from "../../../model/product.model.ts";
import { useEffect, useState } from "react";
import { getAllProdcucts } from "../../../services/product.service.ts";
import ProductCard from "../../../components/user/cards/ProductCard.tsx";


const Home = () => {
    const [productSales, setProductSales] = useState<ProductModel[]>([]);
    const isMobile: boolean = useMediaQuery('(max-width:600px)');
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllProdcucts();
            if (response.status === 200) {
                setProductSales(response.data);
            }
        };
        fetchData();
    }, []);
    return (
        <Box sx={{ width: '100%' }}>
            <Carousel></Carousel>
            {productSales.length > 0 && <Container>
                <Typography>Khuyến mãi hot</Typography>
                <Box sx={{
                    display: 'flex',
                    gap: '30px',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    {productSales.map((product: ProductModel) => (
                        <Box key={product.id} sx={{ flexBasis: isMobile ? '100px' : '250px', flexGrow: 1, maxWidth: isMobile ? '150px' : '250px' }}>
                            <ProductCard product={product}></ProductCard>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}><Button>Xem thêm</Button></Box>
            </Container>}
        </Box>
    );
}
export default Home;