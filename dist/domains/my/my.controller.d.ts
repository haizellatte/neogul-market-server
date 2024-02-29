import { User } from "@prisma/client";
import { MyService } from "./my.service";
export declare class MyController {
    private readonly myService;
    constructor(myService: MyService);
    getWrittenDeal(user: User): void;
}
