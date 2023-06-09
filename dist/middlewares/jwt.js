"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWTToken = exports.generateJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../models/users"));
const generateJWTToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
};
exports.generateJWTToken = generateJWTToken;
const verifyJWTToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Authorization token is missing!',
            });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decodedToken || !decodedToken.email) {
            return res.status(400).json({
                success: false,
                message: 'Invalid authorization token!',
            });
        }
        const user = (await users_1.default.findOne({
            email: decodedToken.email,
            isActive: true,
        }));
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User is missing!',
            });
        }
        req.user = user;
        return next();
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: String(error),
        });
    }
};
exports.verifyJWTToken = verifyJWTToken;
//# sourceMappingURL=jwt.js.map