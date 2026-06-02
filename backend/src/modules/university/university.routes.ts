import { Router } from "express";

import {
  createUniversityHandler,
  getUniversitiesHandler,
} from "./university.controller";

import {
  authenticate,
} from "../../middleware/auth.middleware";

import {
  authorize,
} from "../../middleware/role.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("SUPER_ADMIN"),
  createUniversityHandler
);

router.get(
  "/",
  authenticate,
  authorize("SUPER_ADMIN"),
  getUniversitiesHandler
);

export default router;