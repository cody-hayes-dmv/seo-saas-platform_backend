import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";
import { Role } from "@prisma/client";
export const router = Router();

router.get(
  "/agencies",
  requireAuth,
  requireRole(Role.ADMIN),
  async (_req, res, next) => {
    try {
      res.json(await prisma.agency.findMany());
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/agencies",
  requireAuth,
  requireRole(Role.ADMIN),
  async (req, res, next) => {
    try {
      const agency = await prisma.agency.create({ data: req.body });
      res.status(201).json(agency);
    } catch (e) {
      next(e);
    }
  }
);
