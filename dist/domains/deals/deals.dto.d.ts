import { Prisma } from "@prisma/client";
export declare class DealPostDto {
    title: String;
    content: String;
    location: String;
    price: Number;
    likes: Number;
    views: Number;
    imgUrl?: string;
}
export type CreateDealPostDto = Prisma.DealCreateWithoutUserInput;
