import { SizeType } from "./enum/size-type";

export type SizeModel = {
    id?: number;
    sizeType?: SizeType;
    numberSize?: number;
    textSize?: string;
}