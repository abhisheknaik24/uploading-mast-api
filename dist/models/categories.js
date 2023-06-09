"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    category: { type: String, maxLength: 255, required: true, unique: true },
    name: { type: String, maxLength: 255, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const Category = (0, mongoose_1.model)('Categories', categorySchema);
exports.default = Category;
//# sourceMappingURL=categories.js.map