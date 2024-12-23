import requestConfig, { ContentType, Method } from "../congigurations/axios.config";
import { MessageDto } from "../dto/requests/message.dto";
import { PageResponse } from "../dto/responses/page-response";
import { ResponseSuccess } from "../dto/responses/response.success";
import { MessageModel } from "../model/message.model";



export const getMessageByRoomId = async (roomId: string, email: string, pageNo: number = 1, pageSize: number = 10): 
Promise<ResponseSuccess<PageResponse<MessageModel[]>>> => {
    try {
        const response = await requestConfig(
            `messages/${roomId}?email=${email}&pageNo=${pageNo}&pageSize=${pageSize}`,
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

export const sendMessage = async (message: MessageDto): Promise<ResponseSuccess<MessageModel>> => {
    const fromData : FormData = new FormData();
    if(message.message) fromData.append("message", message.message);
    if(message.file) fromData.append("file", message.file);
    fromData.append("sender", message.sender);
    fromData.append("receiver", message.receiver);
    try {
        const response = await requestConfig(
            `messages/send`,
            Method.POST,
            fromData,
            ContentType.FORM_DATA,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}