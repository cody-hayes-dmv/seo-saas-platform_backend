import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { withTenant } from "../middleware/tenant.js";
import { requireRole } from "../middleware/roles.js";
import { Role } from "@prisma/client";
export const router = Router();

router.get("/clients", requireAuth, withTenant, async (req, res, next) => {
  try {
    const agencyId = (req as any).agencyId as string;
    const clients = await prisma.client.findMany({ where: { agencyId } });
    res.json(clients);
  } catch (e) {
    next(e);
  }
});

router.post(
  "/clients",
  requireAuth,
  withTenant,
  requireRole(Role.ADMIN, Role.AGENCY),
  async (req, res, next) => {
    try {
      const agencyId = (req as any).agencyId as string;
      const client = await prisma.client.create({
        data: { ...req.body, agencyId },
      });
      res.status(201).json(client);
    } catch (e) {
      next(e);
    }
  }
);
