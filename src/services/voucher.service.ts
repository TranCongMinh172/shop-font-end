import requestConfig, { ContentType, Method } from "../congigurations/axios.config";
import { ResponseSuccess } from "../dto/responses/response.success";
import { VoucherModel } from "../model/voucher.model";


export const getVouchersByEmail = async (email?: string): Promise<ResponseSuccess<VoucherModel[]>> => {
    try {
        const response = await requestConfig(
            `vouchers/${email}`,
            Method.GET,
            [],
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}