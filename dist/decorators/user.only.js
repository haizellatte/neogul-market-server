"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Private = void 0;
const common_1 = require("@nestjs/common");
const Private = (user) => (0, common_1.SetMetadata)("user", user);
exports.Private = Private;
//# sourceMappingURL=user.only.js.map