var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Router } from "express";
import { z } from "zod";
import { Log } from "../models/Log";
export var dashboardRouter = Router();
var logSchema = z.object({
    category: z.enum(["study", "sleep", "skincare", "haircare", "hydration", "wellness", "mood", "career"]),
    value: z.number().default(1),
    note: z.string().optional(),
    meta: z.record(z.unknown()).optional()
});
dashboardRouter.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var logs, totals;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Log.find({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }).sort({ loggedAt: -1 }).limit(50)];
            case 1:
                logs = _b.sent();
                totals = logs.reduce(function (acc, log) {
                    var _a;
                    acc[log.category] = ((_a = acc[log.category]) !== null && _a !== void 0 ? _a : 0) + log.value;
                    return acc;
                }, {});
                res.json({
                    transformation: 68,
                    level: 14,
                    xp: 8420,
                    totals: totals,
                    logs: logs
                });
                return [2 /*return*/];
        }
    });
}); });
dashboardRouter.post("/logs", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var parsed, log;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                parsed = logSchema.safeParse(req.body);
                if (!parsed.success)
                    return [2 /*return*/, res.status(400).json({ message: "Invalid log" })];
                return [4 /*yield*/, Log.create(__assign(__assign({}, parsed.data), { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }))];
            case 1:
                log = _b.sent();
                res.status(201).json(log);
                return [2 /*return*/];
        }
    });
}); });
dashboardRouter.post("/coach", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var message;
    var _a, _b;
    return __generator(this, function (_c) {
        message = String((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : "");
        res.json({
            reply: "Based on \"".concat(message.slice(0, 80), "\", protect your sleep, pick one career task, one body-care task, and one recovery task. Keep the plan repeatable.")
        });
        return [2 /*return*/];
    });
}); });
