import { CreatePrismaDto } from "./dto/create-prisma.dto";
import { UpdatePrismaDto } from "./dto/update-prisma.dto";
import { PrismaService } from "./prisma.service";
export declare class PrismaController {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createPrismaDto: CreatePrismaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePrismaDto: UpdatePrismaDto): string;
    remove(id: string): string;
}
