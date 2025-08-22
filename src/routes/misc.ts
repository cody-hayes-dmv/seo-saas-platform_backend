import { Router } from "express";
import { prisma } from "../lib/prisma.js";
export const router = Router();

router.get("/branding/:agencyId", async (req, res, next) => {
  try {
    const agency = await prisma.agency.findUnique({
      where: { id: req.params.agencyId },
    });
    if (!agency) return res.status(404).json({ error: "Not found" });
    res.json({
      id: agency.id,
      name: agency.name,
      logoUrl: agency.logoUrl,
      primaryColor: agency.primaryColor,
      secondaryColor: agency.secondaryColor,
      contactEmail: agency.contactEmail,
      contactPhone: agency.contactPhone,
    });
  } catch (e) {
    next(e);
  }
});
