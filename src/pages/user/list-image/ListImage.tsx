import { Box, IconButton, useMediaQuery } from "@mui/material";
import { ProductImageModel } from "../../../model/product-image.model";
import { useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

type Props = {
    images: ProductImageModel[];
}

function ListImage({ images }: Props) {
    const isMobile: boolean = useMediaQuery('(max-width:600px)');
    const [active, setActive] = useState<number>(0);
    const [smallActive, setSmallActive] = useState<number>(0);
    const smallImagesToShow = 5;

    const nextImage = () => {
        setActive(prev => {
            const nextActive = prev + 1;
            if (nextActive >= smallActive + smallImagesToShow) {
                setSmallActive(prev => prev + smallImagesToShow);
            }
            return nextActive;
        });
    };


    const prevImage = () => {
        setActive(prev => {
            const nextActive = prev - 1;
            if (nextActive < smallActive) {
                setSmallActive(prev => prev - smallImagesToShow);
            }
            return nextActive;
        });
    };

    const nextSmallImage = () => {
        setSmallActive(prev => prev + smallImagesToShow);
    }
    const prevSmallImage = () => {
        setSmallActive(prev => prev - smallImagesToShow);
    }

    return (
        <Box sx={{ width: '50%',flex:1 }}>
            <Box sx={{
                width: "100%",
                height: isMobile ? "400px" : "500px",
                position: 'relative',
                overflow: 'hidden',
            }}>
                <Box sx={{ position: 'relative', }}>
                    <Box sx={{
                        display: 'flex',
                        transition: 'transform 0.5s ease',
                        transform: `translateX(-${active * 100}%)`,
                    }}>
                        {images.map((image: ProductImageModel) => (
                            <Box
                                component="img"
                                key={image.id}
                                src={image.path || ""}
                                alt="image"
                                sx={{ width: '100%', height: isMobile ? '300px' : '400px', flexShrink: 0 }}
                            />
                        ))}
                    </Box>
                    <Box sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        color: "#fff",
                        background: "rgba(0,0,0,0.5)",
                        p: 1,
                        borderRadius: '0px 5px 0px 0px'
                    }}>
                        {active + 1}/{images.length}
                    </Box>
                    {active < images.length - 1 && <IconButton sx={{
                        position: "absolute",
                        top: "40%",
                        right: 0,
                        zIndex: 2,
                        mr: 2,
                        color: "#fff",
                        background: "rgba(0,0,0,0.5)",
                        transition: "background-color 1.5s ease-in-out",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.8)",
                        }
                    }} onClick={nextImage} >
                        <ArrowForwardIosIcon />
                    </IconButton>}
                    {active > 0 && <IconButton sx={{
                        position: "absolute",
                        top: "40%",
                        left: 0,
                        zIndex: 2,
                        mr: 2,
                        color: "#fff",
                        background: "rgba(0,0,0,0.5)",
                        transition: "background-color 1.5s ease-in-out",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.8)",
                        }
                    }} onClick={prevImage} >
                        <ArrowBackIosNewIcon />
                    </IconButton>}
                </Box>
                <Box sx={{ position: 'relative', overflow: 'hidden', marginTop: '8px', maxWidth: "100%" }}>
                    <Box sx={{
                        display: 'flex',
                        gap: '6.5px',
                        transition: 'transform 0.5s ease',
                        transform: `translateX(-${smallActive * 118}px)`,

                    }}>
                        {images.map((image, index) => (
                            <Box
                                component="img"
                                key={image.id}
                                src={image.path || ""}
                                alt="image"
                                sx={{
                                    height: '90px',
                                    minWidth: '110px',
                                    cursor: 'pointer',
                                    border: active === index ? '2px solid red' : '2px solid transparent',
                                }}
                                onClick={() => {
                                    setActive(index);
                                }}
                            />
                        ))}
                    </Box>
                    {smallActive + smallImagesToShow < images.length && <IconButton sx={{
                        position: "absolute",
                        top: "40%",
                        right: 0,
                        zIndex: 2,
                        mr: 2,
                        color: "#fff",
                        background: "rgba(0,0,0,0.5)",
                        transition: "background-color 1.5s ease-in-out",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.8)",
                        }
                    }} onClick={nextSmallImage} >
                        <ArrowForwardIosIcon />
                    </IconButton>}
                    {smallActive > 0 && <IconButton sx={{
                        position: "absolute",
                        top: "40%",
                        left: 0,
                        zIndex: 2,
                        mr: 2,
                        color: "#fff",
                        background: "rgba(0,0,0,0.5)",
                        transition: "background-color 1.5s ease-in-out",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.8)",
                        }
                    }} onClick={prevSmallImage} >
                        <ArrowBackIosNewIcon />
                    </IconButton>}
                </Box>
            </Box>
        </Box>
    );
}

export default ListImage;
