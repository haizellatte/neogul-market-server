"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const client_1 = require("@prisma/client");
const DUser_1 = require("../../decorators/DUser");
const Private_1 = require("../../decorators/Private");
const deals_service_1 = require("./deals.service");
let DealsController = class DealsController {
    constructor(dealsService) {
        this.dealsService = dealsService;
    }
    async createDealPost(user, createDealDto, file) {
        return this.dealsService.createDeal(createDealDto, file, user);
    }
    findAll() {
        return this.dealsService.getAllDeals();
    }
    findOne(dealId) {
        return this.dealsService.getDealById(dealId);
    }
    update(user, dealId, updateDealDto, file) {
        return this.dealsService.updateDeal(dealId, updateDealDto, file, user);
    }
    remove(user, dealId) {
        return this.dealsService.deleteDeal(dealId, user);
    }
    toggleLike(user, dealId) {
        return this.dealsService.toggleLike(dealId, user);
    }
};
exports.DealsController = DealsController;
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("imgUrl")),
    (0, Private_1.Private)("user"),
    (0, common_1.Post)("/"),
    __param(0, (0, DUser_1.DUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DealsController.prototype, "createDealPost", null);
__decorate([
    (0, common_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DealsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":dealId"),
    __param(0, (0, common_1.Param)("dealId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DealsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("imgUrl")),
    (0, Private_1.Private)("user"),
    (0, common_1.Patch)(":dealId"),
    __param(0, (0, DUser_1.DUser)()),
    __param(1, (0, common_1.Param)("dealId", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], DealsController.prototype, "update", null);
__decorate([
    (0, Private_1.Private)("user"),
    (0, common_1.Delete)(":dealId"),
    __param(0, (0, DUser_1.DUser)()),
    __param(1, (0, common_1.Param)("dealId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], DealsController.prototype, "remove", null);
__decorate([
    (0, Private_1.Private)("user"),
    (0, common_1.Patch)(":dealId/toggle-like"),
    __param(0, (0, DUser_1.DUser)()),
    __param(1, (0, common_1.Param)("dealId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], DealsController.prototype, "toggleLike", null);
exports.DealsController = DealsController = __decorate([
    (0, common_1.Controller)("deals"),
    __metadata("design:paramtypes", [deals_service_1.DealsService])
], DealsController);
//# sourceMappingURL=deals.controller.js.map