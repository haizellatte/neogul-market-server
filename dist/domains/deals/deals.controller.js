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
const client_1 = require("@prisma/client");
const DUser_1 = require("../../decorators/DUser");
const user_only_1 = require("../../decorators/user.only");
const deals_service_1 = require("./deals.service");
let DealsController = class DealsController {
    constructor(dealsService) {
        this.dealsService = dealsService;
    }
    async createDealPost(user, createDealDto) {
        const DealDto = { ...createDealDto, userEmail: user.email };
        return this.dealsService.createDeal(DealDto);
    }
    findAll() {
        return this.dealsService.getAllDeals();
    }
    findOne(dealId) {
        return this.dealsService.getDealById(dealId);
    }
    update(dealId, updateDealDto) {
        return this.dealsService.updateDeal(dealId, updateDealDto);
    }
    remove(dealId) {
        return this.dealsService.deleteDeal(dealId);
    }
    toggleLike(user, dealId) {
        return this.dealsService.toggleLike(dealId, user.email);
    }
    async uploadDealMainImg(file) {
        return this.dealsService.uploadDealImg(file);
    }
};
exports.DealsController = DealsController;
__decorate([
    (0, common_1.Post)("/create"),
    (0, user_only_1.UserOnly)(),
    __param(0, (0, DUser_1.DUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DealsController.prototype, "createDealPost", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DealsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":dealId"),
    __param(0, (0, common_1.Param)("dealId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DealsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":dealId"),
    __param(0, (0, common_1.Param)("dealId", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DealsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("dealId"),
    __param(0, (0, common_1.Param)("dealId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DealsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(":dealId/toggle-like"),
    __param(0, (0, DUser_1.DUser)()),
    __param(1, (0, common_1.Param)("dealId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], DealsController.prototype, "toggleLike", null);
__decorate([
    (0, common_1.Post)(":dealId/img-upload"),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DealsController.prototype, "uploadDealMainImg", null);
exports.DealsController = DealsController = __decorate([
    (0, common_1.Controller)("deals"),
    __metadata("design:paramtypes", [deals_service_1.DealsService])
], DealsController);
//# sourceMappingURL=deals.controller.js.map