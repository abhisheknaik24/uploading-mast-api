"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
router.post('/signIn', authController_1.default.signIn);
router.post('/signUp', authController_1.default.signUp);
router.post('/validateEmail', authController_1.default.validateEmail);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map