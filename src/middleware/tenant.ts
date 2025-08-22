import { Request, Response, NextFunction } from "express";
export function withTenant(req: Request, res: Response, next: NextFunction) {
  const agencyId =
    (req.headers["x-agency-id"] as string) || (req.query.agencyId as string);
  if (!agencyId) return res.status(400).json({ error: "Missing x-agency-id" });
  (req as any).agencyId = agencyId;
  next();
}
