import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
export function requireRole(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = ((req as any).user?.role as Role) || Role.CLIENT;
    if (!roles.includes(role))
      return res.status(403).json({ error: "Forbidden" });
    next();
  };
}
