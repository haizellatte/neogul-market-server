import { SetMetadata } from "@nestjs/common";
export const UserOnly = () => SetMetadata("userOnly", true);
