import jwt from "jsonwebtoken";
export function authenticate(req, res, next) {
    var _a, _b;
    var token = (_a = req.header("authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }
    try {
        var decoded = jwt.verify(token, (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : "dev-secret");
        req.user = decoded;
        next();
    }
    catch (_c) {
        res.status(401).json({ message: "Invalid token" });
    }
}
