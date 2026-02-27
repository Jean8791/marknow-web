import {ConviteResponse} from "@/types/convite/conviteResponse";

export interface PagedConviteResponse {
    content: ConviteResponse[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}
