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
exports.MyController = void 0;
const common_1 = require("@nestjs/common");
const DUser_1 = require("../../decorators/DUser");
const Private_1 = require("../../decorators/Private");
const my_service_1 = require("./my.service");
let MyController = class MyController {
    constructor(myService) {
        this.myService = myService;
    }
    getWrittenDeal(user) {
    }
};
exports.MyController = MyController;
__decorate([
    (0, Private_1.Private)("user"),
    (0, common_1.Get)("/"),
    __param(0, (0, DUser_1.DUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MyController.prototype, "getWrittenDeal", null);
exports.MyController = MyController = __decorate([
    (0, common_1.Controller)("my"),
    __metadata("design:paramtypes", [my_service_1.MyService])
], MyController);
//# sourceMappingURL=my.controller.js.map