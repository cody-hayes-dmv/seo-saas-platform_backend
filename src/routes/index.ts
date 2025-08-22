import { Router } from "express";
import { router as misc } from "./misc";
import { router as clients } from "./clients";
import { router as agencies } from "./agencies";
export const router = Router();

router.use(misc);
router.use(clients);
router.use(agencies);
