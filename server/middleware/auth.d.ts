import type { NextFunction, Request, Response } from "express";
export type AuthRequest = Request & {
    user?: {
        id: string;
        email: string;
    };
};
export declare function authenticate(req: AuthRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
