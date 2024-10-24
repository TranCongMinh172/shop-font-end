import { Box, Button, Typography } from "@mui/material";
import { convertPrice } from "../../../utils/convert-price";
import voucherImage from "../../../assets/logo/voucher.png";
import voucherDelivery from "../../../assets/logo/voucherdelivery.png";
import { VoucherModel, VoucherType } from "../../../model/voucher.model";

type Props = {
    voucher: VoucherModel;
    addVoucher: (voucher: VoucherModel) => void;
    voucherApply: VoucherModel[];
}

const Voucher = ({ voucher, addVoucher, voucherApply }: Props) => {
    const isApply: boolean = voucherApply.some(v => v.id === voucher.id);

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '12px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#2e2e2e',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
            marginBottom: '16px',
            color: '#ffffff',
        }}>
            <img src={voucher.voucherType === VoucherType.FOR_DELIVERY ? voucherDelivery : voucherImage} alt="Voucher" style={{ width: '50px', height: '50px', borderRadius: '8px' }} />
            <Box sx={{ flex: 1 }}>
                <Typography sx={{ marginBottom: '4px' }}>
                    {`Giảm ${voucher.discount * 100}% cho đơn hàng từ ${convertPrice(voucher.minAmount)}`}
                </Typography>
                <Typography variant="body2" sx={{ color: '#aaaaaa', marginBottom: '4px' }}>
                    {`Tối đa ${convertPrice(voucher.maxPrice)}`}
                </Typography>
                <Typography variant="body2" sx={{ color: '#aaaaaa' }}>
                    {`Hạn sử dụng: ${voucher.expiredDate}`}
                </Typography>
            </Box>
            {!isApply ? (
                <Button
                    onClick={() => addVoucher(voucher)}
                    size="small"
                    variant="outlined"
                    sx={{
                        fontSize: '12px',
                        color: '#ffffff',
                        borderColor: '#ffffff',
                        '&:hover': {
                            borderColor: '#ffffff',
                            backgroundColor: '#3c3c3c',
                        },
                    }}
                >
                    Áp dụng
                </Button>
            ) : <Typography sx={{fontSize: '12px', color: 'green'}}>Đang áp dụng</Typography>}
        </Box>
    );
}

export default Voucher;
