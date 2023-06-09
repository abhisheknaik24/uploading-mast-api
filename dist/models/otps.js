"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const otpSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Users', required: true },
    otp: { type: Number, minlength: 6, maxlength: 6, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const Otp = (0, mongoose_1.model)('Otps', otpSchema);
exports.default = Otp;
//# sourceMappingURL=otps.js.map