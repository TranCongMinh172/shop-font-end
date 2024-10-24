import requestConfig, { ContentType, Method } from "../congigurations/axios.config";
import { PageResponse } from "../dto/responses/page-response";
import { ResponseSuccess } from "../dto/responses/response.success";
import { NotificationModel } from "../model/notification.model";


export const getNotificationsByUserId = async (userId: number, pageNo: number = 1, pageSize: number = 10): Promise<ResponseSuccess<PageResponse<NotificationModel[]>>> => {
    try {
        const response = await requestConfig(
            `notifications/${userId}?pageNo=${pageNo}&pageSize=${pageSize}`,
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

